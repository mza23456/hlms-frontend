import React, { useState, useEffect } from "react";
import Navbar from "../Sidebar-nav/Navbar";
import HomeIcon from "../../img/house (1).png";
import "../../css/Project.css/project_lists.css";
import { LuTrash2 } from "react-icons/lu";
import { LuPencilLine } from "react-icons/lu";
import { Button, TextField, Select, InputLabel, MenuItem, FormControl, Collapse } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Project = () => { 
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState(''); // State for project type selection


  useEffect(() => {
    // Fetch data from your API endpoint
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Project/ProjectInfo'); // แทนที่ URL ด้วย endpoint ของคุณ
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('คุณแน่ใจว่าต้องการลบโครงการนี้หรือไม่?')) {
      try {
        await axios.delete(`http://localhost:5000/Project/projects/${projectId}`); // Replace with your API URL
        setProjects(projects.filter((project) => project.projectId !== projectId)); // Update the UI by removing the deleted project
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const filteredProjects = projects.filter(project =>
    (project.saleName.includes(searchTerm) ||
    project.owner.includes(searchTerm) ||
    project.name.includes(searchTerm)) &&
    (selectedType === '' || project.type === selectedType) // Filter by project type
  );

  const handleEditClick = (projectId) => {
    navigate(`/project-details/${projectId}`);
  };

  return (
    <div className="container">
      <Navbar />
      <h1>ตรวจสอบโครงการ</h1>
      <p>ระบบค้นหาแบบรวมเงื่อนไข</p>
      <div className="search-section">
      <div className="select-box">
      <div className="projecttype">
        <FormControl style={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-label2">ประเภทโครงการ</InputLabel>
          <Select
            labelId="demo-simple-select-label2"
            id="project-select"
            value={selectedType}
            onChange={handleTypeChange}
            style={{ width: "100%" }}
            label="ประเภทโครงการ"
          >
            <MenuItem value="">ทั้งหมด</MenuItem>
            <MenuItem value="Top Selective">Top Selective</MenuItem>
            <MenuItem value="Non Selective">Non Selective</MenuItem>
          </Select>
        </FormControl>
      </div>
      </div>
  {/* <div className="input-container">
  <TextField label="ค้นหา" style={{ width: "100%" }} />
  </div>
  <button className="reset-button">ล้างข้อมูล</button> */}
        <div className="input-container">
        <TextField 
          label="ค้นหา" 
          value={searchTerm} 
          onChange={handleSearchChange} 
          style={{ width: "100%" }} 
        />
      </div>
      <button className="reset-button" onClick={() => { setSearchTerm(''); setSelectedType(''); }}>ล้างข้อมูล</button>
</div>
      <table className="project-table">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>พนักงานผู้รับผิดชอบ</th>
            <th>ชื่อบริษัท</th>
            <th>ชื่อบริษัทย่อย</th>
            <th>ประเภทโครงการ</th>
            <th>การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>1</td>
            <td>กนกวรรณ สุนทรานนท์</td>
            <td>บมจ. เอพี (ไทยแลนด์)</td>
            <td>บจ. เอพี (สาทร)</td>
            <td>HomeLoan Management System</td>
            <td>
              <div className="icon-container">
                <LuTrash2
                  color="#FF8000"
                  size="40px"
                  fontWeight="bold" // Make sure to use a valid value for fontWeight
                  style={{
                    backgroundColor: '#FFDDBA',
                    borderRadius: '10px',
                    padding: '5px',
                    cursor: 'pointer', // Add cursor pointer for better UX
                  }}
                />
              </div>
              <LuPencilLine
                color="#015CCA"
                size="40px"
                fontWeight="bold" // Make sure to use a valid value for fontWeight
                style={{
                  backgroundColor: '#69AFFD',
                  borderRadius: '10px',
                  padding: '5px',
                  cursor: 'pointer', // Add cursor pointer for better UX
                }}
                onClick={() => handleEditClick(1)} // Pass project ID
              />
            </td>
          </tr> */}
          {filteredProjects.map((project, index) => (
            <tr key={project.projectId}>
              <td>{index + 1}</td>
              <td>{project.officer?.firstName}</td>
              <td>{project.owner}</td>
              <td>{project.name}</td>
              <td>{project.type}</td>
              <td>
                <div className="icon-container">
                  <LuTrash2
                    color="#FF8000"
                    size="40px"
                    style={{
                      backgroundColor: '#FFDDBA',
                      borderRadius: '10px',
                      padding: '5px',
                      cursor: 'pointer',
                      marginRight: '10px', // Add margin to the right
                    }}
                    onClick={() => handleDelete(project.projectId)}
                  />
                  <LuPencilLine
                    color="#015CCA"
                    size="40px"
                    style={{
                      backgroundColor: '#69AFFD',
                      borderRadius: '10px',
                      padding: '5px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleEditClick(project.projectId)}
                  />
                </div>
              </td>
            </tr>
          ))}
          {/* <tr>
            <td>2</td>
            <td>ศุภเศรษฐ์ โมธรรม</td>
            <td>บมจ. เอพี (ไทยแลนด์)</td>
            <td>บจ. เอพี (รัชโยธิน)</td>
            <td>HomeLoan Management System</td>
            <td>
              <div className="icon-container">
                <LuTrash2
                  color="#FF8000"
                  size="40px"
                  fontWeight="bold" // Make sure to use a valid value for fontWeight
                  style={{
                    backgroundColor: '#FFDDBA',
                    borderRadius: '10px',
                    padding: '5px',
                    cursor: 'pointer', // Add cursor pointer for better UX
                  }}
                />
              </div>
              <LuPencilLine
                color="#015CCA"
                size="40px"
                fontWeight="bold" // Make sure to use a valid value for fontWeight
                style={{
                  backgroundColor: '#69AFFD',
                  borderRadius: '10px',
                  padding: '5px',
                  cursor: 'pointer', // Add cursor pointer for better UX
                }}
              />
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>ณรงค์ชัย ชอบอาษา</td>
            <td>บมจ. ลลิล พร็อพเตอร์ตี้</td>
            <td>-</td>
            <td>HomeLoan Management System</td>
            <td>
              <div className="icon-container">
                <LuTrash2
                  color="#FF8000"
                  size="40px"
                  fontWeight="bold" // Make sure to use a valid value for fontWeight
                  style={{
                    backgroundColor: '#FFDDBA',
                    borderRadius: '10px',
                    padding: '5px',
                    cursor: 'pointer', // Add cursor pointer for better UX
                  }}
                />
              </div>
              <LuPencilLine
                color="#015CCA"
                size="40px"
                fontWeight="bold" // Make sure to use a valid value for fontWeight
                style={{
                  backgroundColor: '#69AFFD',
                  borderRadius: '10px',
                  padding: '5px',
                  cursor: 'pointer', // Add cursor pointer for better UX
                }}
              />
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>ธนภูมิ ยาปนะโกศล</td>
            <td>บมจ. แลนด์แอนด์เฮาส์</td>
            <td>บจ. แอล เอช เมืองใหม่</td>
            <td>HomeLoan Management System</td>
            <td>
              <div className="icon-container">
                <LuTrash2
                  color="#FF8000"
                  size="40px"
                  fontWeight="bold" // Make sure to use a valid value for fontWeight
                  style={{
                    backgroundColor: '#FFDDBA',
                    borderRadius: '10px',
                    padding: '5px',
                    cursor: 'pointer', // Add cursor pointer for better UX
                  }}
                />
              </div>
              <LuPencilLine
                color="#015CCA"
                size="40px"
                fontWeight="bold" // Make sure to use a valid value for fontWeight
                style={{
                  backgroundColor: '#69AFFD',
                  borderRadius: '10px',
                  padding: '5px',
                  cursor: 'pointer', // Add cursor pointer for better UX
                }}
              />
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>วรภพ ศรีแจ่ม</td>
            <td>บมจ. แสนสิริ</td>
            <td>บจ. แสนสิริแลนด์</td>
            <td>HomeLoan Management System</td>
          <td>
              <div className="icon-container">
                <LuTrash2
                  color="#FF8000"
                  size="40px"
                  fontWeight="bold" // Make sure to use a valid value for fontWeight
                  style={{
                    backgroundColor: '#FFDDBA',
                    borderRadius: '10px',
                    padding: '5px',
                    cursor: 'pointer', // Add cursor pointer for better UX
                  }}
                />
              </div>
              <LuPencilLine
                color="#015CCA"
                size="40px"
                fontWeight="bold" // Make sure to use a valid value for fontWeight
                style={{
                  backgroundColor: '#69AFFD',
                  borderRadius: '10px',
                  padding: '5px',
                  cursor: 'pointer', // Add cursor pointer for better UX
                }}
              />
            </td>
          </tr>
          <tr>
            <td>6</td>
            <td>ปิยธิดา มุจรินทร์</td>
            <td>บมจ. เอ็ม บี เค</td>
            <td>บจ. แปลน เอสเตท</td>
            <td>HomeLoan Management System</td>
            <td>
              <div className="icon-container">
                <LuTrash2
                  color="#FF8000"
                  size="40px"
                  fontWeight="bold" // Make sure to use a valid value for fontWeight
                  style={{
                    backgroundColor: '#FFDDBA',
                    borderRadius: '10px',
                    padding: '5px',
                    cursor: 'pointer', // Add cursor pointer for better UX
                  }}
                />
              </div>
              <LuPencilLine
                color="#015CCA"
                size="40px"
                fontWeight="bold" // Make sure to use a valid value for fontWeight
                style={{
                  backgroundColor: '#69AFFD',
                  borderRadius: '10px',
                  padding: '5px',
                  cursor: 'pointer', // Add cursor pointer for better UX
                }}
              />
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default Project;