import { createRoot } from 'react-dom/client'
import App from './components/App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Professor from './components/Professor.jsx';
import Student from './components/Student.jsx';
import ActivityStudentPage from './components/ActivityStudentPage.jsx';
import ActivityAnalytics from './components/ActivityDisplayers/ActivityAnalytics.jsx';
import theme from "./assets/theme";
import { ThemeProvider } from '@mui/material';


createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<Student />} />
        <Route path="/professor" element={<Professor />} />
        <Route path="/activity/:id" element={<ActivityStudentPage />} />
        <Route path="/analytics/:activityId" element={<ActivityAnalytics />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
)
