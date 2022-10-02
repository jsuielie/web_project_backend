import React from "react";

function Logout(props) {
    function setAuthenticateToFalse(e) {
        e.preventDefault();
        fetch(`${API_URL}/logout`)
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                props.setAuthenticate(false);
            })
    }
    return (
        <div onClick={setAuthenticateToFalse} className="bnt">Logout</div>
    );
}

export default Logout;