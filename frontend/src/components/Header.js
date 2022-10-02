import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Logout from "./Logout";
import SignUpSignInBnt from "./SignUpSignInBnt";

function Header(props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="primary" sx={{overflow: "hidden", height: "5rem", position: "fixed", top: "0", width: "100%", boxSizing: "border-box"}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <div>
                        {!props.authenticate
                            ? <SignUpSignInBnt />
                            : <div> <div>Hello, {props.displayName}.</div><Logout setAuthenticate={props.setAuthenticate} /></div>}
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}


/*

import React, { useEffect } from "react";


function Header(props) {

    return (

    )
}

*/

export default Header;