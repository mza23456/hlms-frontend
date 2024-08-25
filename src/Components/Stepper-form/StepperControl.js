import React,{useContext} from 'react';

import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { Stepper , StepLabel, Step} from '@mui/material'

import Navbar from '../Sidebar-nav/Navbar';
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'
import { multiStepContex } from '../../stepContex'
import '../../css/form.css/stepper.css'
import '../../css/form.css/borrower.css'
import '../../css/form.css/project.css'
import '../../css/form.css/summary.css'

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
            'linear-gradient(90deg, rgba(13,59,156,1) 0%, rgba(46,145,214,1) 100%, rgba(0,255,239,1) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
            'linear-gradient(90deg, rgba(13,59,156,1) 0%, rgba(46,145,214,1) 100%, rgba(0,255,239,1) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
        'linear-gradient(90deg, rgba(13,59,156,1) 0%, rgba(46,145,214,1) 100%, rgba(0,255,239,1) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
        'linear-gradient(90deg, rgba(13,59,156,1) 0%, rgba(46,145,214,1) 100%, rgba(0,255,239,1) 100%)',
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <AssignmentIndIcon />,
        2: <AddBusinessIcon />,
        3: <VideoLabelIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}



const steps = ['ข้อมูลลูกค้า', 'ข้อมูลโครงการ', 'ผลการวิเคราะห์'];

export default function StepperControl() {
    const {currentStep,finalData} = useContext(multiStepContex)

    function showStep(step) { 
        switch(step) {
            case 1 :
                return <FirstStep />
            case 2: 
                return <SecondStep /> 
            case 3:
                return <ThirdStep />
        }
    }

    return (
        <Stack sx={{ width: '100%' }}  className='form-stepper'>
        <Navbar />
        <Stepper alternativeLabel activeStep={currentStep - 1} connector={<ColorlibConnector />}>
            {steps.map((label) => (
            <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
            ))}
        </Stepper>
        { showStep(currentStep)}
        </Stack>
    );
}
