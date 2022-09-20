import React, { useEffect } from "react";
import SignUpSignInBnt from "./SignUpSignInBnt";


function Header(props) {
    
    return (
        <div>
            {!props.authenticate ? <SignUpSignInBnt /> : <div> Hello, {props.displayName}. </div>}
        </div>
    )
}

export default Header;