import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { CardMedia, Divider } from '@mui/material';

function PopoutInvitation(props) {
    const [emailAddress, setEmailAddress] = useState("");
    const [receiverName, setReceiverName] = useState("");

    function updateInput(e, stateSetter, value) {
        console.log(value);
        stateSetter(value);
    }

    function cleanUp() {
        setEmailAddress("");
        setReceiverName("");
    }

    function submitCard(e) {
        e.preventDefault();

        console.log('before fetch');

        let formData = new FormData();
        formData.append("receiverName", receiverName);
        formData.append("emailAddress", emailAddress);
        formData.append("boardTitle", props.title);

        console.log(formData);

        fetch(`${API_URL}/invitationSending/?boardId=${props.boardId}`, {
            method: 'POST', // or 'PUT'
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw new Error("expiration of the loggin session or failure of message queue");
                }
            })
            .then(data => {
                console.log(data);
            })
            .catch((error) => {
                console.log('Error:', error);
                alert(`Error: fail to send invitation letter.`);
            });
    }

    return (
        <Dialog
            open={props.open}
            fullWidth={true}
            maxWidth="xs"
            onClose={() => {
                if (emailAddress === "") {
                    alert("The invitation will not be sent.")
                }
                cleanUp();
                props.handleCloseDialog();
            }}
        >
            <div>
                <DialogTitle>Let's Invite a Friend to Leave Message on Your Board.</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        fullWidth
                        required
                        id="outlined-textarea"
                        value={receiverName}
                        rows={4}
                        label="friend's name"
                        onChange={(e) => { updateInput(e, setReceiverName, e.target.value) }}
                    />
                    <TextField
                        margin="dense"
                        fullWidth
                        required
                        id="outlined-textarea"
                        value={emailAddress}
                        rows={4}
                        label="friend's email address"
                        onChange={(e) => { updateInput(e, setEmailAddress, e.target.value) }}
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
                        if (emailAddress === "") {
                            console.log("Email address is empty!!")
                            alert("No email address is typed.");
                        }
                        else {
                            submitCard(e);
                            cleanUp();
                            props.handleCloseDialog();
                            alert("Invitation has been sent.");
                        }
                    }}>
                        Submit
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    );
}

export default PopoutInvitation;