import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

export default function SignupDialog(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [userImage, setUserImage] = useState(null);
    const [previewImageUrl, setPreviewImageUrl] = useState(null);

    function handleChange(e, stateSetter, value) {
        e.preventDefault();
        stateSetter(value);
    }

    function onChangeImage(e) {
        if (e.target.files[0].size <= 1000000) {
            let reader = new FileReader();
            e.preventDefault();
            console.log(e.target)
            var url = reader.readAsDataURL(e.target.files[0]);

            reader.onloadend = function (e) {
                setPreviewImageUrl(reader.result);
                if (reader.readyState == 2) {
                    console.log(e.target);
                    setUserImage(e.target.files[0]);
                }
            };
        }
        else {
            alert("The selected image is too big.");
        }
    }

    function cleanUp() {
        setUsername("");
        setPassword("");
        setLastName("");
        setFirstName("");
        setDisplayName("");
        setUserImage(null);
        setPreviewImageUrl(null);
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
        else if (lastName === "") {
            console.log("User didn't type his or her last name.");
            alert("No last name is typed.");
        }
        else if (firstName === "") {
            console.log("User didn't type his or her first name.");
            alert("No first name is typed.");
        }
        else if (displayName === "") {
            console.log("User didn't type his or her display name.");
            alert("No display name is typed.");
        }
        else if (userImage === null) {
            console.log("User image is empty!!")
            alert("No user image is selected.");
        }
        else {
            let formdata = new FormData();
            formdata.append("username", username);
            formdata.append("password", password);
            formdata.append("lastName", lastName);
            formdata.append("firstName", firstName);
            formdata.append("displayName", displayName);
            formdata.append("userImage", userImage);

            let authFormData = new FormData();
            authFormData.append("username", username);
            authFormData.append("password", password);

            fetch(`${API_URL}/local-sign-up`, {
                method: "POST",
                body: formdata
            })
                .then(response => response.json())
                .then((data) => {
                    console.log(data);

                    fetch(`${API_URL}/login/local`, {
                        method: "POST",
                        body: authFormData
                    })
                        .then(response => response.json())
                        .then((data) => {
                            console.log(data);

                            fetch(`${API_URL}/authenticate-checker`)
                                .then(response => response.json())
                                .then((data) => {
                                    console.log(data);
                                    props.setAuthenticate(data.authenticate);
                                    ;
                                })
                        })
                        .catch((error) => {
                            console.log(error);
                            navigate("/"); // need to redirect to a path to a page for error handling
                        })
                })
                .catch((error) => {
                    console.log(error);
                    navigate("/"); // need to redirect to a path to a page for error handling
                })


        }
    }

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={() => {
                    cleanUp();
                    props.handleCloseDialog();
                }}
            >
                <DialogTitle>Local Login</DialogTitle>

                <DialogContent>
                    <Stack
                        direction="column"
                        spacing={2}>
                        <Stack
                            direction="row"
                            spacing={2}
                        >
                            <Grid xs={2}>
                                <Avatar
                                    alt="User Image"
                                    src={previewImageUrl}
                                    sx={{ width: 56, height: 56 }}
                                />
                            </Grid>
                            <Grid xs={5}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    value={username}
                                    label="user name"
                                    onChange={(e) => { handleChange(e, setUsername, e.target.value) }}
                                />
                            </Grid>
                            <Grid xs={5}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    value={password}
                                    label="password"
                                    type="password"
                                    onChange={(e) => { handleChange(e, setPassword, e.target.value) }}
                                />
                            </Grid>
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={2}
                        >
                            <Grid xs={4}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    value={lastName}
                                    label="Last Name"
                                    onChange={(e) => { handleChange(e, setLastName, e.target.value) }}
                                />
                            </Grid>
                            <Grid xs={4}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    value={firstName}
                                    label="First Name"
                                    onChange={(e) => { handleChange(e, setFirstName, e.target.value) }}
                                />
                            </Grid>
                            <Grid xs={4}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    value={displayName}
                                    label="Display Name"
                                    onChange={(e) => { handleChange(e, setDisplayName, e.target.value) }}
                                />
                            </Grid>
                        </Stack>
                    </Stack>
                    <div>
                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file" onChange={(e) => onChangeImage(e)} />
                            <PhotoCamera />
                        </IconButton>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            cleanUp();
                            props.handleCloseDialog();
                        }}
                    >Cancel
                    </Button>
                    <Button onClick={submitForm}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}