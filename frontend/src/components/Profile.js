import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Box from '@mui/material/Box';
import BoardList from "./BoardLst";
import { Fab, Tooltip } from "@mui/material";
import PopoutCreateBoard from "./PopoutCreateBoard";
import ModeEdit from "@mui/icons-material/ModeEdit";

function Profile() {
    const [openPopoutCreateBoard, setOpenPopoutCreateBoard] = useState(false);
    const [boardsData, setBoardsDate] = useState([]);
    const [authenticate, setAuthenticate] = useOutletContext();

    function afterCreateBoard() {
        fetch(`${API_URL}/get-board-list`, { method: "GET" })
            .then(response => response.json())
            .then((data) => {
                setBoardsDate(data.boards);
            })
    }

    function handleClickOpenPopoutCreateBoard() {
        setOpenPopoutCreateBoard(true);
    }

    function handleClickClosePopoutCreateBoard() {
        setOpenPopoutCreateBoard(false);
    }

    useEffect(() => {
        if (authenticate) {
            fetch(`${API_URL}/get-board-list`, { method: "GET" })
                .then(response => response.json())
                .then((data) => {
                    setBoardsDate(data.boards);
                })
        }
    }, [authenticate]);


    return (
        <Box sx={{
            display: "flex",
            flexGrow: 1,
            position: "static",
            color: 'secondary',
            paddingTop: "5rem",
            paddingLeft: "5rem"
        }}>
            <BoardList boardsData={boardsData} />
            <Tooltip title="Create A Board">
                <Fab color="primary"
                    aria-label="edit"
                    onClick={handleClickOpenPopoutCreateBoard}
                    sx={{
                        position: "fixed",
                        bottom: "1rem",
                        right: "1rem"
                    }}>
                    <ModeEdit />
                </Fab>
            </Tooltip>
            <PopoutCreateBoard
                open={openPopoutCreateBoard}
                handleCloseDialog={handleClickClosePopoutCreateBoard}
                refetch={afterCreateBoard}
            />
        </Box>
    );
}

export default Profile;