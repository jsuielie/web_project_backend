import { Fab, Tooltip } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import React from "react";
import { useNavigate } from "react-router-dom";

function Logout(props) {
    const navigate = useNavigate();
    function setAuthenticateToFalse(e) {
        e.preventDefault();
        fetch(`${API_URL}/logout`)
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                props.setAuthenticate(false);
                navigate("/");
            })
    }
    return (
        <Tooltip title="logout">
            <Fab color="secondary"
                aria-label="logout"
                onClick={setAuthenticateToFalse}
                sx={{
                    position: "fixed",
                    bottom: "1rem",
                    right: "1rem"
                }}>
                < LogoutIcon />
            </Fab>
        </Tooltip>
    );
}

export default Logout;