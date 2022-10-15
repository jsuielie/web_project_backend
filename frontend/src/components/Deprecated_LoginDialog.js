import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function LoginDialog(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleChange(e, stateSetter, value) {
        e.preventDefault();
        stateSetter(value);
    }

    function cleanUp() {
        setUsername("");
        setPassword("");
    }

    function submitForm(e) {
        e.preventDefault();
        if (username === "") {
            console.log("User didn't type his or her name.");
            alert("No user name is typed.");
        }
        else if (password === "") {
            console.log("User didn't type his or her password.");
            alert("No password is typed.");
        }
        else {
            let formdata = new FormData();
            formdata.append("username", username);
            formdata.append("password", password);

            fetch(`${API_URL}/login/local`, {
                method: "POST",
                body: formdata
            })
                .then(response => response.json())
                .then((data) => {
                    console.log(data);
                    fetch(`${API_URL}/authenticate-checker`)
                        .then(response => response.json())
                        .then((data) => {
                            console.log(data);
                            props.setAuthenticate(data.authenticate);
                            props.handleCloseDialog();
                        })
                })
                .catch((error) => {
                    console.log(error);
                    props.handleCloseDialog();
                })



        }
    }

    return (
        <div>
            <Dialog open={props.open} onClose={() => {
                cleanUp();
                props.handleCloseDialog
            }}>
                <DialogTitle>Local Login</DialogTitle>
                <DialogContent>
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            value={username}
                            label="user name"
                            onChange={(e) => { handleChange(e, setUsername, e.target.value) }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            value={password}
                            label="password"
                            type="password"
                            onChange={(e) => { handleChange(e, setPassword, e.target.value) }}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        cleanUp();
                        props.handleCloseDialog
                    }}>
                        Cancel
                    </Button>
                    <Button onClick={submitForm}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}