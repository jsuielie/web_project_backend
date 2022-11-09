import { Box, Button, Divider, Grid, Paper } from "@mui/material";
import PostAddIcon from '@mui/icons-material/PostAdd';
import React, { useState } from "react";
import PopoutSignInSignUpContainer from "./PopoutSignInSignUpContainer";
import PopoutCreateBoard from "./PopoutCreateBoard";
import { useOutletContext } from "react-router-dom";

const introPictureURL =
    process.env.NODE_ENV === "production"
        ? "https://board-data-bucket.s3.ap-southeast-1.amazonaws.com/360_F_220143804_fc4xRygvJ8bn8JPQumtHJieDN4ORNyjs.jpg"
        : "../360_F_220143804_fc4xRygvJ8bn8JPQumtHJieDN4ORNyjs.jpg";

function Introduction() {
    const [openPopoutCreateBoard, setOpenPopoutCreateBoard] = useState(false);
    const [openPopoutSignInSignUpContainer, setOpenPopoutSignInSignUpContainer] = useState(false);
    const [authenticate, setAuthenticate] = useOutletContext();

    function handleButtonClick(e) {
        e.preventDefault();
        if (authenticate) {
            handleClickOpenPopoutIntroCreateBoard(true);
        }
        else {
            handleClickOpenPopoutSignInSignUpContainer(false);
        }
    }

    function handleClickOpenPopoutIntroCreateBoard() {
        setOpenPopoutCreateBoard(true);
    }

    function handleClickClosePopoutIntroCreateBoard() {
        setOpenPopoutCreateBoard(false);
    }

    function handleClickOpenPopoutSignInSignUpContainer() {
        setOpenPopoutSignInSignUpContainer(true);
    }

    function handleClickClosePopoutSignInSignUpContainer() {
        setOpenPopoutSignInSignUpContainer(false);
    }

    return (
        <Box sx={{
            display: "flex",
            flexGrow: 1,
            color: 'secondary',
            justifyContent: "center",
            flexDirection: "column"
        }}>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Paper
                    elevation={10}
                    sx={{
                        position: "relative",
                        width: "75vw",
                        marginTop: "10vh",
                        marginBottom: "1rem"
                    }}
                >
                    <Grid
                        item
                        sm={12}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "2rem"
                        }}
                    >
                        <img src={introPictureURL} width="75%" />

                    </Grid>
                    <Grid
                        container
                        item
                        sm={12}
                    >
                        <Grid
                            item
                            sm={12}
                        >
                            <p style={{ fontSize: "25px", fontWeight: "700", margin: "1rem", fontFamily: "monospace" }}>
                                FreeCardBoard is a website for writing a card. You can make memories for yourself, your
                                friends, family, and even strangers. Let's start with creating a board!
                            </p>
                        </Grid>
                    </Grid>
                </Paper>
                <Button variant="contained"
                    startIcon={<PostAddIcon />}
                    onClick={handleButtonClick}
                    sx={{
                        position: "static",
                        marginTop: "1rem",
                        marginBottom: "1rem"
                    }}
                >
                    Add A New Board
                </Button>
            </Grid>
            {authenticate
                ? <PopoutCreateBoard
                    open={openPopoutCreateBoard}
                    handleCloseDialog={handleClickClosePopoutIntroCreateBoard}
                />
                : <PopoutSignInSignUpContainer
                    open={openPopoutSignInSignUpContainer}
                    handleCloseDialog={handleClickClosePopoutSignInSignUpContainer}
                    setAuthenticate={setAuthenticate}
                />
            }
        </Box>
    );
}

export default Introduction;