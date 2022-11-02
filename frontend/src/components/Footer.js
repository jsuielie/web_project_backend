import React from "react";
import Box from '@mui/material/Box';
import { Button, Typography } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {

    return (
        <Box
            sx={{
                position: "absolute",
                bottom: "0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: 'primary.main',
                width: "100vw"
            }}
        >
            <Button onClick={() => { window.open("https://github.com/jsuielie") }}>
                <Typography
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "white"
                    }}
                >
                    <GitHubIcon
                        sx={{paddingRight: "0.5rem"}}
                    />
                </Typography>
            </Button>
        </Box>
    )
};

export default Footer;