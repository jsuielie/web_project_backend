import React, { useState, useEffect } from "react";
import Header from "./Header"
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Logout from "./Logout";


const Layout = () => {
    const [displayName, setDisplayName] = useState("");
    const [authenticate, setAuthenticate] = useState(false);
    const [userImage, setUserImage] = useState("");

    useEffect(() => {
        fetch(`${API_URL}/authenticate-checker`)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setDisplayName(data.displayName);
                setAuthenticate(data.authenticate);
                setUserImage(data.userImage);
            });
    }, [authenticate]);

    return (
        <div className="page-container" onScroll={(e) => { e ? console.log("OMG!! page-container is screwed.") : console.log("No way") }}>
            <Header displayName={displayName} authenticate={authenticate} setAuthenticate={setAuthenticate} userImage={userImage} />
            <Outlet context={[authenticate, setAuthenticate]} />
            <Footer />
        </div>
    )
};

export default Layout;