import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const verifyToken = async (token) => {
  try {
    const res = await axios.post('/verify-token', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.valid;
  } catch {
    return false;
  }
};

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/login', formData);
      alert(res.data.message);
      // Save token to sessionStorage with expiry (1 hour)
      if (res.data.user && res.data.token) {
        const expiry = Date.now() + 60 * 60 * 1000; // 1 hour from now
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('token_expiry', expiry.toString());
      }
      // Redirect to the Online Compiler frontend after successful login
      navigate('/compiler');
    } catch (err) {
      alert(
        err.response?.data?.message ||
        err.response?.data ||
        'Login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-200">
      {/* Debug message to confirm rendering */}
      <div className="absolute top-2 left-2 bg-yellow-200 px-2 py-1 rounded text-xs text-gray-700 z-50">
        Login component loaded
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg px-8 py-10 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <div>
          <input
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          />
        </div>
        <div>
          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <span
            className="text-purple-600 hover:underline cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
