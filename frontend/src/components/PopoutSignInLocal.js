import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

function PopoutSignInLocal(props) {

    if (props.toggle === "signInLocal") {
        return (
            <div>
                <DialogTitle>Sign In At CardBoard</DialogTitle>
                <DialogContent>
                    <Grid
                        container
                        display="flex"
                        justifyContent="center"
                        spacing={2}
                    >
                        <Grid
                            item
                            sm={6}
                        >
                            <TextField
                                margin="dense"
                                required
                                id="outlined-required"
                                value={props.username}
                                label="user name"
                                rows={1}
                                onChange={(e) => { props.handleChange(e, props.setUsername, e.target.value) }}
                            />
                        </Grid>
                        <Grid
                            item
                            sm={6}
                        >
                            <TextField
                                margin="dense"
                                required
                                id="outlined-required"
                                value={props.password}
                                label="password"
                                type="password"
                                rows={1}
                                onChange={(e) => { props.handleChange(e, props.setPassword, e.target.value) }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            props.cleanUp();
                            props.setToggle("signInList");
                        }}
                    >
                        Cancel
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

export default PopoutSignInLocal;