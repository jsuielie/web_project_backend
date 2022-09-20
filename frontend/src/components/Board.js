import React, { useEffect, useState } from "react";
import { Link, useParams, useOutletContext } from 'react-router-dom';
import ColumnLayout from "./ColumnLayout";
import BoardHeader from "./BoardHeader";

function Board() {
    let { boardId } = useParams();
    const [authenticate, setAuthenticate] = useOutletContext();
    const [cardsData, setCardsData] = useState([]);
    const [boardData, setBoardData] = useState({});
    const [colNum, setColNum] = useState(3);

    useEffect(() => {
        fetch(`${API_URL}/get-cards/?boardId=${boardId}`, { method: "GET" }) // get board data from database
            .then(response => response.json())
            .then(data => {
                console.log(boardId);
                setCardsData(data.cards);
                console.log("data borad content");
                console.log(data.cards);
            });
        fetch(`${API_URL}/get-board/?boardId=${boardId}`, { method: "GET" }) // get board data from database
            .then(response => response.json())
            .then(data => {
                setBoardData(data);
            })
    }, []);


    return (
        < div className="board">
            <BoardHeader title={boardData.title} />
            {authenticate ? <div className="btn"><Link to={`/add-new-card/${boardId}`}>Add New Card</Link></div> : null}
            <div className="main-layout">
                <ColumnLayout authenticate={authenticate} cardsData={cardsData} colNum={colNum} />
            </div>
        </div >
    )
}

export default Board;