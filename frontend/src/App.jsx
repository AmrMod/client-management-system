// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThemeProvider from "./components/ThemeProvider";
import { AuthProvider } from "./context/AuthContext";


import Home from './pages/Home';
import Login from './pages/login';
import Dashboard from './pages/dashboard/Dashboard';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import SupportDashboard from './pages/support/SupportDashboard';

import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />


            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/AdminDashboard" element={<AdminDashboard />} />
              
            
              <Route path="/SupportDashboard" element={<SupportDashboard />} />

              
              <Route path="/ManagerDashboard" element={<ManagerDashboard />} />

            </Route>

            
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;