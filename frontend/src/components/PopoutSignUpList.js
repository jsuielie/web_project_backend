import React from 'react';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import GoogleIcon from '@mui/icons-material/Google';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Dashboard from '@mui/icons-material/Dashboard';

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
                            startIcon={<Dashboard />}>
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