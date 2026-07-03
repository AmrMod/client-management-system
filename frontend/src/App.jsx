// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import Register from './pages/register';
import AdminDashboard from './pages/admin/AdminDashboard';
import Users from "./pages/admin/Users";
import CreateUserByAdmin from "./pages/admin/CreateUserByAdmin";
import EditUsers from './pages/admin/EditUsers';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/CreateuserByAdmin" element={<CreateUserByAdmin />} />
        <Route path="/:id/EditUsers" element={<EditUsers />} />

        

        

      </Routes>
    </Router>
  );
}

export default App;