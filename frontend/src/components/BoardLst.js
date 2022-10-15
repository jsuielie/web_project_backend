import React from "react";
import { List } from "@mui/material";
import BoardPoint from "./BoardPoint";

function BoardList(props) {

    return (
        <List dense={false}>
            {props.boardsData.map(boardPoint => <BoardPoint
                key={boardPoint.boardId}
                boardId={boardPoint.boardId}
                title={boardPoint.title}
                createTime={boardPoint.createTime}
                editable={boardPoint.editable}
            />)}
        </List>
    )
}

export default BoardList;