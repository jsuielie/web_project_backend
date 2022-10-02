import React from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteCard(props) {
    const navigate = useNavigate();
    function handleClick(e) {
        e.preventDefault();
        fetch(`${API_URL}/delete-card/?cardId=${props.cardId}`, { method: "delete" })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .then(() => {
                props.deleteCardsByCardId(props.cardId);
                navigate(`/board/${props.boardId}`);
            })
    }

    return (
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleClick}>
            Delete
        </Button>
    );
}

export default DeleteCard;