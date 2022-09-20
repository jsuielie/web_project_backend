import React, { useEffect, useState } from "react";
import Column from "./Column";

function initializeEmptyArray(n){
    var array = [];
    for (let i = 0; i < n; i++){
        array.push([]);
    }
    return array;
}


function ColumnLayout(props) {
    const [cardsSepByCol, setCardsSepByCol] = useState(initializeEmptyArray(props.colNum));

    useEffect(() => {
        console.log(cardsSepByCol,props);
        let newCardsSepByCol = initializeEmptyArray(props.colNum);
        
        for (let idx = 0; idx < props.cardsData.length; idx++) {
            
            let remainder = idx % props.colNum;
            let item = props.cardsData[idx];
            (newCardsSepByCol[remainder]).push(item);
            console.log("within foop loop, loop:", idx, newCardsSepByCol, remainder, item);
        }

        console.log("After for loop", newCardsSepByCol);

        setCardsSepByCol(newCardsSepByCol);
        
    }, [props.cardsData]);


    return (
        <div className="column-layout">
            {cardsSepByCol.map((cardDataInSingleCol, index) => <Column key={index} cardDataInSingleCol={cardDataInSingleCol} authenticate={props.authenticate}/>)}
        </div>
    )
}

export default ColumnLayout;