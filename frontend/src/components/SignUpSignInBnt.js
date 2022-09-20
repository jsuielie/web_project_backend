import React from "react";
import { Link } from "react-router-dom";

function SignUpSignInBnt() {
    return (
        <div>
            <div onClick={() => { window.open(`${API_URL}/login/google`, "_self") }}>
                Log in with Google
            </div>
            <div>
                <Link to={"/local-login"}>
                    Log in to CardBorad
                </Link>
            </div>
            <div>
                <Link to={"/local-signup"}>
                    Sign up to CardBoard
                </ Link>
            </div>
        </div>
    )
}

export default SignUpSignInBnt;