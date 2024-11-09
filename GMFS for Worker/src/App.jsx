import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/SideBar'; 
import WorkerHomePage from './Pages/WorkerHomePage';  
import TaskList from './Components/TaskList';  
import ShiftSchedule from './Components/ShiftSchedule';  
import Messages from './Components/Messages';  
import PerformanceMetrics from './Components/PerformanceMetrics';  
import PaymentHistory from './Components/PaymentHistory';  
import Notifications from './Components/Notifications';  
import DashBoard from './Navbar/DashBoard';
import Help from './Navbar/Help';
import Profile from './Navbar/Profile';
import Login from './Login/WorkerLogin'; 
import Logout from './Navbar/Logout';

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLoginSuccess = () => {
//     setIsAuthenticated(true); // Set authentication state to true on successful login
//   };

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check localStorage for authentication state on initial load
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Store authentication status in localStorage
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Remove authentication status from localStorage
  };



  return (
    <Router>
      <div style={{ display: 'flex' }}>
      {isAuthenticated && <Sidebar onLogout={handleLogout} />} {/* Render Sidebar only if authenticated */}
        <div style={{ marginLeft: isAuthenticated ? '250px' : '0',marginTop:'-3px', padding: '20px', width: '100%' }}>
          <Routes>
            <Route path="/" element={isAuthenticated ? <WorkerHomePage /> : <Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/workerlogin" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/tasks" element={isAuthenticated ? <TaskList /> : <Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/shifts" element={isAuthenticated ? <ShiftSchedule /> : <Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/messages" element={isAuthenticated ? <Messages /> : <Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/performance" element={isAuthenticated ? <PerformanceMetrics /> : <Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/payments" element={isAuthenticated ? <PaymentHistory /> : <Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/notifications" element={isAuthenticated ? <Notifications /> : <Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/dashboard" element={isAuthenticated ? <DashBoard /> : <Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path='/help' element={isAuthenticated ? <Help /> : <Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path='/profile' element={isAuthenticated ? <Profile /> : <Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path='/logout' element={<Logout onLogout={handleLogout} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
