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

function PopoutSignupList(props) {
    function handleClickSignUpLocal() {
        props.setToggle("signUpLocal");
    }

    function handleClickSignIn() {
        props.setToggle("signInList");
    }

    if (props.toggle === "signUpList") {
        return (
            <div>
                <DialogTitle>Join CardBoard</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <Button variant="contained"
                            onClick={() => { window.open(`${API_URL}/login/google`, "_self") }}
                            startIcon={<GoogleIcon />}>
                            Sign Up With Google
                        </Button>
                        <Button variant="contained"
                            onClick={handleClickSignUpLocal}
                            startIcon={<AdbIcon />}>
                            Sign Up At CardBoard
                        </Button>
                        <div>Already have an account? {<Link component="button" underline="none" onClick={handleClickSignIn}>Sign in</Link>}</div>
                    </Stack>
                </DialogContent>
            </div>
        );
    }
    else {
        return null;
    }
}

export default PopoutSignupList;