import React from "react";
import { Link } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import Fingerprint from '@mui/icons-material/Fingerprint'
import Stack from '@mui/material/Stack';

function SignUpSignInBnt() {
    return (
        <Stack direction="row" spacing={1}>
            <Button variant="contained" color="secondary" endIcon={<LoginIcon />} onClick={() => { window.open(`${API_URL}/login/google`, "_self") }}>
                Log in with Google
            </Button>
            <Button variant="contained" color="secondary" endIcon={<LoginIcon />}>
                <Link to={"/local-login"}>
                    Log in to CardBorad
                </Link>
            </Button>
            <Button variant="contained" color="secondary" endIcon={<Fingerprint />}>
                <Link to={"/local-signup"}>
                    Sign up to CardBoard
                </ Link>
            </Button>
        </Stack>
    )
}

export default SignUpSignInBnt;