import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { Slide } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import '../../css/์Navbar.css';
import '../../css/sidebar.css';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import CalculateIcon from '@mui/icons-material/Calculate';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';


import Avatar from '@mui/material/Avatar';

import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({ username: '', role: '', img: '' });
    const [imgSrc, setImgSrc] = useState('');
    const [open, setOpen] = React.useState(true);
    const [id, setId] = useState('');
    const [accessUser, setAccessUser] = useState('');
    const [openDialog, setOpenDialog] = React.useState(false);

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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const Open = Boolean(anchorEl);
    const handleClicks = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // Profilee
    const handleRedirect = () => {
        if (id) {
            navigate(`/dashboard/User-profile/${id}`);
        } else {
            console.log('No userId available');
        }
    };

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleLogout = async () => {
        setOpen(false);
        try {
            // ส่งคำขอไปที่ API สำหรับการล็อกเอาต์
            await axios.post('http://localhost:5000/api/login/logout', {}, { headers: { 'x-access-token': localStorage.getItem('token') } });
            localStorage.removeItem('token');

            // เปลี่ยนเส้นทางไปยังหน้า login
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            // สามารถแจ้งเตือนผู้ใช้ว่าการล็อกเอาต์ล้มเหลว
        }
    };

    useEffect(() => {
        // Handle outside click (if applicable)
        const handleOutsideClick = (event) => {
            // Your outside click handling logic
        };

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);


    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const token = localStorage.getItem('token');

                if (token) {
                    console.log("Token exists:", token); // Verify the token presence

                    // Decode JWT Token
                    const decodedToken = jwtDecode(token);
                    console.log("Decoded Token:", decodedToken); // Check decoded token

                    const fetchedId = decodedToken.id || '';
                    const fetchedRole = decodedToken.accessUser || ''; // Extract role from token

                    if (fetchedId) {
                        setId(fetchedId); // Set the ID from the token
                    } else {
                        console.log('No ID found in the token');
                    }

                    if (fetchedRole) {
                        setAccessUser(decodeURIComponent(escape(fetchedRole))); // Set the role from the token
                    } else {
                        console.log('No role found in the token');
                    }
                } else {
                    console.log('No token found');
                }
            } catch (error) {
                console.error('Error fetching ID and role:', error);
            }
        };

        fetchUserId(); // Call function to fetch ID and role from the token
    }, []);

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
    function goToProject() {
        navigate('/dashboard/project-detail'); // กำหนด path 
    }
    function goToHome() {
        navigate('/dashboard'); // กำหนด path 
    }
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <ThemeProvider theme={theme}>
            <div className="nav-container">
                <nav ref={navRef}>
                    <div className='left-nav'>
                        <IconButton className='hov-btn'>
                            <MenuIcon className='ham-icon' onClick={toggleMenu} />
                        </IconButton>
                        <img src='https://companieslogo.com/img/orig/TTB.BK-d7b21f4a.png?t=1655632706' alt='Logo' onClick={goToHome} />
                    </div>
                    <div className='right-nav'>
                        <div className='user-info'>
                            <h4>{user.username}</h4>
                            <p>{user.role}</p>
                        </div>

                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClicks}
                                aria-controls={Open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={Open ? 'true' : undefined}
                            >
                                <img className='user-img' src={imgSrc} alt='User Avatar' />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={Open}
                            onClose={handleClose}
                            onClick={handleClose}
                            slotProps={{
                                paper: {
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
                                        '&::before': {
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
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={handleRedirect}>
                                <Avatar /> Profile
                            </MenuItem>

                            <Divider />


                            <MenuItem onClick={handleDialogOpen}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                        <Dialog
                            open={openDialog}
                            onClose={handleDialogClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"คุณต้องการออกจากระบบใช่หรือไม่?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    การออกจากระบบจะทำให้คุณต้องทำการเข้าสู่ระบบอีกครั้งเพื่อเข้าถึงระบบ.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleDialogClose}>ยกเลิก</Button>
                                <Button onClick={handleLogout} autoFocus>
                                    ยืนยัน
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                    <Slide direction="right" in={isOpen} mountOnEnter unmountOnExit>
                        <div className='side-container'>
                            <div className='top-section'>
                                <IconButton className='hov-btn'>
                                    <MenuIcon className='ham-icon' onClick={closeMenu} />
                                </IconButton>
                                <img src='https://companieslogo.com/img/orig/TTB.BK-d7b21f4a.png?t=1655632706' alt='Logo' onClick={goToHome} />
                            </div>
                            <div className='menu-section'>
                                <div className='topmenu-section' onClick={goToHome}>
                                    <HomeIcon className='home-icon' />
                                    <h3>หน้าหลัก</h3>
                                </div>
                                <List
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                        maxWidth: 360,
                                        bgcolor: 'background.paper',
                                        display: 'flex', // Use flexbox to ensure vertical alignment
                                        flexDirection: 'column', // Align items vertically
                                    }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                >
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <CalculateIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="วิเคราะห์สินเชื่อบ้าน" onClick={goToCal} />
                                    </ListItemButton>
                                    <Divider variant="middle" />
                                    <ListItemButton onClick={handleClick}>
                                        <ListItemIcon>
                                            <MapsHomeWorkOutlinedIcon />
                                        </ListItemIcon>
                                    <ListItemText primary="จัดการโครงการ" onClick={goToProject}/>
                                        {open ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <ListItemButton sx={{ pl: 9 }} >
                                                <ListItemText primary="ตรวจสอบโครงการ" onClick={goToProject}/>
                                            </ListItemButton>
                                            <ListItemButton sx={{ pl: 9 }}>
                                                
                                                <ListItemText primary="เพิ่มโครงการ" />
                                            </ListItemButton>
                                        </List>
                                    </Collapse>
                                    <Divider variant="middle" />
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <PeopleAltIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="จัดการลูกค้าที่สมัคร" />
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <FileCopyOutlinedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="จัดการใบสั่ง" />
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <RequestQuoteOutlinedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="จัดการคอมมิชชั่น" />
                                    </ListItemButton>
                                </List>
                            </div>
                        </div>
                    </Slide>
                </nav>
                <header className='-header'>ระบบบริหารจัดการข้อมูลการพิจารณาสินเชื่อบ้าน</header>
            </div>
        </ThemeProvider>
    );
}

export default Navbar;
