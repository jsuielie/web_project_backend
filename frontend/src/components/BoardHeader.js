
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
        <Box sx={{ flexGrow: 1, position: "static", color: 'secondary', justifyContent: "center"}}>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, alignSelf: 'flex-end', height: "7rem" }}
                >
                    {props.title}
                </Typography>
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