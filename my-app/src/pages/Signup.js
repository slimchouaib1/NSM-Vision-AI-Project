import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


const Signup = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    dob: '',
    phone: '',
    address: '',
    role: 'client',
  });

  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!agree) return setError('You must agree to the terms and conditions.');

    try {
      const fullName = `${form.firstName} ${form.lastName}`;
      await axios.post('http://localhost:8000/api/signup', { ...form, name: fullName });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2e2e48] to-[#1f1f2e] text-white px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 shadow-lg rounded-xl overflow-hidden">
        {/* Left visual panel */}
        <div className="relative bg-black">
          <img
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1050&q=80"
            alt="Banking Visual"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <div className="text-right">
              <button className="text-sm border border-white px-3 py-1 rounded-full hover:bg-white hover:text-black transition">
                Back to website →
              </button>
            </div>
            <div className="text-white">
<h2 className="text-2xl font-semibold mb-1">Finance Your Dreams,</h2>
<p className="text-xl">Secure Your Tomorrow</p>

            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="bg-[#18181c] p-10">
          <h2 className="text-3xl font-semibold mb-2">Create your account</h2>
          <p className="text-sm text-gray-400 mb-6">
            Already have an account? <Link to="/login" className="text-purple-400 hover:underline">Log in</Link>
          </p>

          {error && <div className="text-red-500 text-sm mb-3">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3">
              <input
                name="firstName"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
                className="flex-1 px-4 py-2 rounded bg-[#2a2a35] border border-gray-600 focus:outline-none focus:border-purple-500"
                required
              />
              <input
                name="lastName"
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange}
                className="flex-1 px-4 py-2 rounded bg-[#2a2a35] border border-gray-600 focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-[#2a2a35] border border-gray-600 focus:outline-none focus:border-purple-500"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-[#2a2a35] border border-gray-600 focus:outline-none focus:border-purple-500"
              required
            />

            <div className="flex gap-3">
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-1/2 px-4 py-2 rounded bg-[#2a2a35] border border-gray-600 focus:outline-none focus:border-purple-500"
                required
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="w-1/2 px-4 py-2 rounded bg-[#2a2a35] border border-gray-600 focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            <input
              name="phone"
              type="tel"
              placeholder="Phone number"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-[#2a2a35] border border-gray-600 focus:outline-none focus:border-purple-500"
              required
            />

            <input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-[#2a2a35] border border-gray-600 focus:outline-none focus:border-purple-500"
              required
            />

            <label className="flex items-center text-sm text-gray-400">
              <input
                type="checkbox"
                className="mr-2"
                checked={agree}
                onChange={() => setAgree(!agree)}
              />
              I agree to the <span className="text-purple-400 ml-1 hover:underline">Terms & Conditions</span>
            </label>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded mt-2"
            >
              Create account
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="mx-2 text-sm text-gray-400">Or register with</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>

            <div className="flex gap-4">
            <button
                type="button"
                className="flex-1 border border-gray-500 text-white py-2 rounded hover:bg-gray-700 flex items-center justify-center gap-2"
            >
                <i className="fab fa-google text-red-500"></i> Google
            </button>

            <button
                type="button"
                className="flex-1 border border-gray-500 text-white py-2 rounded hover:bg-gray-700 flex items-center justify-center gap-2"
            >
                <i className="fab fa-facebook text-blue-500"></i> Facebook
            </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
