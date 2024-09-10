import React, { useState, useEffect } from "react";
import Navbar from "../Sidebar-nav/Navbar";
import HomeIcon from "../../img/house (1).png";
import "../../css/Project.css/project_lists.css";
import { IoTrashBin } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { Button, TextField, Select, InputLabel, MenuItem, FormControl, Collapse } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import BackButton from '../BackButton/BackButton';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const Project = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState(''); // State for project type selection
  const MySwal = withReactContent(Swal);


  useEffect(() => {
    
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
    MySwal.fire({
      title: 'คุณแน่ใจว่าต้องการลบโครงการนี้หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/Project/projects/${projectId}`);
          setProjects(projects.filter((project) => project.projectId !== projectId));

          await MySwal.fire({
            title: 'ลบสำเร็จ!',
            html: 'โครงการได้ถูกลบแล้ว',
            icon: 'success',
            timer: 1500,
            timerProgressBar: true,
          });
        } catch (error) {
          console.error('Error deleting project:', error);
          await MySwal.fire({
            title: 'เกิดข้อผิดพลาด!',
            html: 'ไม่สามารถลบโครงการได้',
            icon: 'error',
            timer: 1500,
            timerProgressBar: true,
          });
        }
      }
    });
  };

  const filteredProjects = projects.filter(project =>
    project.owner.includes(searchTerm) &&
    (selectedType === '' || project.type === selectedType) // Filter by project type
  );

  const handleEditClick = (projectId) => {
    navigate(`/project-details/${projectId}`);
  };

  return (
    <div className="project-Body">
      <Navbar />
      <div className="project-container">
        <div className="project-list-header">
          <h3>ตรวจสอบโครงการ</h3>
          <BackButton />
        </div>
        <div className="inner-Project">
          <div className="search-section">
            <h5>ระบบค้นหาแบบรวมเงื่อนไข</h5>
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
            <div className="input-project">
              <TextField
                label="ค้นหา"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ width: "100%" }}
              />

            </div>
            <button className="reset-button" onClick={() => { setSearchTerm(''); setSelectedType(''); }}>ล้างข้อมูล</button>
          </div>
          <table className="project-table ">
            <thead >
              <tr >
                <th>ลำดับ</th>
                <th>พนักงานผู้รับผิดชอบ</th>
                <th>ชื่อบริษัท</th>
                <th>ชื่อบริษัทย่อย</th>
                <th>ประเภทโครงการ</th>
                <th>การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project, index) => (
                <tr key={project.projectId}>
                  <td>{index + 1}</td>
                  <td>{project.officer?.firstName} {project.officer?.lastName}</td>
                  <td>{project.owner}</td>
                  <td>{project.name}</td>
                  <td>{project.type}</td>
                  <td>
                    <div className="icon-container">
                      <LuPencilLine
                        color="#015CCA"
                        size="25px"
                        style={{
                          backgroundColor: '#69AFFD',
                          borderRadius: '10px',
                          padding: '5px',
                          cursor: 'pointer',
                          marginRight: '5px', // Add margin to the right
                        }}
                        onClick={() => handleEditClick(project.projectId)}
                      />
                      <IoTrashBin
                        color="#FF1919"
                        size="25px"
                        style={{
                          backgroundColor: '#FFA6A6',
                          borderRadius: '10px',
                          padding: '5px',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleDelete(project.projectId)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};

export default Project;