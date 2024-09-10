import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../Sidebar-nav/Navbar";
import "../../css/Project.css/project_details.css";
import BackButton from '../BackButton/BackButton';


const ProjectDetails = ({ projectId }) => {
  const { id } = useParams(); // ดึงพารามิเตอร์ id จาก URL
  const [project, setProject] = useState(null); // State เก็บข้อมูลโครงการ
  const [loading, setLoading] = useState(true); // State สำหรับแสดงโหลดดิ้ง
  const [error, setError] = useState(null); // State เก็บข้อความแสดงข้อผิดพลาด

  useEffect(() => {
    // ฟังก์ชันดึงข้อมูลโปรเจคจาก API
    const fetchProject = async () => {
      try {
        // ใช้ projectId ในการสร้าง URL
        const response = await axios.get(`http://localhost:5000/Project/projects/${id}`);
        setProject(response.data); // เก็บข้อมูลโปรเจคใน state
        setLoading(false);
      } catch (err) {
        setError('ไม่สามารถดึงข้อมูลโปรเจคได้');
        setLoading(false);
      }
    };

    // ตรวจสอบว่า projectId มีค่าอยู่หรือไม่
    if (id) {
      fetchProject(); // เรียกใช้ฟังก์ชันดึงข้อมูล
    }
  }, [projectId]); // Re-fetch เมื่อ projectId เปลี่ยนแปลง

  if (loading) return <div>กำลังโหลดข้อมูล...</div>;
  if (error) return <div>{error}</div>;
  if (!project) return <div>ไม่พบข้อมูลโครงการ</div>;

  return (
    <div className="project-detail-container">
      <Navbar />
      <div className='header-div'>
        <div className="header">รายละเอียดโครงการ</div>
        <BackButton/>
      </div>
      <div className="project-section">
        <h3>ชื่อโครงการ</h3>
        <div className="project-info">
          <div>ชื่อบริษัท: {project.owner}</div>
          <div>ชื่อบริษัทย่อย: {project.name}</div>
        </div>
      </div>
      {/* <div className='info-box'>
        <h3 className='section-title'>ชื่อโครงการ</h3>
        <div className='project-details'>
          <div className="project-column">
            <div className="detail-title">ชื่อบริษัท:</div>
            <div className="detail-content">{project.owner}</div>
          </div>
          <div className="project-column">
            <div className="detail-title">ชื่อบริษัทย่อย:</div>
            <div className="detail-content">{project.name}</div>
          </div>
        </div>
      </div>

      <div className='info-box'>
        <h3 className='section-title'>การติดต่อ</h3>
        <div className="contact-details">
          <p><span>ชื่อพนักงานขาย:</span> {project.saleName}</p>
          <p><span>เบอร์มือถือ:</span> {project.phone}</p>
          <p><span>เขต:</span> {project.area?.area || '-'}</p>
          <p><span>จังหวัด:</span> {project.area?.province || '-'}</p>
          <p><span>ภูมิภาค:</span> {project.area?.region || '-'}</p>
        </div>
      </div>

      <div className='info-box'>
        <h3 className='section-title'>รายละเอียด</h3>
        <p><span>ประเภทโครงการ:</span> {project.type}</p>
        <p><span>ช่วงราคา (บาท):</span> {project.minPrice}-{project.maxPrice}</p>
        <p><span>จำนวน (ยูนิต):</span> {project.amount}</p>
        <p><span>สถานะเปิดขาย (ยูนิต):</span> {project.deal}</p>
        <p><span>ความคืบหน้า:</span> {project.progress}%</p>
      </div>

      <div className='info-box'>
        <h3 className='section-title'>ดูแลโดย</h3>
        <p><span>ชื่อ:</span> {project.consultantName}</p>
        <p><span>ตำแหน่ง:</span> {project.consultantPosition}</p>
      </div>

      <div className='info-box'>
        <h3 className='section-title'>สร้างโดย</h3>
        <p><span>ชื่อ:</span> {project.creatorName}</p>
        <p><span>ตำแหน่ง:</span> {project.creatorPosition}</p>
        <p><span>วันที่:</span> {new Date(project.createdAt).toLocaleString()}</p>
      </div>

      <button className="save-btn">บันทึกข้อมูล</button>  */}
    </div>
  );
};

export default ProjectDetails;