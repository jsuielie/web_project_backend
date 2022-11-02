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

function PopoutAddCard(props) {
    const [message, setMessage] = useState("");
    const [cardImage, setCardImage] = useState(null);
    const [previewImageUrl, setPreviewImageUrl] = useState("");

    function updateInput(e, stateSetter, value) {
        console.log(value);
        stateSetter(value);
    }

    function cleanUp() {
        setMessage("");
        setCardImage(null);
        setPreviewImageUrl("");
    }

    function onChangeImage(e) {
        if (e.target.files[0].size <= 1000000) {
            e.preventDefault();
            let reader = new FileReader();
            let file = e.target.files[0];
            console.log(file);

            reader.onloadend = function (e) {
                const { result } = e.target;
                setPreviewImageUrl(result)
                setCardImage(file);
            };
            reader.readAsDataURL(file);
        }
        else {
            alert("The selected image is too big (> 1000000 bytes).");
        }
    }

    function submitCard(e) {
        e.preventDefault();

        console.log('before fetch');

        let formData = new FormData();
        formData.append("message", message);
        formData.append("cardImage", cardImage);
        formData.append("boardId", props.boardId)

        console.log(formData);

        fetch(`${API_URL}/create-card/?boardId=${props.boardId}`, {
            method: 'POST', // or 'PUT'
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw new Error("expiration of the loggin session");
                }
            })
            .then(data => {
                console.log(data);
                fetch(`${API_URL}/get-cards/?boardId=${props.boardId}`, { method: "GET" })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        props.setCardsData(data.cards);
                    })
            })
            .catch((error) => {
                console.log('Error:', error);
                alert(`Error: fail to write card due to ${error}.`);
                props.setAuthenticate(false);
            });
    }

    return (
        <Dialog
            open={props.open}
            fullWidth={true}
            maxWidth="xs"
            onClose={() => {
                if (message !== "" || cardImage !== null) {
                    alert("The content of the card will not saved.")
                }
                cleanUp();
                props.handleCloseDialog();
            }}
        >
            <div>
                <DialogTitle>Let's Write A Card</DialogTitle>
                <DialogContent>
                    {cardImage ?
                        <CardMedia
                            component="img"
                            height="50%"
                            image={previewImageUrl}
                            alt="Card Image"
                        /> : null}
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" onChange={(e) => onChangeImage(e)} />
                        <PhotoCamera />
                    </IconButton>
                    <Divider variant='middle' />
                    <TextField
                        margin="dense"
                        fullWidth
                        required
                        id="outlined-textarea"
                        multiline
                        value={message}
                        rows={4}
                        label="Message"
                        onChange={(e) => { updateInput(e, setMessage, e.target.value) }}
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
                        if (message === "") {
                            console.log("Message is empty!!")
                            alert("No message is typed.");
                        }
                        else if (cardImage === null) {
                            console.log("Card image is empty!!")
                            alert("No image is selected.");
                        }
                        else {
                            submitCard(e);
                            cleanUp();
                            props.handleCloseDialog();
                        }
                    }}>
                        Submit
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    );
}

export default PopoutAddCard;