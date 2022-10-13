import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { Card, CardMedia, Divider } from '@mui/material';


function PopoutEdit(props) {
    const [message, setMessage] = useState("");
    const [cardImage, setCardImage] = useState(null);
    const [previewImageUrl, setPreviewImageUrl] = useState("");

    useEffect(() => {
        let [targetCard] = props.cardsData.filter(card => card.cardId == props.focusedCardId);
        setMessage(targetCard.message);
        setPreviewImageUrl(targetCard.imageUrl);
    }, []);

    function updateInput(e, stateSetter, value) {
        e.preventDefault();
        console.log(value);
        stateSetter(value);
    }

    function cleanUp() {
        setMessage(null);
        setCardImage(null);
        setPreviewImageUrl(null);
    }

    function onChangeImage(e) {
        let reader = new FileReader();
        e.preventDefault();
        let file = e.target.files[0];

        reader.onloadend = function (e) {
            let { result } = e.target;
            setPreviewImageUrl(result);
        };

        let url = reader.readAsDataURL(file);
        setCardImage(file);
        setPreviewImageUrl(url);
    }

    function submitCard(e) {
        e.preventDefault();
        if (message === "") {
            console.log("Message is empty!!")
            alert("No message is typed.");
        }
        else {
            console.log('before fetch');
            console.log("cardId", props.focusedCardId);
            let formData = new FormData();
            formData.append("message", message);
            if (cardImage !== null) {
                formData.append("cardImage", cardImage);
            }

            console.log(formData);

            fetch(`${API_URL}/edit-card/?cardId=${props.focusedCardId}`, {
                method: 'POST', // or 'PUT'
                body: formData,
            })
                .then(response => response.json())
                .then((data) => {
                    console.log(data);
                    props.refetch();
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Error: some error in editing card procedure!!!');
                });
        }
    }
    return (
        <div>
            <DialogTitle>Edit A Card</DialogTitle>
            <DialogContent>
                {props.cardImage || cardImage ?
                    <CardMedia
                        component="img"
                        height="70%"
                        image={previewImageUrl}
                        alt="green iguana"
                    /> : null}
                <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" onChange={(e) => onChangeImage(e)} />
                    <PhotoCamera />
                </IconButton>
                <Divider variant='middle' />
                <TextField
                    fullWidth
                    required
                    id="outlined-textarea"
                    multiline
                    value={message}
                    label="Message"
                    onChange={(e) => { updateInput(e, setMessage, e.target.value) }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        props.handleCloseDialog();
                    }}
                >Cancel
                </Button>
                <Button onClick={(e) => {
                    props.handleCloseDialog();
                    submitCard(e);  
                }}>
                    Submit
                </Button>
            </DialogActions>
        </div>
    );
}

export default PopoutEdit;