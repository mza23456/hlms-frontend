import React, { useContext } from 'react'
import { Button} from '@mui/material'
import { multiStepContex } from '../../stepContex'
import AnimatedNumber from './input-type/AnimaetionNumber';
import SaveAltIcon from '@mui/icons-material/SaveAlt';


function ThirdStep() {
    const { setStep, formData, setFormData } = useContext(multiStepContex);
    const formatCurrency = (amount) => {
        return amount.toLocaleString();
    };
    return (
        
        <div className='containner'>
            
            <h3>ผลการวิเคราะห์</h3>
            <div className='-borrower-box'>
                <div className='summary'>
                    <section className='left-content'>
                        <div className='borrowers-container'>
                            <div className='main-borrower-box '>
                                <h4>ผู้กู้หลัก</h4>
                                <p>{formData.mainName}</p>
                            </div>
                            <div className='borrower-box'>
                                <h4>ผู้กู้ร่วมคนที่ 1</h4>
                                <p>{formData.secondName || "ไม่มี"}</p>
                            </div>
                            <div className='borrower-box'>
                                <h4>ผู้กู้ร่วมคนที่ 2</h4>
                                <p>{formData.thirdName || "ไม่มี"}</p>
                            </div>
                        </div>
                        <div className='project-container'>
                            <div className='project-info'>
                                <p className='cl-main'>โครงการ(ชื่อบริษัท): </p>
                                <p className='cl-second'>{formData.projectName}</p>
                            </div>
                            <div className='project-detail'>
                                <div className='project-info'>
                                    <p className='cl-main'>ผลิตภัณฑ์เสริม: </p>
                                    <p className='cl-second'>{formData.service}</p>
                                </div>
                                <div className='project-info'>
                                    <p className='cl-main'>ประกันชีวิตคุ้มครองสินเชื่อ: </p>
                                    <p className='cl-second'>{formData.insure || "ไม่มี"}</p>
                                </div>
                            </div>
                            <div className='project-info'>
                                <p className='cl-main'>ราคาซื้อขาย:</p>
                                <p className='cl-second'>{formatCurrency(Number(formData.projectPrice))} บาท</p>
                            </div>
                            <div className='project-info'>
                                <p className='cl-main'>รายรับรวม: </p>
                                <p className='cl-second'>{formatCurrency(formData.totalIncome)} บาท</p>
                            </div>
                            <div className='project-info'>
                                <p className='cl-main'>รายจ่ายรวม: </p>
                                <p className='cl-second'>{formatCurrency(formData.totalExpenses)} บาท</p>
                            </div>
                            <div className='project-info'>
                                <p className='cl-main'>กู้ได้สูงสุด: </p>
                                <p className='cl-second'>{formData.maxLoanTerm} ปี</p>
                            </div>
                        </div>
                    </section>
                    <section className='right-content'>
                        <div className='summary-container'>
                            <div className='homeloan-info'>
                                <p>วงเงินคาดว่าอนุมัติ: </p>
                                <p>3,500,000.00 บาท</p>
                            </div>
                            <div className='homeloan-info'>
                                <p>จำนวนที่ยื่นกู้:  </p>
                                <p>3,000,000.00 บาท</p>
                            </div>
                            <div className='homeloan-info'>
                                <p>ระยะเวลากู้: </p>
                                <p>{formData.maxLoanTerm} ปี</p>
                            </div>
                            <div className='homeloan-info'>
                                <p>อัตราหนี้สินต่อรายได้(DTI): </p>
                                <p>{formData.dti} %</p>
                            </div>
                            <div className='homeloan-info'>
                                <p>เปอร์เซ็นต์อนุมัติ: </p>
                                <p>{formData.ltv} %</p>
                            </div>
                            <div className='underline'></div>
                            <div className='homeloan-info'>
                                <p>ผ่อนชำระต่อเดือน: </p>
                                <p>25,268.19 บาท</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div className='btn-css'>
                <Button variant='outlined' onClick={() => setStep(1)}>แก้ไข</Button>
                <Button variant='contained' endIcon={<SaveAltIcon />}>บันทึกข้อมูล</Button>
            </div>
        </div>
    )
}

export default ThirdStep