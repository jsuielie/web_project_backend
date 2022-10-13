
import React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';

export default function BoardHeader(props) {
    console.log(props.title);
    return (
        <Box sx={{ display: "flex", flexGrow: 1, position: "static", color: 'secondary', paddingTop: "5.5rem", justifyContent: "center" }}>
            <Box sx={{ display: "flex", flexGrow: 1, position: "static", color: 'secondary', paddingTop: "1rem", paddingBottom: "1rem", justifyContent: "center", alignItems: "center" }}>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ alignSelf: 'flex-end', fontSize: "3rem" }}
                >
                    {props.title}
                </Typography>
            </Box>
        </Box>
    );
}


/*
import React, { useEffect, useState } from "react";

function BoardHeader(props) {
    return (
        <div className="board-header">
            <div>{props.title}</div>
        </div>
    )
}

export default BoardHeader;
*/