// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import Register from './pages/register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;