import React from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fab, Tooltip } from "@mui/material";

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
        <Tooltip title="Delet This Card">
            <Fab color="secondary"
                aria-label="delete"
                onClick={handleClick}
                sx={{
                    bottom: "1rem",
                    right: "1rem"
                }}>
                <DeleteIcon />
            </Fab>
        </Tooltip>
    );
}

export default DeleteCard;