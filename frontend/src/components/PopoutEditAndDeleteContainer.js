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
import PopoutEdit from './PopoutEdit';
import PopoutDelete from './PopoutDelete';

function PopoutEditAndDeleteContainer(props) {
    return (
        <Dialog
            open={props.open}
            fullWidth={true}
            maxWidth="xs"
            onClose={() => {
                props.handleCloseDialog();
            }}
        >
            {
                props.editOrDeleteToggle === "edit"
                    ? <PopoutEdit
                        handleCloseDialog={props.handleCloseDialog}
                        focusedCardId={props.focusedCardId}
                        cardsData={props.cardsData}
                        refetch={props.afterEditOrDelete}
                    />
                    : <PopoutDelete
                        handleCloseDialog={props.handleCloseDialog}
                        focusedCardId={props.focusedCardId}
                        refetch={props.afterEditOrDelete}
                    />
            }
        </Dialog>
    );

}

export default PopoutEditAndDeleteContainer;