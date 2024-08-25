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
    // stepper control
    const { setStep, formData, setFormData } = useContext(multiStepContex)

    // selection input control
    // insure form control
    const [showInsure, setShowInsure] = useState(formData['insure'] === 'yes');
    const handleRadioChange = (event) => {
        const value = event.target.value;
        setFormData({ ...formData, "insure": value });
        setShowInsure(value === 'yes');
    };
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
                                <TextField label="ปีที่ 1-3" style={{ width: "100%" }} />
                            </div>
                            <div className='interest'>
                                <TextField label="ปีที่ 4 เป็นต้นไป" style={{ width: "100%" }} />
                            </div>
                            <div className='interest'>
                                <TextField label="(EIR)" style={{ width: "100%" }} />
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
                            <TextField label="ทุนประกัน" style={{ width: "100%" }} value={formData['insureCost']} onChange={(e) => setFormData({...formData, "insureCost" : e.target.value})}/>
                        </div>
                        <div className='insure-interest'>
                            <TextField label="เบี้ยประกัน" style={{ width: "100%" }} />
                        </div>
                        <div className='insure-total'>
                            <TextField label="ราคาซื้อขายเบี้ยประกัน" style={{ width: "100%" }} value={formData['insureTotal']} onChange={(e) => setFormData({...formData, "insureTotal" : e.target.value})}/>
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