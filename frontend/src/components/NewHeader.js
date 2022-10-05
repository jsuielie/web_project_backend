import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LoginDialog from './LoginDialog';
import AdbIcon from '@mui/icons-material/Adb';
import SignupDialog from './SignupDialog';


const beforeAuthenticatePages = ['Signup', 'Login', 'Login with Google'];
const afterAuthenticatePages = ['Profile', 'Boards', 'Friends', 'Logout'];


function NewHeader(props) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [pages, setPages] = useState(beforeAuthenticatePages);
    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [openSignupDialog, setOpenSignupDialog] = useState(false);

    const navigate = useNavigate();

    const handleClickOpenLoginDialog = () => {
        setOpenLoginDialog(true);
    };

    const handleCloseLoginDialog = () => {
        setOpenLoginDialog(false);
    };

    const handleClickOpenSignupDialog = () => {
        setOpenSignupDialog(true);
    };

    const handleCloseSignupDialog = () => {
        setOpenSignupDialog(false);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleMenuItemClick = (page) => {
        setAnchorElNav(null);
        switch (page) {
            case "Signup": {
                handleClickOpenSignupDialog();
                break;
            }
            case "Login with Google": {
                window.open(`${API_URL}/login/google`, "_self");
                break;
            }
            case "Login": {
                handleClickOpenLoginDialog();
                break;
            }
            case "Profile": {
                break;
            }
            case "Boards": {
                break;
            }
            case "Friends": {
                break;
            }
            case "Logout": {
                fetch(`${API_URL}/logout`)
                    .then(res => res.json())
                    .then((data) => {
                        console.log(data);
                        props.setAuthenticate(false);
                    })
                break;
            }
        }
    };

    useEffect(() => {
        if (props.authenticate) {
            setPages(afterAuthenticatePages);
        }
        else {
            setPages(beforeAuthenticatePages);
        }

    }, [props.authenticate]);

    return (
        <div>
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        CardBoard
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={() => { handleMenuItemClick(page) }}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        CardBoard
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => { handleMenuItemClick(page) }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="User Image">
                            <Avatar alt="User Image" src="/static/images/avatar/2.jpg" />
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        <LoginDialog open={openLoginDialog} handleCloseDialog={handleCloseLoginDialog} setAuthenticate={props.setAuthenticate}/>
        <SignupDialog open={openSignupDialog} handleCloseDialog={handleCloseSignupDialog} setAuthenticate={props.setAuthenticate}/>
        </div>
    );
};

export default NewHeader;