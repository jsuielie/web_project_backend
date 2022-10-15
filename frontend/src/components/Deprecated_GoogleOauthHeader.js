import React from "react";
import { GoogleLogin } from "react-google-login";

function GoogleOAuthHeader() {
    return (
        <div>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={handleLogin}
                onFailure={handleLogin}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
};

const handleLogin = async googleData => {
    console.log("log is being handled...");
    const res = await fetch("/api/v1/auth/google", {
        method: "POST",
        body: JSON.stringify({
            token: googleData.tokenId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    console.log(data);
    // store returned user somehow
}


export default GoogleOAuthHeader;