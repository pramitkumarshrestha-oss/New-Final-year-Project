import React from 'react';
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

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
          <Routes>
            <Route path="/" element={<WorkerHomePage />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/shifts" element={<ShiftSchedule />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/performance" element={<PerformanceMetrics />} />
            <Route path="/payments" element={<PaymentHistory />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path='/help' element={<Help/>} />
            <Route path='/profile' element={<Profile/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;