import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import OnlineCompiler from './components/OnlineCompiler';
import RequireAuth from './components/RequireAuth';

// Simple Home component for demonstration
const Home = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-3xl font-bold text-gray-800">Welcome Home</h1>
  </div>
);

const App = () => {
  return (
    <Router>
      <div>
        <nav className="flex gap-4 mb-6">
          <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/compiler"
            element={
              <RequireAuth>
                <OnlineCompiler />
              </RequireAuth>
            }
          />
          {/* Optionally, redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
