import React, { useState, useEffect } from 'react';
import Navbar from '../Sidebar-nav/Navbar';
import "../../css/Dashbord.css/dashboard.css";
import HomeIcon from "../../img/house (1).png"
import person from "../../img/person-solid.svg"
import document from "../../img/paste-regular.svg"
import commission from "../../img/paste-regular2.svg"
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [commissionCount, setCommissionCount] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/project-detail');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customer data and count
        // const customerResponse = await fetch('http://localhost:5000/api/customers');
        // if (!customerResponse.ok) throw new Error('Failed to fetch customer data');
        // const customers = await customerResponse.json();
        // setCustomerCount(customers.length); // Assuming `customers` is an array

        // Fetch project data and count
        const projectResponse = await fetch('http://localhost:5000/Project' ,{
          method: 'GET'
        });
        if (!projectResponse.ok) throw new Error('Failed to fetch project data');
        const projects = await projectResponse.json();
        setProjectCount(projects.length); // Assuming `projects` is an array

        // Fetch order data and count
        // const orderResponse = await fetch('http://localhost:5000/api/orders');
        // if (!orderResponse.ok) throw new Error('Failed to fetch order data');
        // const orders = await orderResponse.json();
        // setOrderCount(orders.length); // Assuming `orders` is an array

        // // Fetch commission data and count
        // const commissionResponse = await fetch('http://localhost:5000/api/commissions');
        // if (!commissionResponse.ok) throw new Error('Failed to fetch commission data');
        // const commissions = await commissionResponse.json();
        // setCommissionCount(commissions.length); // Assuming `commissions` is an array
        
      } catch (error) {
        setError('เกิดข้อผิดพลาดในการดึงข้อมูล');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="d-flex" id='dashboard-con'>
          <hr style={{ color: '#F48C25', margin: '0', borderTopWidth: '3px' }} />
          {error ? (
            <div className="text-center mt-5">
              <p className="text-danger">{error}</p>
            </div>
          ) : (
            <div className='card-floor'>
              <div className='card-con'>
                <div className='card-item'                 
                onClick={handleCardClick}
                style={{ cursor: 'pointer' }} // เพิ่ม pointer เพื่อแสดงว่าทั้ง div สามารถคลิกได้
                >
                  <div className='img-bg'>
                    <img src={HomeIcon}></img>
                  </div>
                  <div>
                    <h2>{projectCount}</h2>
                    <p>โครงการ</p>
                  </div>
                </div>
                <div className='card-item'
                style={{ cursor: 'pointer' }} // เพิ่ม pointer เพื่อแสดงว่าทั้ง div สามารถคลิกได้
                >
                  <div className='img-customer-bg'>
                    <img src={person}></img>
                  </div>
                  <div>
                    <h2>9</h2>
                    <p>ลูกค้าที่สมัคร</p>
                  </div>
                </div>
                <div className='card-item'
                style={{ cursor: 'pointer' }} // เพิ่ม pointer เพื่อแสดงว่าทั้ง div สามารถคลิกได้
                >
                  <div className='img-document-bg'>
                    <img src={document}></img>
                  </div>
                  <div>
                    <h2>3</h2>
                    <p>ใบสั่งงาน</p>
                  </div>
                </div>
                <div className='card-item'
                style={{ cursor: 'pointer' }} // เพิ่ม pointer เพื่อแสดงว่าทั้ง div สามารถคลิกได้
                >
                  <div className='img-commission-bg'>
                    <img src={commission}></img>
                  </div>
                  <div>
                    <h2>15</h2>
                    <p>คอมมิชชัน</p>
                  </div>
                </div>

              </div>
            </div>
            )}
      </div>
    </div>
  );
};

export default Dashboard;
