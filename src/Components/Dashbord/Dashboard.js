import React, { useState, useEffect } from 'react';
import Navbar from '../Sidebar-nav/Navbar copy';
import "../../css/Dashbord.css/dashboard.css";
import HomeIcon from "../../img/house (1).png"

const Dashboard = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [commissionCount, setCommissionCount] = useState(0);
  const [error, setError] = useState('');

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
                <div className='card-item'>
                  <div className='img-bg'>
                    <img src={HomeIcon}></img>
                  </div>
                  <div>
                    <h2>{projectCount}</h2>
                    <p>โครงการ</p>
                  </div>
                </div>
                <div className='card-item'>
                  <div className='img-bg'>
                    <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGQ9Ik0gMjQgMi45OTgwNDY5IEMgMjMuMDQyMTYyIDIuOTk4MDQ2OSAyMi4wODQzNDkgMy4zMzA5MTcxIDIxLjMxNjQwNiAzLjk5NDE0MDYgTCAzLjc4NzEwOTQgMTkuMTMyODEyIEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAzLjc4MzIwMzEgMTkuMTM0NzY2IEMgMy4wNTIwODQ2IDE5Ljc3MDEgMi44Njg5MjExIDIwLjc4MTI2MiAzLjE2MjEwOTQgMjEuNTY4MzU5IEMgMy40NTUyOTc3IDIyLjM1NTQ1NyA0LjI1OTc1NDQgMjMgNS4yMzA0Njg4IDIzIEwgOCAyMyBMIDM2IDIzIEEgMS4wMDAxIDEuMDAwMSAwIDEgMCAzNiAyMSBMIDggMjEgTCA1LjIzMDQ2ODggMjEgQyA1LjA4MTE4MjkgMjEgNS4wNjg5MjExIDIwLjk1NDU0IDUuMDM3MTA5NCAyMC44NjkxNDEgQyA1LjAwNTI5NzQgMjAuNzgzNzQxIDQuOTg2ODI1MSAyMC43MzkxNTEgNS4wOTU3MDMxIDIwLjY0NDUzMSBMIDIyLjYyMzA0NyA1LjUwNTg1OTQgQyAyMy40MTkxNjEgNC44MTgzMDYzIDI0LjU4MDgzOSA0LjgxODMwNjMgMjUuMzc2OTUzIDUuNTA1ODU5NCBMIDMyLjM0NTcwMyAxMS41MjczNDQgQSAxLjAwMDEgMS4wMDAxIDAgMCAwIDM0IDEwLjc2OTUzMSBMIDM0IDYgTCAzNyA2IEwgMzcgMTUuMDg5ODQ0IEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAzNy4zNDU3MDMgMTUuODQ3NjU2IEwgNDIuOTA0Mjk3IDIwLjY0NDUzMSBDIDQzLjAxMzE3NSAyMC43MzkxNTEgNDIuOTk0NzAxIDIwLjc4MzczOCA0Mi45NjI4OTEgMjAuODY5MTQxIEMgNDIuOTMxMDgzIDIwLjk1NDU0MyA0Mi45MTg4MTcgMjEgNDIuNzY5NTMxIDIxIEwgNDAgMjEgQSAxLjAwMDEgMS4wMDAxIDAgMCAwIDM5IDIyIEwgMzkgNDIgQyAzOSA0Mi41NjUwMyAzOC41NjUwMyA0MyAzOCA0MyBMIDMxIDQzIEMgMzAuNDM0OTcgNDMgMzAgNDIuNTY1MDMgMzAgNDIgTCAzMCAzMiBDIDMwIDMwLjM1NDU0NSAyOC42NDU0NTUgMjkgMjcgMjkgTCAyMSAyOSBDIDE5LjM1NDU0NSAyOSAxOCAzMC4zNTQ1NDUgMTggMzIgTCAxOCA0MiBDIDE4IDQyLjU2NTAzIDE3LjU2NTAzIDQzIDE3IDQzIEwgMTAgNDMgQyA5LjQzNDk2OTggNDMgOSA0Mi41NjUwMyA5IDQyIEwgOSAyNiBBIDEuMDAwMSAxLjAwMDEgMCAxIDAgNyAyNiBMIDcgNDIgQyA3IDQzLjY0NDk3IDguMzU1MDMwMiA0NSAxMCA0NSBMIDE3IDQ1IEMgMTguNjQ0OTcgNDUgMjAgNDMuNjQ0OTcgMjAgNDIgTCAyMCAzMiBDIDIwIDMxLjQ0NTQ1NSAyMC40NDU0NTUgMzEgMjEgMzEgTCAyNyAzMSBDIDI3LjU1NDU0NSAzMSAyOCAzMS40NDU0NTUgMjggMzIgTCAyOCA0MiBDIDI4IDQzLjY0NDk3IDI5LjM1NTAzIDQ1IDMxIDQ1IEwgMzggNDUgQyAzOS42NDQ5NyA0NSA0MSA0My42NDQ5NyA0MSA0MiBMIDQxIDIzIEwgNDIuNzY5NTMxIDIzIEMgNDMuNzQwMjQ2IDIzIDQ0LjU0NDcwMiAyMi4zNTU0NTcgNDQuODM3ODkxIDIxLjU2ODM1OSBDIDQ1LjEzMTA3OSAyMC43ODEyNjIgNDQuOTQ3OTE5IDE5Ljc3MDE0NiA0NC4yMTY3OTcgMTkuMTM0NzY2IEEgMS4wMDAxIDEuMDAwMSAwIDAgMCA0NC4yMTI4OTEgMTkuMTMyODEyIEwgMzkgMTQuNjMyODEyIEwgMzkgNiBDIDM5IDQuOTA0NTQ1NSAzOC4wOTU0NTUgNCAzNyA0IEwgMzQgNCBDIDMyLjkwNDU0NSA0IDMyIDQuOTA0NTQ1NSAzMiA2IEwgMzIgOC41ODU5Mzc1IEwgMjYuNjgzNTk0IDMuOTk0MTQwNiBDIDI1LjkxNTY1MSAzLjMzMDkxNzEgMjQuOTU3ODM4IDIuOTk4MDQ2OSAyNCAyLjk5ODA0NjkgeiI+PC9wYXRoPgo8L3N2Zz4="/>
                  </div>
                  <div>
                    <h1>{projectCount}</h1>
                    <p>โครงการ</p>
                  </div>
                </div>
                <div className='card-item'>
                  <div className='img-bg'>
                    <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGQ9Ik0gMjQgMi45OTgwNDY5IEMgMjMuMDQyMTYyIDIuOTk4MDQ2OSAyMi4wODQzNDkgMy4zMzA5MTcxIDIxLjMxNjQwNiAzLjk5NDE0MDYgTCAzLjc4NzEwOTQgMTkuMTMyODEyIEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAzLjc4MzIwMzEgMTkuMTM0NzY2IEMgMy4wNTIwODQ2IDE5Ljc3MDEgMi44Njg5MjExIDIwLjc4MTI2MiAzLjE2MjEwOTQgMjEuNTY4MzU5IEMgMy40NTUyOTc3IDIyLjM1NTQ1NyA0LjI1OTc1NDQgMjMgNS4yMzA0Njg4IDIzIEwgOCAyMyBMIDM2IDIzIEEgMS4wMDAxIDEuMDAwMSAwIDEgMCAzNiAyMSBMIDggMjEgTCA1LjIzMDQ2ODggMjEgQyA1LjA4MTE4MjkgMjEgNS4wNjg5MjExIDIwLjk1NDU0IDUuMDM3MTA5NCAyMC44NjkxNDEgQyA1LjAwNTI5NzQgMjAuNzgzNzQxIDQuOTg2ODI1MSAyMC43MzkxNTEgNS4wOTU3MDMxIDIwLjY0NDUzMSBMIDIyLjYyMzA0NyA1LjUwNTg1OTQgQyAyMy40MTkxNjEgNC44MTgzMDYzIDI0LjU4MDgzOSA0LjgxODMwNjMgMjUuMzc2OTUzIDUuNTA1ODU5NCBMIDMyLjM0NTcwMyAxMS41MjczNDQgQSAxLjAwMDEgMS4wMDAxIDAgMCAwIDM0IDEwLjc2OTUzMSBMIDM0IDYgTCAzNyA2IEwgMzcgMTUuMDg5ODQ0IEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAzNy4zNDU3MDMgMTUuODQ3NjU2IEwgNDIuOTA0Mjk3IDIwLjY0NDUzMSBDIDQzLjAxMzE3NSAyMC43MzkxNTEgNDIuOTk0NzAxIDIwLjc4MzczOCA0Mi45NjI4OTEgMjAuODY5MTQxIEMgNDIuOTMxMDgzIDIwLjk1NDU0MyA0Mi45MTg4MTcgMjEgNDIuNzY5NTMxIDIxIEwgNDAgMjEgQSAxLjAwMDEgMS4wMDAxIDAgMCAwIDM5IDIyIEwgMzkgNDIgQyAzOSA0Mi41NjUwMyAzOC41NjUwMyA0MyAzOCA0MyBMIDMxIDQzIEMgMzAuNDM0OTcgNDMgMzAgNDIuNTY1MDMgMzAgNDIgTCAzMCAzMiBDIDMwIDMwLjM1NDU0NSAyOC42NDU0NTUgMjkgMjcgMjkgTCAyMSAyOSBDIDE5LjM1NDU0NSAyOSAxOCAzMC4zNTQ1NDUgMTggMzIgTCAxOCA0MiBDIDE4IDQyLjU2NTAzIDE3LjU2NTAzIDQzIDE3IDQzIEwgMTAgNDMgQyA5LjQzNDk2OTggNDMgOSA0Mi41NjUwMyA5IDQyIEwgOSAyNiBBIDEuMDAwMSAxLjAwMDEgMCAxIDAgNyAyNiBMIDcgNDIgQyA3IDQzLjY0NDk3IDguMzU1MDMwMiA0NSAxMCA0NSBMIDE3IDQ1IEMgMTguNjQ0OTcgNDUgMjAgNDMuNjQ0OTcgMjAgNDIgTCAyMCAzMiBDIDIwIDMxLjQ0NTQ1NSAyMC40NDU0NTUgMzEgMjEgMzEgTCAyNyAzMSBDIDI3LjU1NDU0NSAzMSAyOCAzMS40NDU0NTUgMjggMzIgTCAyOCA0MiBDIDI4IDQzLjY0NDk3IDI5LjM1NTAzIDQ1IDMxIDQ1IEwgMzggNDUgQyAzOS42NDQ5NyA0NSA0MSA0My42NDQ5NyA0MSA0MiBMIDQxIDIzIEwgNDIuNzY5NTMxIDIzIEMgNDMuNzQwMjQ2IDIzIDQ0LjU0NDcwMiAyMi4zNTU0NTcgNDQuODM3ODkxIDIxLjU2ODM1OSBDIDQ1LjEzMTA3OSAyMC43ODEyNjIgNDQuOTQ3OTE5IDE5Ljc3MDE0NiA0NC4yMTY3OTcgMTkuMTM0NzY2IEEgMS4wMDAxIDEuMDAwMSAwIDAgMCA0NC4yMTI4OTEgMTkuMTMyODEyIEwgMzkgMTQuNjMyODEyIEwgMzkgNiBDIDM5IDQuOTA0NTQ1NSAzOC4wOTU0NTUgNCAzNyA0IEwgMzQgNCBDIDMyLjkwNDU0NSA0IDMyIDQuOTA0NTQ1NSAzMiA2IEwgMzIgOC41ODU5Mzc1IEwgMjYuNjgzNTk0IDMuOTk0MTQwNiBDIDI1LjkxNTY1MSAzLjMzMDkxNzEgMjQuOTU3ODM4IDIuOTk4MDQ2OSAyNCAyLjk5ODA0NjkgeiI+PC9wYXRoPgo8L3N2Zz4="/>
                  </div>
                  <div>
                    <h1>{projectCount}</h1>
                    <p>โครงการ</p>
                  </div>
                </div>
                <div className='card-item'>
                  <div className='img-bg'>
                    <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGQ9Ik0gMjQgMi45OTgwNDY5IEMgMjMuMDQyMTYyIDIuOTk4MDQ2OSAyMi4wODQzNDkgMy4zMzA5MTcxIDIxLjMxNjQwNiAzLjk5NDE0MDYgTCAzLjc4NzEwOTQgMTkuMTMyODEyIEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAzLjc4MzIwMzEgMTkuMTM0NzY2IEMgMy4wNTIwODQ2IDE5Ljc3MDEgMi44Njg5MjExIDIwLjc4MTI2MiAzLjE2MjEwOTQgMjEuNTY4MzU5IEMgMy40NTUyOTc3IDIyLjM1NTQ1NyA0LjI1OTc1NDQgMjMgNS4yMzA0Njg4IDIzIEwgOCAyMyBMIDM2IDIzIEEgMS4wMDAxIDEuMDAwMSAwIDEgMCAzNiAyMSBMIDggMjEgTCA1LjIzMDQ2ODggMjEgQyA1LjA4MTE4MjkgMjEgNS4wNjg5MjExIDIwLjk1NDU0IDUuMDM3MTA5NCAyMC44NjkxNDEgQyA1LjAwNTI5NzQgMjAuNzgzNzQxIDQuOTg2ODI1MSAyMC43MzkxNTEgNS4wOTU3MDMxIDIwLjY0NDUzMSBMIDIyLjYyMzA0NyA1LjUwNTg1OTQgQyAyMy40MTkxNjEgNC44MTgzMDYzIDI0LjU4MDgzOSA0LjgxODMwNjMgMjUuMzc2OTUzIDUuNTA1ODU5NCBMIDMyLjM0NTcwMyAxMS41MjczNDQgQSAxLjAwMDEgMS4wMDAxIDAgMCAwIDM0IDEwLjc2OTUzMSBMIDM0IDYgTCAzNyA2IEwgMzcgMTUuMDg5ODQ0IEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAzNy4zNDU3MDMgMTUuODQ3NjU2IEwgNDIuOTA0Mjk3IDIwLjY0NDUzMSBDIDQzLjAxMzE3NSAyMC43MzkxNTEgNDIuOTk0NzAxIDIwLjc4MzczOCA0Mi45NjI4OTEgMjAuODY5MTQxIEMgNDIuOTMxMDgzIDIwLjk1NDU0MyA0Mi45MTg4MTcgMjEgNDIuNzY5NTMxIDIxIEwgNDAgMjEgQSAxLjAwMDEgMS4wMDAxIDAgMCAwIDM5IDIyIEwgMzkgNDIgQyAzOSA0Mi41NjUwMyAzOC41NjUwMyA0MyAzOCA0MyBMIDMxIDQzIEMgMzAuNDM0OTcgNDMgMzAgNDIuNTY1MDMgMzAgNDIgTCAzMCAzMiBDIDMwIDMwLjM1NDU0NSAyOC42NDU0NTUgMjkgMjcgMjkgTCAyMSAyOSBDIDE5LjM1NDU0NSAyOSAxOCAzMC4zNTQ1NDUgMTggMzIgTCAxOCA0MiBDIDE4IDQyLjU2NTAzIDE3LjU2NTAzIDQzIDE3IDQzIEwgMTAgNDMgQyA5LjQzNDk2OTggNDMgOSA0Mi41NjUwMyA5IDQyIEwgOSAyNiBBIDEuMDAwMSAxLjAwMDEgMCAxIDAgNyAyNiBMIDcgNDIgQyA3IDQzLjY0NDk3IDguMzU1MDMwMiA0NSAxMCA0NSBMIDE3IDQ1IEMgMTguNjQ0OTcgNDUgMjAgNDMuNjQ0OTcgMjAgNDIgTCAyMCAzMiBDIDIwIDMxLjQ0NTQ1NSAyMC40NDU0NTUgMzEgMjEgMzEgTCAyNyAzMSBDIDI3LjU1NDU0NSAzMSAyOCAzMS40NDU0NTUgMjggMzIgTCAyOCA0MiBDIDI4IDQzLjY0NDk3IDI5LjM1NTAzIDQ1IDMxIDQ1IEwgMzggNDUgQyAzOS42NDQ5NyA0NSA0MSA0My42NDQ5NyA0MSA0MiBMIDQxIDIzIEwgNDIuNzY5NTMxIDIzIEMgNDMuNzQwMjQ2IDIzIDQ0LjU0NDcwMiAyMi4zNTU0NTcgNDQuODM3ODkxIDIxLjU2ODM1OSBDIDQ1LjEzMTA3OSAyMC43ODEyNjIgNDQuOTQ3OTE5IDE5Ljc3MDE0NiA0NC4yMTY3OTcgMTkuMTM0NzY2IEEgMS4wMDAxIDEuMDAwMSAwIDAgMCA0NC4yMTI4OTEgMTkuMTMyODEyIEwgMzkgMTQuNjMyODEyIEwgMzkgNiBDIDM5IDQuOTA0NTQ1NSAzOC4wOTU0NTUgNCAzNyA0IEwgMzQgNCBDIDMyLjkwNDU0NSA0IDMyIDQuOTA0NTQ1NSAzMiA2IEwgMzIgOC41ODU5Mzc1IEwgMjYuNjgzNTk0IDMuOTk0MTQwNiBDIDI1LjkxNTY1MSAzLjMzMDkxNzEgMjQuOTU3ODM4IDIuOTk4MDQ2OSAyNCAyLjk5ODA0NjkgeiI+PC9wYXRoPgo8L3N2Zz4="/>
                  </div>
                  <div>
                    <h1>{projectCount}</h1>
                    <p>โครงการ</p>
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
