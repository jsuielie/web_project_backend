import React, { useEffect, useState } from "react";

function BoardHeader(props) {
    return (
        <div className="board-header">
            <div>{props.title}</div>
        </div>
    )
}

export default BoardHeader;