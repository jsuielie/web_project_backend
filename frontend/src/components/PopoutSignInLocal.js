import React, { useEffect, useState } from 'react';
import AdbIcon from '@mui/icons-material/Adb';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GoogleIcon from '@mui/icons-material/Google';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

function PopoutSignInLocal(props) {

    if (props.toggle === "signInLocal") {
        return (
            <div>
                <DialogTitle>Sign In At CardBoard</DialogTitle>
                <DialogContent>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ paddingTop: "20px" }}
                    >
                        <Grid xs={5}>
                            <TextField
                                required
                                id="outlined-required"
                                value={props.username}
                                label="user name"
                                onChange={(e) => { props.handleChange(e, props.setUsername, e.target.value) }}
                            />
                        </Grid>
                        <Grid xs={5}>
                            <TextField
                                required
                                id="outlined-required"
                                value={props.password}
                                label="password"
                                type="password"
                                onChange={(e) => { props.handleChange(e, props.setPassword, e.target.value) }}
                            />
                        </Grid>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            props.cleanUp();
                            props.setToggle("signInList");
                        }}
                    >Cancel
                    </Button>
                    <Button onClick={(e) => {
                        props.submitForm(e);
                        props.setToggle("signUpList");
                    }}>
                        Submit</Button>
                </DialogActions>
            </div>
        );
    }
    else {
        return null;
    }
}

export default PopoutSignInLocal;