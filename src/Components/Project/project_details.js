import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../Sidebar-nav/Navbar";
import "../../css/Project.css/project_details.css";

const ProjectDetails = ({ projectId }) => {
  const [project, setProject] = useState(null); // State เก็บข้อมูลโครงการ
  const [loading, setLoading] = useState(true); // State สำหรับแสดงโหลดดิ้ง
  const [error, setError] = useState(null); // State เก็บข้อความแสดงข้อผิดพลาด

  useEffect(() => {
    // ฟังก์ชันดึงข้อมูลโครงการจาก API
    const fetchProject = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Project/projects/1');
        setProject(response.data); // เก็บข้อมูลโครงการใน state
        setLoading(false);
      } catch (err) {
        setError('ไม่สามารถดึงข้อมูลโครงการได้');
        setLoading(false);
      }
    };

    fetchProject(); // เรียกใช้ฟังก์ชันดึงข้อมูล
  }, [projectId]); // Re-fetch เมื่อ projectId เปลี่ยนแปลง

  if (loading) return <div>กำลังโหลดข้อมูล...</div>;
  if (error) return <div>{error}</div>;
  if (!project) return <div>ไม่พบข้อมูลโครงการ</div>;

  return (
    <div className="container">
      <Navbar />
      <div className="header">ข้อมูลโครงการ</div>
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
          <p><span>เขต:</span> {project.area}</p>
          <p><span>จังหวัด:</span> {project.areas?.province}</p>
          <p><span>ภูมิภาค:</span> {project.region}</p>
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