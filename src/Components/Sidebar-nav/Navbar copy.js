import React, { useState, useRef, useEffect } from 'react';
import {useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Slide } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../../css/์Navbar.css';
import '../../css/sidebar.css';

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
                    <Slide direction="right" in={isOpen} mountOnEnter unmountOnExit>
                        <div className='side-container'>
                            <div className='top-section'>
                                <IconButton className='hov-btn'>
                                    <MenuIcon className='ham-icon' onClick={closeMenu} />
                                </IconButton>
                                <img src='https://companieslogo.com/img/orig/TTB.BK-d7b21f4a.png?t=1655632706' alt='Logo' />
                            </div>
                            <div className='menu-section'>
                                <div className='topmenu-section' onClick={goToHome}>
                                    <HomeIcon className='home-icon' />
                                    <h3>หน้าหลัก</h3>
                                </div>
                                <SimpleTreeView className='menu'>
                                    <TreeItem className='menu-selection font-use' itemId="grid" label="จัดการสมัครสินเชื่อ" >
                                        <TreeItem itemId="grid-community" label="เพิ่มข้อมูลลูกค้า" />
                                        <TreeItem itemId="grid-pro" label="ตรวจสอบข้อมูลลูกค้า" />
                                    </TreeItem>
                                    <TreeItem className='menu-selection' itemId="pickers" label="จัดการใบสั่งงาน">
                                        <TreeItem itemId="pickers-community" label="เพิ่มใบสั่งงาน" />
                                        <TreeItem itemId="pickers-pro" label="ตรวจสอบพนักงานรับส่งเอกสาร" />
                                        <TreeItem itemId="2" label="ตรวจสอบใบสั่งงาน" />
                                    </TreeItem>
                                    <TreeItem className='menu-selection' itemId='project' label="จัดการโครงการ">
                                        <TreeItem itemId="project-1" label="เพิ่มข้อมูลลูกค้า" />
                                        <TreeItem itemId="project-2" label="ตรวจสอบข้อมูลลูกค้า" />
                                    </TreeItem>
                                    <TreeItem className='menu-selection' itemId='cal' label="วิเคราะห์สินเชื่อบ้าน" onClick={goToCal}></TreeItem>
                                </SimpleTreeView>
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
