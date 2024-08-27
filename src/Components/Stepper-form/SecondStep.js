import React, { useContext,useState } from 'react'
import { Button, TextField, Select, InputLabel, MenuItem } from '@mui/material'
import FormControl from '@mui/material/FormControl';
import { multiStepContex } from '../../stepContex'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Collapse from "@mui/material/Collapse";

function SecondStep() {
    const { setStep, formData, setFormData } = useContext(multiStepContex);
    const [showInsure, setShowInsure] = useState(formData['insure'] === 'yes');

    const handleRadioChange = (event) => {
        const value = event.target.value;
        setFormData({ ...formData, 'insure': value });
        setShowInsure(value === 'yes');
        console.log("Insurance option selected:", value);
        if (value === 'yes') {
            updateInsuranceValues();
        }
    };
    
    const getInterestRates = (projectType, hasFullProducts) => {
        const rates = {
            'Top Selective': hasFullProducts
                ? { firstYearRate: 3.50, fourthYearRate: 5.00, EIR: 4.50 }
                : { firstYearRate: 3.99, fourthYearRate: 5.25, EIR: 4.84 },
            'Non Selective': hasFullProducts
                ? { firstYearRate: 4.75, fourthYearRate: 5.00, EIR: 4.92 }
                : { firstYearRate: 5.25, fourthYearRate: 5.25, EIR: 5.25 }
        };
        return rates[projectType] || { firstYearRate: 0, fourthYearRate: 0, EIR: 0 };
    };

    const updateInsuranceValues = () => {
        // Example values, replace with actual calculation logic
        const insuranceAmount = (formData['projectPrice'] * 0.80) || 0;
        const premium = (insuranceAmount * 0.05) || 0; // Assume a rate of 5% for example
        const totalInsuranceCost = insuranceAmount + premium;

        setFormData(prevFormData => ({
            ...prevFormData,
            insuranceAmount: insuranceAmount,
            premium: premium,
            totalInsuranceCost: totalInsuranceCost,
        }));
        console.log("Updated Insurance Values:", {
            insuranceAmount,
            premium,
            totalInsuranceCost
        });
    }
    // ฟังก์ชันสำหรับคำนวณทุนประกัน
    const calculateInsuranceAmount = (contractPrice) => {
        return 0.8 * contractPrice;
    };

    // ฟังก์ชันสำหรับคำนวณเบี้ยประกัน
    const calculatePremium = (insuranceAmount, insuranceInterestRate) => {
        return (insuranceAmount * insuranceInterestRate) / 1000;
    };

    // ฟังก์ชันคำนวณสำหรับประกัน
    const calculateInsurance = () => {
        const contractPrice = parseFloat(formData['projectPrice']) || 0;
        const age = parseInt(formData['mainAge']) || 0;
        const gender = formData['mainGender'] || 'male';
        const duration = parseInt(formData['insureDuration']) || 10;
        const insuranceRates = {
            male: { // เพศชาย
                10: { // ระยะเวลา 10 ปี
                    20: 21.47, 21: 21.85, 22: 22.10, 23: 22.26, 24: 22.39, 25: 22.51, 26: 22.68, 27: 22.92, 28: 23.24, 29: 23.68,
                    30: 24.25, 31: 24.96, 32: 25.81, 33: 26.82, 34: 27.98, 35: 29.32, 36: 30.83, 37: 32.49, 38: 34.28, 39: 36.22,
                    40: 38.32, 41: 40.59, 42: 43.10, 43: 45.83, 44: 48.80, 45: 52.06, 46: 55.65, 47: 59.99, 48: 64.80, 49: 70.16,
                    50: 76.13, 51: 82.79, 52: 90.21, 53: 98.50, 54: 107.73, 55: 117.99
                },
                15: { // ระยะเวลา 15 ปี
                    20: 33.34, 21: 33.85, 22: 34.26, 23: 34.63, 24: 35.01, 25: 35.46, 26: 36.03, 27: 36.73, 28: 37.61, 29: 38.68,
                    30: 39.96, 31: 41.47, 32: 43.19, 33: 45.14, 34: 47.32, 35: 49.75, 36: 52.43, 37: 55.38, 38: 58.63, 39: 62.18,
                    40: 66.08, 41: 70.36, 42: 75.12, 43: 80.34, 44: 86.10, 45: 92.47, 46: 99.51, 47: 107.67, 48: 116.73, 49: 126.77,
                    50: 137.91
                }
            },
            female: { // เพศหญิง
                10: {
                    20: 7.20, 21: 7.34, 22: 7.49, 23: 7.64, 24: 7.81, 25: 8.00, 26: 8.23, 27: 8.50, 28: 8.82, 29: 9.18,
                    30: 9.59, 31: 10.05, 32: 10.53, 33: 11.04, 34: 11.57, 35: 12.12, 36: 12.70, 37: 13.31, 38: 13.98, 39: 14.71,
                    40: 15.54, 41: 16.49, 42: 17.68, 43: 19.06, 44: 20.67, 45: 22.56, 46: 24.79, 47: 27.40, 48: 30.45, 49: 34.01,
                    50: 38.12, 51: 42.83, 52: 48.17, 53: 54.19, 54: 60.92, 55: 68.41
                },
                15: {
                    20: 11.50, 21: 11.78, 22: 12.08, 23: 12.41, 24: 12.78, 25: 13.19, 26: 13.66, 27: 14.18, 28: 14.76, 29: 15.40,
                    30: 16.10, 31: 16.85, 32: 17.67, 33: 18.56, 34: 19.51, 35: 20.54, 36: 21.68, 37: 22.95, 38: 24.38, 39: 26.02,
                    40: 27.92, 41: 30.12, 42: 32.77, 43: 35.85, 44: 39.43, 45: 43.57, 46: 48.34, 47: 53.81, 48: 60.07, 49: 67.17,
                    50: 75.20
                }
            }
        };
        const rate = insuranceRates[gender][duration]?.[age] || 0;
        const insuranceAmount = 0.8 * contractPrice;
        const premium = (insuranceAmount * rate) / 1000;
        const totalInsuranceCost = insuranceAmount + premium;

        setFormData({
        ...formData,
        insuranceAmount: insuranceAmount.toFixed(2),
        premium: premium.toFixed(2),
        totalInsuranceCost: totalInsuranceCost.toFixed(2)
    });

        console.log("Updated Insurance Values:", {
            insuranceAmount,
            premium,
            totalInsuranceCost
        });
    };

    const { projectType, service } = formData;
    const hasFullProducts = service === 'ครบ';
    const interestRates = getInterestRates(projectType, hasFullProducts);
    return (

        <div className='containner'>
            <h3>ข้อมูลโครงการ</h3>
            <div className='-project-box'>
                <div className='project-form'>
                    <div className='project-name'>
                        <TextField label="ชื่อโครงการ (ชื่อบริษัท)" style={{ width: "100%" }} value={formData['projectName']} onChange={(e) => setFormData({...formData, "projectName" : e.target.value})}/>
                    </div>
                    <div className='company-name'>
                        <TextField label="ชื่อบริษัทย่อย" style={{ width: "100%" }} value={formData['companyName']} onChange={(e) => setFormData({...formData, "companyName" : e.target.value})}/>
                    </div>
                    <div className='project-type'>
                        <FormControl style={{ width: "100%" }}>
                            <InputLabel id="demo-simple-select-label">ประเภทโครงการ</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="ประเภทโครงการ"
                                style={{ width: "100%" }}
                                value={formData['projectType']} onChange={(e) => setFormData({...formData, "projectType" : e.target.value})}

                            >
                                <MenuItem value={"Top Selective"}>Top Selective</MenuItem>
                                <MenuItem value={"Non Selective"}>Non Selective</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='products'>
                        <FormControl style={{ width: "100%" }}>

                            <InputLabel id="demo-simple-select-label">ผลิตภัณฑ์เสริม</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="ผลิตภัณฑ์เสริม"
                                style={{ width: "100%" }}
                                value={formData['service']} onChange={(e) => setFormData({...formData, "service" : e.target.value})}


                            >
                                <MenuItem value={"ครบ"}>ครบ</MenuItem>
                                <MenuItem value={"ไม่ครบ"}>ไม่ครบ</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='price'>
                        <TextField label="ราคาขายตามสัญญา" style={{ width: "100%" }} value={formData['projectPrice']} onChange={(e) => setFormData({...formData, "projectPrice" : e.target.value})}/>
                    </div>

                    <div className='show-interest-info'>
                        <h5>อัตราดอกเบี้ย</h5>
                        <div className='box'>
                        <div className='interest'>
            <TextField label="ปีที่ 1-3" style={{ width: "100%" }} value={`${interestRates.firstYearRate}%`} readOnly />
        </div>
        <div className='interest'>
            <TextField label="ปีที่ 4 เป็นต้นไป" style={{ width: "100%" }} value={`${interestRates.fourthYearRate}%`} readOnly />
        </div>
        <div className='interest'>
            <TextField label="(EIR)" style={{ width: "100%" }} value={`${interestRates.EIR}%`} readOnly />
        </div>
                        </div>
                    </div>
                    <div className='insure'>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">ประกันชีวิตคุ้มครองสินเชื่อ</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={formData['insure']}
                                onChange={handleRadioChange}
                            >
                                <FormControlLabel value="yes" control={<Radio />} label="มี" />
                                <FormControlLabel value="no" control={<Radio />} label="ไม่มี" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <Collapse in={showInsure}>
                <div className='show-insure-info'>
                    <h5>ประกันชีวิตคุ้มครองสินเชื่อ</h5>
                    <div className='insure-form'>
                        <div className='insure-duartion'>
                            <FormControl style={{ width: "100%" }}>
                                <InputLabel id="demo-simple-select-label">ระยะเวลาเอาประกัน</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="ระยะเวลาเอาประกัน"
                                    style={{ width: "100%" }}
                                    value={formData['insureDuration']} onChange={(e) => setFormData({...formData, "insureDuration" : e.target.value})}
                                    
                                >
                                    <MenuItem value={"10"}>10 ปี</MenuItem>
                                    <MenuItem value={"15"}>15 ปี</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className='insure-cost'>
                                <TextField label="ทุนประกัน" style={{ width: '100%' }} value={formData['insuranceAmount'] || ''} readOnly />
                            </div>
                            <div className='insure-interest'>
                                <TextField label="เบี้ยประกัน" style={{ width: '100%' }} value={formData['premium'] || ''} readOnly />
                            </div>
                            <div className='insure-total'>
                                <TextField label="ราคาซื้อขายเบี้ยประกัน" style={{ width: '100%' }} value={formData['totalInsuranceCost'] || ''} readOnly />
                            </div>
                    </div>
                </div>
                </Collapse>
            </div>
            <div className='btn-css'>
                <Button variant='contained' onClick={() => setStep(1)}>ย้อนกลับ</Button>
                <Button variant='contained' onClick={() => setStep(3)}>วิเคราะห์ผล</Button>
            </div>
        </div>
    )
}

export default SecondStep