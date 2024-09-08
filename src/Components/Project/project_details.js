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
    <div className="container">
      <Navbar />
      <div className='d-flex justify-content-between'>
        <div className="header">รายละเอียดโครงการ</div>
      <BackButton/>
      </div>
      {/* <div className="header">รายละเอียดโครงการ</div> */}
      <div className="info-box">
        <div>
          <h3>ชื่อโครงการ</h3>
          <p><span>ชื่อบริษัท:</span> {project.owner}</p>
          <p><span>ชื่อบริษัทย่อย:</span> {project.name}</p>
        </div>
        <div className="detail">
          <h3>รายละเอียด</h3>
          <p><span>ประเภทโครงการ:</span> {project.type}</p>
          <p><span>ช่วงราคา (บาท):</span> {project.minPrice}-{project.maxPrice}</p>
          <p><span>จำนวน (ยูนิต):</span> {project.amount}</p>
          <p><span>สถานะเปิดขาย (ยูนิต):</span> {project.deal}</p>
          <p><span>ความคืบหน้า:</span> {project.progress}%</p>
        </div>
      </div>
      <div className="info-box">
        <div>
          <h3>การติดต่อ</h3>
          <p><span>ชื่อพนักงานขาย:</span> {project.saleName}</p>
          <p><span>เบอร์มือถือ:</span> {project.phone}</p>
          <p><span>เขต:</span> {project.area?.area}</p>
          <p><span>จังหวัด:</span> {project.area?.province}</p>
          <p><span>ภูมิภาค:</span> {project.area?.region}</p>
        </div>
        <div>
          <h3>ดูแลโดย</h3>
          <p><span>ชื่อ:</span> {project.consultantName}</p>
          <p><span>ตำแหน่ง:</span> {project.consultantPosition}</p>
        </div>
      </div>
      <div className="info-box">
        <div>
          <h3>สร้างโดย</h3>
          <p><span>ชื่อ:</span> {project.creatorName}</p>
          <p><span>ตำแหน่ง:</span> {project.creatorPosition}</p>
          <p><span>วันที่:</span> {new Date(project.createdAt).toLocaleString()}</p>
        </div>
      </div>
      <button className="save-btn">บันทึกข้อมูล</button>
    </div>
  );
};

export default ProjectDetails;