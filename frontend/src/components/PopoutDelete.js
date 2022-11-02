import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { Card, CardMedia, Divider } from '@mui/material';

function PopoutDelete(props) {
    function handleDelete() {
        fetch(`${API_URL}/delete-card/?cardId=${props.focusedCardId}`, { method: "delete" })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .then(() => {
                props.refetch();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error: some error in the deleting card procedure!!!');
            })
    }
    return (
        <div>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure about deleting this card? It would be deleted for good...
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        props.handleCloseDialog();
                    }}
                >
                    No
                </Button>
                <Button onClick={() => {
                    handleDelete();
                    props.handleCloseDialog();
                }}>
                    Yes
                </Button>
            </DialogActions>
        </div>);
}

export default PopoutDelete;