import { Box } from "@mui/material";
import React from "react";

function Introduction() {
    return (
        <Box sx={{
            display: "flex",
            flexGrow: 1,
            position: "static",
            color: 'secondary',
            paddingTop: "5rem",
            paddingLeft: "5rem"
        }}>
            <div>
                This is an introduction to the CardBoard website. We are looking for a better world. Welcome to join us.
            </div>
        </Box>
    );
}

export default Introduction;