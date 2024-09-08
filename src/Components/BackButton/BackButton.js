import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLeft } from 'react-icons/ai'; // ใช้ไอคอนลูกศรจาก react-icons
import "../../css/BackButton.css/backbutton.css";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // พาผู้ใช้กลับไปยังหน้าที่พวกเขาเข้าชมก่อนหน้า
  };

  return (
    <div onClick={handleBack} className="back-button">
      <AiOutlineLeft className="icon" />
      <span>ย้อนกลับ</span>
    </div>
  );
};

export default BackButton;