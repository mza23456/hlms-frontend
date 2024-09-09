import React, { useState, useEffect } from 'react';
import Navbar from '../Sidebar-nav/Navbar';
import "../../css/Dashbord.css/dashboard.css";
import HomeIcon from "../../img/house (1).png"
import person from "../../img/person-solid.svg"
import document from "../../img/paste-regular.svg"
import commission from "../../img/paste-regular2.svg"
import { useNavigate } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { dataset } from './testData';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ListAltIcon from '@mui/icons-material/ListAlt';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';

const valueFormatter = (value) => `${value}mm`;

const chartSetting = {
  yAxis: [
    {
      label: 'ปริมาณ',
    },
  ],
  series: [{ dataKey: 'seoul', label: 'คอมมิสชั่น',color: 'rgb(187,0,242)', valueFormatter }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

const Dashboard = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [commissionCount, setCommissionCount] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [tickPlacement, setTickPlacement] = React.useState('middle');
  const [tickLabelPlacement, setTickLabelPlacement] = React.useState('middle');


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
        const projectResponse = await fetch('http://localhost:5000/Project', {
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
        <h4 className='head-dashboards'>Dashboard</h4>
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
                <div className='top-card'>

                  <div className='card-info'>
                    <h2 style={{color: 'rgb(255, 145, 0)'}}>{projectCount}</h2>
                    <p>โครงการ</p>
                  </div>
                  <div className='img-bg'>
                    <img src={HomeIcon} style={{color: 'rgb(255, 145, 0)'}}></img>
                  </div>
                </div>
                <div className='card-link' style={{backgroundColor: 'rgb(255, 145, 0)'}}>
                  <p>จัดการข้อมูล</p>
                  <ManageSearchIcon sx={{ color: 'white' }}/>
                </div>
              </div>
              <div className='card-item'
                onClick={handleCardClick}
                style={{ cursor: 'pointer' }} // เพิ่ม pointer เพื่อแสดงว่าทั้ง div สามารถคลิกได้
              >
                <div className='top-card'>

                  <div className='card-info'>
                    <h2 style={{color: '#007bff'}}>{projectCount}</h2>
                    <p>ลูกค้าที่สมัคร</p>
                  </div>
                  <div className='img-bg'>
                    <PeopleAltIcon sx={{ fontSize: 70 ,color: '#007bff'}} />
                  </div>
                </div>
                <div className='card-link' style={{backgroundColor: '#007bff'}}>
                  <p>จัดการข้อมูล</p>
                  <ManageSearchIcon sx={{ color: 'white' }}/>
                </div>
              </div>
              <div className='card-item'
                onClick={handleCardClick}
                style={{ cursor: 'pointer' }} // เพิ่ม pointer เพื่อแสดงว่าทั้ง div สามารถคลิกได้
              >
                <div className='top-card'>

                  <div className='card-info'>
                    <h2 style={{color: 'rgb(0,163,16)'}}>{projectCount}</h2>
                    <p>ใบสั่งงาน</p>
                  </div>
                  <div className='img-bg'>
                    <FileCopyOutlinedIcon sx={{ fontSize: 65 ,color: 'rgb(0,163,16)'}} />
                  </div>
                </div>
                <div className='card-link' style={{backgroundColor: 'rgb(0,163,16)'}}>
                  <p>จัดการข้อมูล</p>
                  <ManageSearchIcon sx={{ color: 'white' }}/>
                </div>
              </div>
              <div className='card-item'
                onClick={handleCardClick}
                style={{ cursor: 'pointer' }} // เพิ่ม pointer เพื่อแสดงว่าทั้ง div สามารถคลิกได้
              >
                <div className='top-card'>

                  <div className='card-info'>
                    <h2 style={{color: 'rgb(187,0,242)'}}>{projectCount}</h2>
                    <p>คอมมิชชัน</p>
                  </div>
                  <div className='img-bg'>
                    <RequestQuoteOutlinedIcon sx={{ fontSize: 70, color: 'rgb(187,0,242)'}} />
                  </div>
                </div>
                <div className='card-link' style={{backgroundColor: 'rgb(187,0,242)'}}>
                  <p>จัดการข้อมูล</p>
                  <ManageSearchIcon sx={{ color: 'white' }}/>
                </div>
              </div>
              {/* <div className='card-item'
                style={{ cursor: 'pointer' }} // เพิ่ม pointer เพื่อแสดงว่าทั้ง div สามารถคลิกได้
              >
                <div className='img-customer-bg'>
                  <img src={person}></img>
                </div>
                <div>
                  <h2>{projectCount}</h2>
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
                  <h2>{projectCount}</h2>
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
                  <h2>{projectCount}</h2>
                  <p>คอมมิชชัน</p>
                </div>
              </div> */}

            </div>
            <div className='graph-con'>
              <div style={{ width: '100%' }}>
                <BarChart
                  dataset={dataset}
                  xAxis={[
                    { scaleType: 'band', dataKey: 'month', tickPlacement: 'middle', tickLabelPlacement: 'middle' },
                  ]}
                  {...chartSetting}
                />
              </div>
            </div>
            <div className='pie-con'>
          <span style={{fontSize: '20px'}}>สถานะใบสั่งงาน</span>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: 'กำลังส่ง' ,color: '#787878'},
                  { id: 1, value: 15, label: 'เสร็จสิ้น' ,color: 'rgb(0,163,16)'},
                ],
              },
            ]}
            width={400}
            height={250}
          />
        </div>
        <div className='time-con'>d</div>
          </div>

        )}
        
      </div>


    </div>
  );
};

export default Dashboard;
