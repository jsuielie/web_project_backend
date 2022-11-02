import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import BoardList from "./BoardLst";
import { Avatar, Button, Divider, Fab, Grid, Paper, Stack, Tooltip, Typography } from "@mui/material";
import PopoutCreateBoard from "./PopoutCreateBoard";
import PostAddIcon from '@mui/icons-material/PostAdd';

function Profile() {
    const [openPopoutCreateBoard, setOpenPopoutCreateBoard] = useState(false);
    const [boardsData, setBoardsDate] = useState([]);
    const [authenticate, setAuthenticate] = useOutletContext();
    const [displayName, setDisplayName] = useState("");
    const [userImage, setUserImage] = useState("");
    const [boardNum, setBoardNum] = useState(0);

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
        fetch(`${API_URL}/authenticate-checker`)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setDisplayName(data.displayName);
                setUserImage(data.userImage);
            });
    }, []);

    useEffect(() => {
        if (authenticate) {
            fetch(`${API_URL}/get-board-list`, { method: "GET" })
                .then(response => response.json())
                .then((data) => {
                    setBoardsDate(data.boards);
                    setBoardNum(data.boards.length);
                })
        }
    }, [authenticate]);


    return (
        authenticate
            ?
            <Grid
                container
                item
                direction="column"
                spacing={2}
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Paper
                    elevation={10}
                    sx={{
                        width: "75vw",
                        marginTop: "12vh",
                        marginBottom: "4rem"
                    }}
                >
                    <Grid
                        container
                        item
                        sm={12}
                        direction="column"
                        spacing={1}
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{ marginTop: "1rem"}}
                    >
                        <Grid
                            item
                            sm={9}
                        >
                            <Avatar
                                alt="User Image"
                                src={userImage}
                                sx={{ width: "6rem", height: "6rem" }}
                            />
                        </Grid>
                        <Grid item>
                            <Typography
                                fontWeight={700}
                                fontFamily="sans-serif"
                            >
                                {displayName}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                fontWeight={700}
                                fontFamily="monospace"
                            >
                                {boardNum} Boards
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            item
                            direction="row"
                        >
                            <Grid item xs={8} />
                            <Grid item xs={4}>
                                <Button
                                    sx={{ position: "relative", top: "1rem" }}
                                    variant="contained"
                                    startIcon={<PostAddIcon />}
                                    onClick={handleClickOpenPopoutCreateBoard}
                                    fontFamily="monospace"
                                >
                                    Add A New Board
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid
                        item
                        xs={12}
                    >
                        <BoardList boardsData={boardsData} />
                    </Grid>
                    <PopoutCreateBoard
                        open={openPopoutCreateBoard}
                        handleCloseDialog={handleClickClosePopoutCreateBoard}
                    />
                </Paper>
            </Grid>
            : null
    );
}

export default Profile;