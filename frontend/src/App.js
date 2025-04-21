import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import VehiclePage from './pages/VehiclePage';
import VehicleEditPage from './pages/VehicleEditPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/vehicle/:id" element={<PrivateRoute><VehiclePage /></PrivateRoute>} />
        <Route path="/vehicle/:id/edit" element={<PrivateRoute><VehicleEditPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
