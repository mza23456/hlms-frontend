import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../Sidebar-nav/Navbar";
import "../../css/Project.css/project_details.css";
import BackButton from '../BackButton/BackButton';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const ProjectDetails = () => {
  const { id } = useParams(); // Get id from URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Project/projects/${id}`);
        setProject(response.data);
        setLoading(false);
      } catch (err) {
        setError('ไม่สามารถดึงข้อมูลโปรเจคได้');
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]); // Updated dependency

  if (loading) return <div className="loader">กำลังโหลดข้อมูล...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!project) return <div>ไม่พบข้อมูลโครงการ</div>;

  return (
    <div className='Body'>
      <Navbar />
      <div className='pd-containner'>
        <div className='head-title' style={{ width: '66rem' }}>
          <h4>รายระเอียดโครงการ</h4>
          <BackButton />
        </div>
        <div className='inner-content'>
          <div className='Body-detail'>
            <div className='pd-info'>
              <h5>ชื่อโครงการ</h5>
              <hr />
              <div className='pd-top'>
                <div className='pd-row'>
                  <h5>ชื่อบริษัท:</h5>
                  <p>{project.owner}</p>
                </div>
                <div className='pd-row'>
                  <h5>ชื่อบริษัทย่อย:</h5>
                  <p>{project.name}</p>
                </div>
              </div>
            </div>

            <div className='pd-info'>
              <h5>รายระเอียด</h5>
              <hr />
              <div className='pd-top'>
                <div className='pd-row'>
                  <h5>ประเภทโครงการ:</h5>
                  <p>{project.type}</p>
                </div>
                <div className='pd-row'>
                  <h5>ช่วงราคา(บาท):</h5>
                  <p>{project.minPrice}-{project.maxPrice}</p>
                </div>
                <div className='pd-row'>
                  <h5>จำนวน(ยูนิต):</h5>
                  <p>{project.amount}</p>
                </div>
                <div className='pd-row'>
                  <h5>ขายแล้ว(ยูนิต):</h5>
                  <p>{project.deal}</p>
                </div>
                <div className='pd-row'>
                  <h5>ความคืบหน้า:</h5>
                  <p>{project.progress}</p>
                </div>
              </div>
            </div>

            <div className='pd-info'>
              <h5>การติดต่อ</h5>
              <hr />
              <div className='pd-top'>
                <div className='pd-row'>
                  <h5>ชื่อพนักงานขาย:</h5>
                  <p>{project.saleName}</p>
                </div>
                <div className='pd-row'>
                  <h5>เบอร์มือถือ:</h5>
                  <p>{project.phone}</p>
                </div>
                <div className='pd-row'>
                  <h5>เขต:</h5>
                  <p>{project.area?.area}</p>
                </div>
                <div className='pd-row'>
                  <h5>จังหวัด:</h5>
                  <p>{project.area?.province}</p>
                </div>
                <div className='pd-row'>
                  <h5>ภูมิภาค:</h5>
                  <p>{project.area?.region}</p>
                </div>
              </div>
            </div>

            <div className='footer-detail'>
              <div className='right-pd'>
                <h5>ดูแลโดย</h5>
                <hr />
                <div className='pd-top'>
                  <div className='pd-row'>
                    <h5>ชื่อ:</h5>
                    <p>{project.officer?.firstName} {project.officer?.lastName}</p>
                  </div>
                  <div className='pd-row'>
                    <h5>ตำแหน่ง:</h5>
                    <p>{project.officer?.access?.access_name}</p>
                  </div>
                </div>
              </div>
              <div className='right-pd'>
                <h5>สร้างโดย</h5>
                <hr />
                <div className='pd-top'>
                  <div className='pd-row'>
                    <h5>ชื่อ:</h5>
                    <p>วรภพ ศรีแจ่ม</p>
                  </div>
                  <div className='pd-row'>
                    <h5>ตำแหน่ง:</h5>
                    <p>แอดมิน</p>
                  </div>
                  <div className='pd-row'>
                    <h5>วันที่:</h5>
                    <p>11/09/2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
