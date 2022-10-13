import ModeEdit from "@mui/icons-material/ModeEdit";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Stack, Tooltip } from "@mui/material";
import React from "react";

function EditDeleteBntGroup(props) {
    return (
        <Stack direction="row" spacing={1}>
            <Tooltip title="Edit This Card">
                <IconButton aria-label="edit" onClick={() => {
                    props.setFocusedCardId(props.cardId);
                    props.setEditOrDeleteToggle("edit");
                    props.handleOpenDialog();
                }}>
                    <ModeEdit />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete This Card">
                <IconButton aria-label="delete" onClick={() => {
                    props.setFocusedCardId(props.cardId);
                    props.setEditOrDeleteToggle("delete");
                    props.handleOpenDialog();
                }}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </Stack>
    )
}

export default EditDeleteBntGroup;