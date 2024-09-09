import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateProfile = ({ officerId }) => {
  const [officerData, setOfficerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profilePicture: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (officerId) {
      const fetchOfficerData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/Officers/userProfile?id=${officerId}`, {
            headers: {
              'x-access-token': localStorage.getItem('token'),
            },
          });
  
          setOfficerData({
            firstName: response.data.firstName || '',
            lastName: response.data.lastName || '',
            email: response.data.email || '',
            phone: response.data.phone || '',
            profilePicture: response.data.profilePicture || null,
          });
  
          if (response.data.profilePicture) {
            setPreviewImage(`data:image/jpeg;base64,${response.data.profilePicture}`);
          }
        } catch (error) {
          console.error('Error fetching officer data:', error);
          setMessage('Error fetching officer data. Please try again.');
        }
      };
  
      fetchOfficerData();
    } else {
      setMessage('Invalid officer ID.');
    }
  }, [officerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOfficerData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setOfficerData(prevData => ({
      ...prevData,
      profilePicture: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!officerId) {
      setMessage('Officer ID is missing.');
      return;
    }

    const formData = new FormData();
    formData.append('firstName', officerData.firstName);
    formData.append('lastName', officerData.lastName);
    formData.append('email', officerData.email);
    formData.append('phone', officerData.phone);
    if (officerData.profilePicture) {
      formData.append('profilePicture', officerData.profilePicture);
    }

    try {
      const url = `http://localhost:5000/Officers/officers/${officerId}`;
      console.log(`Sending PUT request to: ${url}`);
      const response = await axios.put(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': localStorage.getItem('token'),
        },
      });
      setMessage('Officer updated successfully!');
      console.log('Response:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error message:', error.message);
        console.error('Axios error response:', error.response);
        console.error('Axios error config:', error.config);
      } else {
        console.error('Unexpected error:', error);
      }
      setMessage('Error updating officer.');
    }
  };

  return (
    <div className="edit-officer-container">
      <h2>Edit Officer</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={officerData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={officerData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={officerData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={officerData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Profile Picture:</label>
          <input type="file" onChange={handleFileChange} />
          {previewImage && <img src={previewImage} alt="Preview" style={{ width: '100px' }} />}
        </div>
        <button type="submit">Update Officer</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
