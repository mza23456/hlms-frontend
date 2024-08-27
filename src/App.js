import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';import "bootstrap/dist/css/bootstrap.min.css";

// import component section
import StepperControl from './Components/Stepper-form/StepperControl';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashbord/Dashboard';
import Project from './Components/Project/project_lists';
import ProjectDetails from './Components/Project/project_details';
const theme = createTheme({
    typography: {
        fontFamily: [
            'IBM Plex Sans Thai',
            'sans-serif',
        ].join(','),
    },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/homeloancal" element={<StepperControl />} />
          <Route path="project-detail" element={<Project />} />
          <Route path="project-details/:id" element={<ProjectDetails />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
