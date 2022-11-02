import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

function PopoutSignUpLocal(props) {

    if (props.toggle === "signUpLocal") {
        return (
            <div>
                <DialogTitle>Sign Up At CardBoard</DialogTitle>
                <DialogContent>
                    <Stack
                        direction="column"
                        spacing={2}>
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ paddingTop: "20px" }}
                        >
                            <Grid>
                                <Avatar
                                    alt="User Image"
                                    src={props.previewImageUrl}
                                    sx={{ width: 56, height: 56 }}
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    required
                                    id="outlined-required"
                                    value={props.username}
                                    label="user name"
                                    rows={1}
                                    onChange={(e) => { props.handleChange(e, props.setUsername, e.target.value) }}
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    required
                                    id="outlined-required"
                                    value={props.password}
                                    label="password"
                                    type="password"
                                    rows={1}
                                    onChange={(e) => { props.handleChange(e, props.setPassword, e.target.value) }}
                                />
                            </Grid>
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={2}
                        >
                            <Grid>
                                <TextField
                                    required
                                    id="outlined-required"
                                    value={props.lastName}
                                    label="Last Name"
                                    rows={1}
                                    onChange={(e) => { props.handleChange(e, props.setLastName, e.target.value) }}
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    required
                                    id="outlined-required"
                                    value={props.firstName}
                                    label="First Name"
                                    rows={1}
                                    onChange={(e) => { props.handleChange(e, props.setFirstName, e.target.value) }}
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    required
                                    id="outlined-required"
                                    value={props.displayName}
                                    label="Display Name"
                                    rows={1}
                                    onChange={(e) => { props.handleChange(e, props.setDisplayName, e.target.value) }}
                                />
                            </Grid>
                        </Stack>
                    </Stack>
                    <div>
                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file" onChange={(e) => props.onChangeImage(e)} />
                            <PhotoCamera />
                        </IconButton>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            props.cleanUp();
                            props.setToggle("signUpList");
                        }}
                    >Cancel
                    </Button>
                    <Button onClick={(e) => {
                        props.submitForm(e);
                    }}>
                        Submit
                    </Button>
                </DialogActions>
            </div>
        );
    }
    else {
        return null;
    }
}

export default PopoutSignUpLocal;

