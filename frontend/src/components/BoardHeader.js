
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
