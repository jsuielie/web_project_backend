import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import PopoutSignInSignUpContainer from './PopoutSignInSignUpContainer';
import Dashboard from '@mui/icons-material/Dashboard';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Logout from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginIcon from '@mui/icons-material/Login';
import ListItemIcon from '@mui/material/ListItemIcon';


function Header(props) {
    const [anchor, setAnchor] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleAvatarClick = (e) => {
        setAnchor(e.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchor(null);
    }

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const setAuthenticateToFalse = () => {
        fetch(`${API_URL}/logout`)
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                props.setAuthenticate(false);
                navigate("/");
            })
    }
    
    return (
        <Box>
            <AppBar position="fixed">
                <Toolbar>
                    <Dashboard />
                    <Typography
                        variant="h5"
                        component="a"
                        href="/"
                        sx={{
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        FreeCardBoard
                    </Typography>
                    <Tooltip title={"Accout Setting"}>
                        <IconButton onClick={handleAvatarClick}>
                            <Avatar alt="User Image" src={props.userImage} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchor}
                        id="account-menu"
                        open={Boolean(anchor)}
                        onClose={handleCloseMenu}
                        onClick={handleCloseMenu}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        {props.authenticate
                            ? <div>
                                <MenuItem onClick={() => {navigate("/profile")}}>
                                    <ListItemIcon>
                                        <AccountBoxIcon fontSize="small" />
                                    </ListItemIcon>
                                    profile
                                </MenuItem>
                                <MenuItem onClick={setAuthenticateToFalse}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </div>
                            : <div>
                                <MenuItem onClick={handleOpenDialog}>
                                    <ListItemIcon>
                                        <LoginIcon fontSize="small" />
                                    </ListItemIcon>
                                    Login
                                </MenuItem>
                            </div>}
                    </Menu>
                </Toolbar>
            </AppBar>
            <PopoutSignInSignUpContainer open={open}
                handleCloseDialog={handleCloseDialog}
                setAuthenticate={props.setAuthenticate}
                authenticate={props.authenticate}
            />
        </Box>
    );
};

export default Header;