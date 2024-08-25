import React, { useContext, useEffect, useState } from "react";
import { Button, TextField, Select, InputLabel, MenuItem, FormControl, Collapse } from "@mui/material";
import { multiStepContex } from "../../stepContex";
import { NumericFormat } from 'react-number-format';
import CommonlyUsedComponents from "./input-type/date";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// calculate function
const calculateAge = (birthDate) => {
    if (!birthDate) return '';
    const birthYear = new Date(birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
};

// setFormatNumber function
const NumericFormatCustom = React.forwardRef(
    function NumericFormatCustom(props, ref) {
        const { onChange, ...other } = props;

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }}
                thousandSeparator
                valueIsNumericString
                suffix=" บาท"
            />
        );
    },
);

function FirstStep() {
    // step control
    const { setStep, formData, setFormData } = useContext(multiStepContex);

    // form control
    const [showSecondBorrower, setShowSecondBorrower] = useState(false);
    const [showThirdBorrower, setShowThirdBorrower] = useState(false);
    const [showThirdBorrowerForm, setShowThirdBorrowerForm] = useState(false);

    const [secondBorrowerIcon, setSecondBorrowerIcon] = useState(false);
    const [thirdBorrowerIcon, setThirdBorrowerIcon] = useState(false);

    // Error state
    const [errors, setErrors] = useState({});

    const toggleSecondBorrower = () => {
        setShowSecondBorrower(!showSecondBorrower);
        setSecondBorrowerIcon(!secondBorrowerIcon);
    };

    const toggleThirdBorrower = () => {
        setShowThirdBorrower(!showThirdBorrower);
    };

    const toggleThirdBorrowerForm = () => {
        setShowThirdBorrowerForm(!showThirdBorrowerForm);
        setThirdBorrowerIcon(!thirdBorrowerIcon);
    };

    const handleForm = (toggleFunction, setAddedState, addedState) => {
        toggleFunction();
        setAddedState(!addedState);
    };

    // innerfunction
    const mainBirth = formData['mainBirth']; // แยกตัวแปรออกมา

    useEffect(() => {
        if (mainBirth) {
            setFormData({...formData, "mainAge": calculateAge(mainBirth)});
        }
    }, [mainBirth, setFormData, formData]);

    // Validation function
    const validate = () => {
        let tempErrors = {};
        tempErrors.mainName = formData.mainName ? "" : "กรุณากรอกชื่อ-นามสกุล";
        tempErrors.mainGender = formData.mainGender ? "" : "กรุณาเลือกเพศ";
        tempErrors.mainBirth = formData.mainBirth ? "" : "กรุณากรอกปีเกิด";
        tempErrors.mainCareer = formData.mainCareer ? "" : "กรุณาเลือกอาชีพ";
        tempErrors.mainIncome = formData.mainIncome ? "" : "กรุณากรอกรายรับรวม";
        tempErrors.mainExpenses = formData.mainExpenses ? "" : "กรุณากรอกรายจ่ายรวม";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    // Clear error when input changes
    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        setErrors({ ...errors, [field]: "" });
    };

    // Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setStep(2);
        } else {
            console.log('Form is invalid. Not submitting.');
        }
    };

    return (
        <div className="containner">
            <h3>ข้อมูลลูกค้า</h3>
            <div className="mainBorrower-box">
                <p className="borrowerSection">ผู้กู้หลัก</p>
                <div className="mainBorrower-form">
                    <div className="name">
                        <TextField
                            label="ชื่อ-นามสกุล"
                            style={{ width: "100%" }}
                            value={formData['mainName']}
                            onChange={(e) => handleInputChange("mainName", e.target.value)}
                            error={!!errors.mainName}
                            helperText={errors.mainName}
                        />
                    </div>
                    <div className="gender">
                        <FormControl style={{ width: "100%" }} error={!!errors.mainGender}>
                            <InputLabel id="demo-simple-select-label">เพศ</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="เพศ"
                                style={{ width: "100%" }}
                                value={formData['mainGender']}
                                onChange={(e) => handleInputChange("mainGender", e.target.value)}
                            >
                                <MenuItem value={"ชาย"}>ชาย</MenuItem>
                                <MenuItem value={"หญิง"}>หญิง</MenuItem>
                            </Select>
                            {errors.mainGender && <p style={{ color: 'red' }}>{errors.mainGender}</p>}
                        </FormControl>
                    </div>
                    <div className="date">
                        <CommonlyUsedComponents
                            style={{ width: "100%" }}
                            value={formData['mainBirth']}
                            onChange={(date) => handleInputChange("mainBirth", date)}
                            error={!!errors.mainBirth}
                        />
                        {errors.mainBirth && <p style={{ color: 'red' }}>{errors.mainBirth}</p>}
                    </div>
                    <div className="age">
                        <TextField label="อายุ(ปี)" style={{ width: "100%" }} value={formData['mainAge']} readOnly />
                    </div>
                    <div className="loan-max">
                        <TextField label="กู้ได้สูงสุด(ปี)" />
                    </div>
                    <div className="career">
                        <FormControl style={{ width: "100%" }} error={!!errors.mainCareer}>
                            <InputLabel id="demo-simple-select-label2">อาชีพ</InputLabel>
                            <Select
                                labelId="demo-simple-select-label2"
                                id="career-select"
                                style={{ width: "100%" }}
                                label="อาชีพ"
                                value={formData['mainCareer']}
                                onChange={(e) => handleInputChange("mainCareer", e.target.value)}
                            >
                                <MenuItem value={"ชาย"}>ชาย</MenuItem>
                                <MenuItem value={"หญิง"}>หญิง</MenuItem>
                            </Select>
                            {errors.mainCareer && <p style={{ color: 'red' }}>{errors.mainCareer}</p>}
                        </FormControl>
                    </div>
                    <div className="income">
                        <TextField
                            label="รายรับรวม"
                            style={{ width: "100%" }}
                            value={formData['mainIncome']}
                            onChange={(e) => handleInputChange("mainIncome", e.target.value)}
                            InputProps={{
                                inputComponent: NumericFormatCustom,
                            }}
                            error={!!errors.mainIncome}
                            helperText={errors.mainIncome}
                        />
                    </div>
                    <div className="expenses">
                        <TextField
                            label="รายจ่ายรวม"
                            style={{ width: "100%" }}
                            value={formData['mainExpenses']}
                            onChange={(e) => handleInputChange("mainExpenses", e.target.value)}
                            InputProps={{
                                inputComponent: NumericFormatCustom,
                            }}
                            error={!!errors.mainExpenses}
                            helperText={errors.mainExpenses}
                        />
                    </div>
                </div>
            </div>
            <div className="moreBorrower">
                <div className="secondBorrower-box">
                    <div className="secondBorrower-head">
                        <p className="borrowerSection">ผู้กู้ร่วมคนที่ 1</p>
                        <div className="secondBorrower-option">
                            {secondBorrowerIcon ? (
                                <RemoveIcon
                                    className="delete"
                                    onClick={() =>
                                        handleForm(toggleSecondBorrower, toggleThirdBorrower)
                                    }
                                />
                            ) : (
                                <AddIcon
                                    className="add"
                                    onClick={() =>
                                        handleForm(toggleSecondBorrower, toggleThirdBorrower)
                                    }
                                />
                            )}
                        </div>
                    </div>
                    <Collapse in={showSecondBorrower}>
                        <div className="secondBorrower-form">
                            <div className="name">
                                <TextField label="ชื่อ-นามสกุล" style={{ width: "100%" }} value={formData['secondName']} onChange={(e) => handleInputChange("secondName", e.target.value)} />
                            </div>
                            <div className="gender">
                                <FormControl style={{ width: "100%" }}>
                                    <InputLabel id="demo-simple-select-label">เพศ</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="เพศ"
                                        style={{ width: "100%" }}
                                        value={formData['secondGender']}
                                        onChange={(e) => handleInputChange("secondGender", e.target.value)}
                                    >
                                        <MenuItem value={"ชาย"}>ชาย</MenuItem>
                                        <MenuItem value={"หญิง"}>หญิง</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="date">
                                <CommonlyUsedComponents value={formData['secondBirth']} onChange={(date) => handleInputChange("secondBirth", date)} />
                            </div>
                            <div className="age">
                                <TextField label="อายุ(ปี)" style={{ width: "100%" }} />
                            </div>
                            <div className="loan-max">
                                <TextField label="กู้ได้สูงสุด(ปี)" />
                            </div>
                            <div className="career">
                                <FormControl style={{ width: "100%" }}>
                                    <InputLabel id="demo-simple-select-label2">อาชีพ</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label2"
                                        id="career-select"
                                        style={{ width: "100%" }}
                                        label="อาชีพ"
                                        value={formData['secondCareer']} onChange={(e) => handleInputChange("secondCareer", e.target.value)}

                                    >
                                        <MenuItem value={"ชาย"}>ชาย</MenuItem>
                                        <MenuItem value={"gay"}>gay</MenuItem>
                                        <MenuItem value={"หญิง"}>หญิง</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="income">
                                <TextField label="รายรับรวม" value={formData['secondIncome']} onChange={(e) => handleInputChange("secondIncome", e.target.value)} style={{ width: "100%" }}
                                    InputProps={{
                                        inputComponent: NumericFormatCustom,
                                    }}
                                />
                            </div>
                            <div className="expenses">
                                <TextField label="รายจ่ายรวม" style={{ width: "100%" }} value={formData['secondExpenses']} onChange={(e) => handleInputChange("secondExpenses", e.target.value)}
                                    InputProps={{
                                        inputComponent: NumericFormatCustom,
                                    }} />
                            </div>
                        </div>
                    </Collapse>
                </div>
                <Collapse in={showThirdBorrower}>
                    <div className="thirdBorrower-box">
                        <div className="thirdBorrower-head">
                            <p className="borrowerSection">ผู้กู้ร่วมคนที่ 2</p>
                            <div className="thirdBorrower-option">
                                {thirdBorrowerIcon ? (
                                    <RemoveIcon
                                        className="delete"
                                        onClick={toggleThirdBorrowerForm}
                                    />
                                ) : (
                                    <AddIcon className="add" onClick={toggleThirdBorrowerForm} />
                                )}
                            </div>
                        </div>
                        <Collapse in={showThirdBorrowerForm}>
                            <div className="thirdBorrower-form">
                                <div className="name">
                                    <TextField label="ชื่อ-นามสกุล" style={{ width: "100%" }} value={formData['thirdName']} onChange={(e) => handleInputChange("thirdName", e.target.value)} />
                                </div>
                                <div className="gender">
                                    <FormControl style={{ width: "100%" }}>
                                        <InputLabel id="demo-simple-select-label">เพศ</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="เพศ"
                                            style={{ width: "100%" }}
                                            value={formData['thirdGender']}
                                            onChange={(e) => handleInputChange("thirdGender", e.target.value)}
                                        >
                                            <MenuItem value={"ชาย"}>ชาย</MenuItem>
                                            <MenuItem value={"หญิง"}>หญิง</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="date">
                                    <CommonlyUsedComponents value={formData['thirdBirth']} onChange={(date) => handleInputChange("thirdBirth", date)} />
                                </div>
                                <div className="age">
                                    <TextField label="อายุ(ปี)" style={{ width: "100%" }} />
                                </div>
                                <div className="loan-max">
                                    <TextField label="กู้ได้สูงสุด(ปี)" />
                                </div>
                                <div className="career">
                                    <FormControl style={{ width: "100%" }}>
                                        <InputLabel id="demo-simple-select-label2">อาชีพ</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label2"
                                            id="career-select"
                                            style={{ width: "100%" }}
                                            label="อาชีพ"
                                            value={formData['thirdCareer']} onChange={(e) => handleInputChange("thirdCareer", e.target.value)}
                                        >
                                            <MenuItem value={"ชาย"}>ชาย</MenuItem>
                                            <MenuItem value={"gay"}>gay</MenuItem>
                                            <MenuItem value={"หญิง"}>หญิง</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="income">
                                    <TextField label="รายรับรวม" style={{ width: "100%" }} value={formData['thirdIncome']} onChange={(e) => handleInputChange("thirdIncome", e.target.value)}
                                        InputProps={{
                                            inputComponent: NumericFormatCustom,
                                        }}
                                    />
                                </div>
                                <div className="expenses">
                                    <TextField label="รายจ่ายรวม" style={{ width: "100%" }} value={formData['thirdExpenses']} onChange={(e) => handleInputChange("thirdExpenses", e.target.value)}
                                        InputProps={{
                                            inputComponent: NumericFormatCustom,
                                        }}
                                    />
                                </div>
                            </div>
                        </Collapse>
                    </div>
                </Collapse>
            </div>

            {/* button section */}
            <div className="btn-css">
                <Button variant="contained" onClick={handleSubmit}>
                    ถัดไป
                </Button>
            </div>
        </div>
    );
}

export default FirstStep;
