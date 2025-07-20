import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      switch (res.data.user.role) {
        case 'admin':
        case 'analyst':
          navigate('/');
          break;
        case 'client':
          navigate('/Home');
          break;
        case 'decision-maker':
          navigate('/dec');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setMsg(err.response?.data?.message || 'Login failed');
    }
  };

  const handleOAuth = (provider) => {
    window.location.href = `http://localhost:8000/auth/${provider}`; // e.g., /auth/google or /auth/facebook
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left: Visual */}
      <div className="bg-gray-100 flex flex-col justify-center items-center p-8 text-center">
        <img
          src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80"
          alt="banking"
          className="rounded-xl shadow-lg w-full max-w-sm mb-6"
        />
        <p className="text-lg font-semibold">“Simply all the tools that my team and I need.”</p>
        <p className="text-sm text-gray-600 mt-2">Welcome back </p>
      </div>

      {/* Right: Form */}
      <div className="bg-white flex flex-col justify-center px-10 py-12">
        <h2 className="text-3xl font-bold mb-2">Welcome to NSM VISION</h2>
        <p className="text-gray-500 mb-6">Log in to your account to manage your loan applications.</p>

        {msg && <div className="text-red-500 text-sm mb-4">{msg}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-500"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-500"
            required
          />
          <div className="text-right text-sm">
            <Link to="#" className="text-purple-600 hover:underline">Forgot password?</Link>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Log in
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>

        <button
          onClick={() => handleOAuth('google')}
          className="flex items-center justify-center w-full border border-gray-300 py-2 rounded mb-3 hover:bg-gray-50"
        >
          <i className="fab fa-google text-red-500 mr-2"></i> Continue with Google
        </button>

        <button
          onClick={() => handleOAuth('facebook')}
          className="flex items-center justify-center w-full border border-gray-300 py-2 rounded hover:bg-gray-50"
        >
          <i className="fab fa-facebook text-blue-600 mr-2"></i> Continue with Facebook
        </button>

        <p className="text-sm text-center mt-6 text-gray-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-purple-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
