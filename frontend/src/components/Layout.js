import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    const [displayName, setDisplayName] = useState("");
    const [authenticate, setAuthenticate] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/authenticate-checker`)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setDisplayName(data.displayName);
                setAuthenticate(data.authenticate)
            });
    });

    return (
        <div className="page-container" onScroll={(e) => { e ? console.log("OMG!! page-container is screwed.") : console.log("No way") }}>
            <div className="navbar"><Header displayName={displayName} authenticate={authenticate}/></div>
            <div className="content-wrap">
                <Outlet context={[authenticate, setAuthenticate]}/>
            </div>
            <div className="footer"><Footer /></div>
        </div>
    )
};

export default Layout;