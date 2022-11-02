import React from 'react';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import GoogleIcon from '@mui/icons-material/Google';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Dashboard from '@mui/icons-material/Dashboard';

function PopoutSinginList(props) {
    function handleClickSignInLocal() {
        props.setToggle("signInLocal");
    }

    function handleClickSignUp() {
        props.setToggle("signUpList");
    }

    if (props.toggle === "signInList") {
        return (
            <div>
                <DialogTitle>Welcome Back</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <Button variant="contained"
                            onClick={() => { window.open(`${API_URL}/login/google`, "_self") }}
                            startIcon={<GoogleIcon />}
                        >
                            Sign In With Google
                        </Button>
                        <Button variant="contained"
                            onClick={handleClickSignInLocal}
                            startIcon={<Dashboard />}
                        >
                            Sign In At CardBoard
                        </Button>
                        <div>No account? {<Link component="button" underline="none" onClick={handleClickSignUp}>Create one</Link>}</div>
                    </Stack>
                </DialogContent>
            </div>
        );
    }
    else {
        return null;
    }
}

export default PopoutSinginList;