import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from 'react-router-dom';
import ColumnLayout from "./ColumnLayout";
import BoardHeader from "./BoardHeader";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EmailIcon from '@mui/icons-material/Email';
import PopoutAddCard from "./PopoutAddCard";
import PopoutEditAndDeleteContainer from "./PopoutEditAndDeleteContainer";
import PopoutInvitation from "./PopoutInvitation";
import { Button, Grid, Stack } from "@mui/material";
import PopoutSignInSignUpContainer from "./PopoutSignInSignUpContainer";

function Board() {
    let { boardId } = useParams();
    const [authenticate, setAuthenticate] = useOutletContext();
    const [cardsData, setCardsData] = useState([]);
    const [boardData, setBoardData] = useState("");
    const [colNum, setColNum] = useState(3);
    const [addAndSignUpSignInOpen, setAddAndSignUpSignInOpen] = useState(false);
    const [editAndDeleteOpen, setEditAndDeleteOpen] = useState(false);
    const [editOrDeleteToggle, setEditOrDeleteToggle] = useState(null);
    const [invitationOpen, setInvitationOpen] = useState(false);
    const [focusedCardId, setFocusedCardId] = useState(null);


    const handleCloseAddAndSignUpSignInDialog = () => {
        setAddAndSignUpSignInOpen(false);
    };

    const handleOpenAddAndSignUpSignInDialog = () => {
        setAddAndSignUpSignInOpen(true);
    };

    const handeCloseEditAndDeleteDiaglog = () => {
        setEditOrDeleteToggle(null);
        setFocusedCardId(null);
        setEditAndDeleteOpen(false);
    }

    const handleOpenEditAndDeleteDialog = () => {
        setEditAndDeleteOpen(true);
    }

    const handleCloseInvitationDialog = () => {
        setInvitationOpen(false);
    }

    const handleOpenInvitationDialog = () => {
        setInvitationOpen(true);
    }

    useEffect(() => {
        fetch(`${API_URL}/get-cards/?boardId=${boardId}`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                setCardsData(data.cards);
            });
        fetch(`${API_URL}/get-board/?boardId=${boardId}`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                setBoardData(data);
            })
    }, []);

    function afterEditOrDelete() {
        fetch(`${API_URL}/get-cards/?boardId=${boardId}`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                setCardsData(data.cards);
            });
    }

    return (
        < div className="board">
            <BoardHeader title={boardData.title} />
            <div className="main-layout">
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                >
                    <Stack
                        spacing={2}
                    >
                        <Button
                            variant="contained"
                            startIcon={<AddBoxIcon />}
                            onClick={handleOpenAddAndSignUpSignInDialog}
                            size="medium"
                        >
                            Add A New Card
                        </Button>
                        {boardData.editable
                            ? <Button
                                variant="contained"
                                startIcon={<EmailIcon />}
                                onClick={handleOpenInvitationDialog}
                                size="medium"
                            >
                                Invite A Friend
                            </Button>
                            : null
                        }
                    </Stack>
                    <ColumnLayout
                        authenticate={authenticate}
                        cardsData={cardsData}
                        colNum={colNum}
                        handleOpenDialog={handleOpenEditAndDeleteDialog}
                        setEditOrDeleteToggle={setEditOrDeleteToggle}
                        setFocusedCardId={setFocusedCardId}
                    />
                </Grid>
            </div>
            {authenticate
                ? <PopoutAddCard
                    open={addAndSignUpSignInOpen}
                    handleCloseDialog={handleCloseAddAndSignUpSignInDialog}
                    boardId={boardId}
                    setCardsData={setCardsData}
                    setAuthenticate={setAuthenticate}
                />
                : <PopoutSignInSignUpContainer
                    open={addAndSignUpSignInOpen}
                    handleCloseDialog={handleCloseAddAndSignUpSignInDialog}
                    setAuthenticate={setAuthenticate}
                />
            }
            {boardData.editable
                ? <PopoutInvitation
                    open={invitationOpen}
                    handleCloseDialog={handleCloseInvitationDialog}
                    boardId={boardId}
                    boardTitle={boardData.title}
                />
                : null
            }
            <PopoutEditAndDeleteContainer
                open={editAndDeleteOpen}
                handleCloseDialog={handeCloseEditAndDeleteDiaglog}
                focusedCardId={focusedCardId}
                cardsData={cardsData}
                editOrDeleteToggle={editOrDeleteToggle}
                afterEditOrDelete={afterEditOrDelete}
            />
        </div >
    )
}

export default Board;