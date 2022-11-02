import DashboardIcon from '@mui/icons-material/Dashboard';
import { Avatar, ListItemAvatar, ListItemButton, ListItemText, Tooltip } from "@mui/material";
import React from "react";
import moment from 'moment';
import { Link } from 'react-router-dom';

function BoardPoint(props) {
    const date = moment(props.createTime, "YYYY-MM-DDThh:mm:ss.SSSZ");
    return (
        <Link
            to={`../board/${props.boardId}`}
            style={{
                textDecoration: "none",
                color: "#858585"
            }}>
            <ListItemButton
            >
                <ListItemAvatar>
                    <Avatar>
                        <DashboardIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={props.title}
                    secondary={date.format("YYYY/MM/DD")}
                />
            </ListItemButton>
        </Link>
    );
}

export default BoardPoint;

