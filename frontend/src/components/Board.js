import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from 'react-router-dom';
import ColumnLayout from "./ColumnLayout";
import BoardHeader from "./BoardHeader";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import PopoutAddCard from "./PopoutAddCard";
import PopoutEditAndDeleteContainer from "./PopoutEditAndDeleteContainer";
import { Tooltip } from "@mui/material";
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

    function afterDelete(focusedCardId) {
        fetch(`${API_URL}/delete-card/?cardId=${focusedCardId}`, { method: "delete" })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            console.log("delete the card with card ID: ", cardId);
            fetch(`${API_URL}/get-cards/?boardId=${boardId}`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                setCardsData(data.cards);
            });
        })
    };
    

    return (
        < div className="board">
            <BoardHeader title={boardData.title} />
            <div className="main-layout">
                <ColumnLayout
                    authenticate={authenticate}
                    cardsData={cardsData}
                    colNum={colNum}
                    handleOpenDialog={handleOpenEditAndDeleteDialog}
                    setEditOrDeleteToggle={setEditOrDeleteToggle}
                    setFocusedCardId={setFocusedCardId}
                />
            </div>
            <Tooltip title="Add A Card">
                <Fab color="secondary"
                    aria-label="edit"
                    onClick={handleOpenAddAndSignUpSignInDialog}
                    sx={{
                        position: "fixed",
                        bottom: "1rem",
                        right: "1rem"
                    }}>
                    <EditIcon />
                </Fab>
            </Tooltip>
            {authenticate
                ? <PopoutAddCard
                    open={addAndSignUpSignInOpen}
                    handleCloseDialog={handleCloseAddAndSignUpSignInDialog}
                    boardId={boardId}
                    setCardsData={setCardsData} />
                : <PopoutSignInSignUpContainer
                    open={addAndSignUpSignInOpen}
                    handleCloseDialog={handleCloseAddAndSignUpSignInDialog}
                    setAuthenticate={setAuthenticate}
                    authenticate={authenticate}
                />
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