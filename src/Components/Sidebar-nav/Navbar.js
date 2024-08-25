import React, { useState, useRef, useEffect } from 'react';
import {useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Slide } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';

import IconButton from '@mui/material/IconButton';

import ListItemButton from '@mui/material/ListItemButton';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import '../../css/์Navbar.css';
import '../../css/sidebar.css';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({ username: '', role: '', img: '' });
    const [imgSrc, setImgSrc] = useState('');

    const navRef = useRef(null);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const handleOutsideClick = (event) => {
        if (navRef.current && !navRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);
    
    const Theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
      setOpen(!open);
    };
    // ------------
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:5000/Officers/userProfile', {
                    method: 'GET',
                    headers: {
                        'x-access-token': localStorage.getItem('token') // เปลี่ยนเป็น x-access-token
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                console.log(result.profilePicture)
                setImgSrc(result.profilePicture ? `data:image/jpeg;base64,${result.profilePicture}` : 'default-img-url');
                // ตรวจสอบค่าที่ได้รับจาก API
                setUser({
                    username: result.username || 'Guest',
                    role: result.access.access_name || 'N/A',
                
                });

            } catch (error) {
                console.error('Error fetching user:', error);
                setUser({
                    username: 'Guest',
                    role: 'N/A',
                });
            }
        };

        fetchUser();
    }, []);

    const theme = createTheme({
        typography: {
            fontFamily: 'IBM Plex Sans Thai',
            fontSize: 16,
        },
    });
    // route manage
    function goToCal() {
        navigate('/dashboard/homeloancal'); // กำหนด path ไปยังหน้าวิเคราะห์
    }
    function goToHome() {
        navigate('/dashboard'); // กำหนด path 
    }
    return (
        <ThemeProvider theme={theme}>
            <div className="nav-container">
                <nav ref={navRef}>
                    <div className='left-nav'>
                        <IconButton className='hov-btn'>
                            <MenuIcon className='ham-icon' onClick={toggleMenu} />
                        </IconButton>
                        <img src='https://companieslogo.com/img/orig/TTB.BK-d7b21f4a.png?t=1655632706' alt='Logo' onClick={goToHome}/>
                    </div>
                    <div className='right-nav'>
                        <div className='user-info'>
                            <h4>{user.username}</h4>
                            <p>{user.role}</p>
                        </div>
                        <img className='user-img' src={imgSrc} alt='User Avatar' />
                    </div>
                    <Slide direction="right" in={open} mountOnEnter unmountOnExit>
                    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Sent mail" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
                    </Slide>
                </nav>
                <header className='-header'>ระบบบริหารจัดการข้อมูลการพิจารณาสินเชื่อบ้าน</header>
            </div>
        </ThemeProvider>
    );
}

export default Navbar;
