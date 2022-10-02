import React from "react";
import {useOutletContext} from "react-router-dom";
import Introduction from "./Introduction";
import Boards from "./Boards";

function Home() {
    const [authenticate, useAuthenticate] = useOutletContext();
    return(
        authenticate ? <Introduction/> : <Boards />
    );
}

export default Home;