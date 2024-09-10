import React, { useState, useEffect } from 'react';
import Navbar from '../Sidebar-nav/Navbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import '../../css/User/ProfileUser.css';
import { useParams } from 'react-router-dom';
import BackButton from '../BackButton/BackButton';


function ProfileUser() {
  const { officerId } = useParams();
  const [user, setUser] = useState({
    username: '',
    role: '',
    img: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    license: '',
    code: '',
    branch: '',
    area: '',
    province: '',
    region: '',
  });
  const [imgSrc, setImgSrc] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [originalUser, setOriginalUser] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false); // สถานะสำหรับ Snackbar

  useEffect(() => {
    const fetchUser = async () => {
      if (!officerId) {
        console.error('Officer ID is missing');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/Officers/userProfile?id=${officerId}`, {
          method: 'GET',
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setImgSrc(result.profilePicture ? `data:image/jpeg;base64,${result.profilePicture}` : 'default-img-url');
        setUser({
          username: result.username || 'Guest',
          firstName: result.firstName || 'Guest',
          lastName: result.lastName || 'Guest',
          email: result.email || 'Guest',
          phone: result.phone || 'Guest',
          team: result.team || 'Guest',
          code: result.code || 'Guest',
          license: result.license || 'Guest',
          role: result.access.access_name || 'N/A',
          branch: result.area.branch || 'N/A',
          area: result.area.area || 'N/A',
          province: result.area.province || 'N/A',
          region: result.area.region || 'N/A',
        });
        setOriginalUser(result); // Save the original user data
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser({
          username: 'Guest',
          role: 'N/A',
        });
      }
    };

    fetchUser();
  }, [officerId]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`http://localhost:5000/Officers/officers/${officerId}`, {
        method: 'PUT',
        body: JSON.stringify({
          email: user.email,
          phone: user.phone,
          license: user.license
        }),
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
      });

      if (!response.ok) {
        throw new Error('Error updating officer profile');
      }

      const data = await response.json();
      console.log('Officer updated successfully:', data);
      setEditMode(false); // Exit edit mode after saving
      setOpenSnackbar(true); // Show the success Snackbar
    } catch (error) {
      console.error('Error saving officer profile:', error);
    }
  };

  const handleCancelClick = () => {
    setEditMode(false);
    // Reset user state to original data if needed
    setUser({
      ...originalUser,
      username: originalUser?.username || 'Guest',
      role: originalUser?.access.access_name || 'N/A',
      firstName: originalUser?.firstName || 'Guest',
      lastName: originalUser?.lastName || 'Guest',
      email: originalUser?.email || 'Guest',
      phone: originalUser?.phone || 'Guest',
      team: originalUser?.team || 'Guest',
      code: originalUser?.code || 'Guest',
      license: originalUser?.license || 'Guest',
      branch: originalUser?.area.branch || 'N/A',
      area: originalUser?.area.area || 'N/A',
      province: originalUser?.area.province || 'N/A',
      region: originalUser?.area.region || 'N/A',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value }); // Update user state as input changes
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };
  return (
    <div className='Body'>
      <Navbar />
      <div className='container'>
        <div className='head-title' style={{width: '66rem'}}>
          <h4>Profile</h4>
          <BackButton />
        </div>
        <div className='inner-content'>
          <div className='head'>
            <img className='user-img' src={imgSrc} alt='User Avatar' />
            <div className='head-detail'>
              <h2>{user.firstName} {user.lastName}</h2>
              <h1>{user.role}</h1>
            </div>
          </div>
          <div className='Body-detail'>
            <div className='user-info'>
              <div className='top'>
                <h4>User Information</h4>
                <div style={{ display: 'inline-flex', gap: '10px', marginTop: '10px' }}>
                {!editMode ? (
                  <Button id='1' variant="outlined" onClick={handleEditClick}>Edit</Button>
                ) : (
                  <>
                    <Button id='2' variant="outlined" onClick={handleCancelClick}>Cancel</Button>
                    <Button variant="contained" onClick={handleSaveClick}>Save</Button>
                  </>
                )}
                </div>
              </div>
              <div className='body'>
                <div className='box'>
                  <h5>License:</h5>
                  {editMode ? (
                    <TextField
                      variant="outlined"
                      name="license"
                      value={user.license}
                      onChange={handleChange}
                      style={{ width: "100%" ,height: "100%"}}
                    />
                  ) : (
                    <p>{user.license}</p>
                  )}
                </div>
                <div className='box'>
                  <h5>Phone:</h5>
                  {editMode ? (
                    <TextField
                      variant="outlined"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      style={{ width: "100%" ,height: "100%"}}

                    />
                  ) : (
                    <p>{user.phone}</p>
                  )}
                </div>
                <div className='box'>
                  <h5>Email:</h5>
                  {editMode ? (
                    <TextField
                      variant="outlined"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      style={{ width: "100%" ,height: "100%"}}
                    />
                  ) : (
                    <p>{user.email}</p>
                  )}
                </div>
              </div>
            </div>
            <div className='footer-detail'>
              <div className='left-detail'>
                <h4>Affiliation</h4>
                <div className='row'>
                  <h5>Code:</h5>
                  <p>{user.code}</p>
                </div>
                <div className='row'>
                  <h5>Team:</h5>
                  <p>{user.team}</p>
                </div>
                <div className='row'>
                  <h5>Branch:</h5>
                  <p>{user.branch}</p>
                </div>
                <div className='row'>
                  <h5>Area:</h5>
                  <p>{user.area}</p>
                </div>
                <div className='row'>
                  <h5>Province:</h5>
                  <p>{user.province}</p>
                </div>
                <div className='row'>
                  <h5>Region:</h5>
                  <p>{user.region}</p>
                </div>
              </div>
              <div className='right-detail'>
                <div className='top-r'>
                  <h5>Commission</h5>
                  <div className='row'>
                    <h5>Price:</h5>
                    <p>2,880 บาท</p>
                  </div>
                </div>
                <div className='bottom-r'>
                  <h5>Created By</h5>
                  <div className='row'>
                    <h5>Name:</h5>
                    <p>วรภพ ศรีเฉิ่ม</p>
                  </div>
                  <div className='row'>
                    <h5>Position:</h5>
                    <p>แอดมิน</p>
                  </div>
                  <div className='row'>
                    <h5>Date:</h5>
                    <p>09/9/2567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}

          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              variant="filled"
              sx={{ width: '100%' }}
              icon={<CheckIcon fontSize="inherit" />}
            >
              Your profile has been updated successfully!
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;
