import { Box } from "@mui/material";
import React from "react";

function NotFound() {
    return (
        <Box sx={{
            display: "flex",
            flexGrow: 1,
            position: "static",
            color: 'secondary',
            paddingTop: "5rem",
            paddingLeft: "5rem"
        }}>
            <div>404 not found</div>
        </Box>
    );
};

export default NotFound;

