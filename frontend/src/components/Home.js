import React from "react";
import {useOutletContext} from "react-router-dom";
import Introduction from "./Introduction";
import Profile from "./Profile";

function Home() {
    const [authenticate, useAuthenticate] = useOutletContext();
    return(
        authenticate ? <Introduction/> : <Profile />
    );
}

export default Home;