import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';


function PopoutCreateBoard(props) {
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    function updateInput(e, stateSetter, value) {
        e.preventDefault();
        console.log(value);
        stateSetter(value);
    }

    function cleanUp() {
        setTitle("");
    }


    function submitBoard(e) {
        e.preventDefault();
        if (title === "") {
            console.log("Message is empty!!")
            alert("No board is created.");
        }
        else {
            console.log('before fetch');
            let formData = new FormData();
            formData.append("title", title);

            fetch(`${API_URL}/create-board`, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then((data) => {
                    console.log(data);
                    navigate(`../board/${data.boardId}`);

                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Error: some error in editing card procedure!!!');
                });
        }
    }

    return (
        <Dialog
            open={props.open}
            fullWidth={true}
            maxWidth="xs"
            onClose={() => {
                cleanUp();
                props.handleCloseDialog();
            }}
        >
            <DialogTitle>Create A Board</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    fullWidth
                    required
                    id="outlined-textarea"
                    multiline
                    rows={1}
                    value={title}
                    label="title"
                    onChange={(e) => { updateInput(e, setTitle, e.target.value) }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        cleanUp();
                        props.handleCloseDialog();
                    }}
                >Cancel
                </Button>
                <Button onClick={(e) => {
                    submitBoard(e);
                    cleanUp();
                    props.handleCloseDialog();
                }}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PopoutCreateBoard;