import { useEffect, useState } from 'react';
import axios from 'axios';import './style.css'; 
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

import {
  FaTachometerAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaChartBar,
  FaBell,
  FaUsers,
  FaMoneyBillWave,
  FaCog,
} from "react-icons/fa";

const DashD = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate(); // ✅ Redirection
  
  const getStatusColor = status => {
  switch (status) {
    case 'Approved': return 'green';
    case 'Rejected': return 'red';
    case 'Pending': return 'orange';
    default: return 'gray';
  }
};
  const [requests, setRequests] = useState([]);


const [formData, setFormData] = useState({
  credit_name: '',
  requested_amount: '',
  duration_months: '',
  income_proof: '',
  project_description: '',
  credit_type: '',
  guarantees: '',
  insurance: false
});
  const handleLogout = () => {
    logout();            // Supprime du contexte + localStorage
    navigate("/login");       // Redirige vers la page d'accueil
  };


  
const [applications, setApplications] = useState([]);
  // Handle apply button click
  const handleApply = async () => {
    const userId = localStorage.getItem('userId');  // Get the logged-in user's ID from localStorage
    
    if (!userId) {
      alert('User not logged in');
      return;
    }
 // Add userId to the form data
    const formDataWithUser = {
      ...formData,
      userId: userId  // Add userId here
    };

    try {
      await axios.post('http://localhost:8000/api/credit/apply', formDataWithUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`  // Include the JWT token for authorization
        }
      });
      alert('Application submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('Submission failed');
    }
  };

useEffect(() => {
  axios.get('http://localhost:8000/api/applications')
    .then(res => setApplications(res.data))
    .catch(err => console.error(err));
}, []);
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-5 flex flex-col justify-between fixed h-full">
        <div>
          <img src={require("./images/logo.png")} alt="NSMVISION Logo" className="w-100 mb-6" />
          <nav>
            <ul className="space-y-4">
              <li>
                <Link to="/dashbordDec" className="flex items-center text-gray-600 text-sm hover:text-blue-600">
                  <FaTachometerAlt className="mr-3 text-lg" /> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/risk-analysis" className="flex items-center text-gray-600 text-sm hover:text-blue-600">
                  <FaChartBar className="mr-3 text-lg" /> Risk Analysis
                </Link>
              </li>
              <li>
                <Link to="/financial-overview" className="flex items-center text-gray-600 text-sm hover:text-blue-600">
                  <FaMoneyBillWave className="mr-3 text-lg" /> Financial Overview
                </Link>
              </li>
              <li>
                <Link to="/credit-reports" className="flex items-center text-gray-600 text-sm hover:text-blue-600">
                  <FaChartBar className="mr-3 text-lg" /> Reports
                </Link>
              </li>
              <li>
                <Link to="/credit-req" className="flex items-center text-gray-600 text-sm hover:text-blue-600">
                  <FaChartBar className="mr-3 text-lg" /> Credits Requests
                </Link>
              </li>

              <li>
                <Link to="/credit-Decision" className="flex items-center text-gray-600 text-sm hover:text-blue-600">
                  <FaUsers className="mr-3 text-lg" /> Decisions
                </Link>
              </li>
              <li>
                <Link to="/credit-approvals" className="flex items-center text-gray-600 text-sm hover:text-blue-600">
                  <FaCheckCircle className="mr-3 text-lg" /> Approved Credits
                </Link>
              </li>
              <li>
                <Link to="/credit-rejections" className="flex items-center text-gray-600 text-sm hover:text-blue-600">
                  <FaTimesCircle className="mr-3 text-lg" /> Rejected Credits
                </Link>
              </li>
              <li>
              <div className="my-4 border-t border-gray-200"></div>

   <li>
                <Link to="/dec" className="flex items-center text-gray-600 text-sm hover:text-blue-600">
                  <FaTachometerAlt className="mr-3 text-lg" /> Home
                </Link>
              </li>
              
                <Link to="/notifications" className="flex items-center text-gray-600 text-sm hover:text-blue-600">
                  <FaBell className="mr-3 text-lg" /> Notifications
                </Link>
              </li>
              <li>
                <Link to="/settings" className="flex items-center text-gray-600 text-sm hover:text-blue-600">
                  <FaCog className="mr-3 text-lg" /> Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
                <footer className="flex items-center mt-auto">
  <div>
  
    <button onClick={handleLogout} className="text-red-500 text-xs mt-2 block">
      Logout
    </button>
  </div>
</footer>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 ml-64 overflow-y-auto h-screen relative">
        <header className="flex justify-between items-center mb-6 bg-white shadow-md p-4 fixed w-full z-10 top-0 left-64">
          <h1 className="text-xl font-extrabold text-gray-500 tracking-wide uppercase">Decision-Making Dashboard</h1>
        </header>
        
{/* Dashboard Content */}
        <div className="pt-16 pb-20">
          {/* Key Metrics Section */}
          <section className="grid grid-cols-3 gap-4 mb-6">
            {["Pending Approvals", "Risk Alerts", "Processed Requests"].map((label, index) => (
              <div key={index} className="bg-blue-100 shadow-md rounded-lg p-4 transition">
                <h3 className="text-blue-800 font-semibold">{label}</h3>
                <p className="text-2xl font-bold text-gray-900">{Math.floor(Math.random() * 500)}</p>
                <span className="text-green-600 font-medium">{Math.floor(Math.random() * 10)}% increase</span>
              </div>
            ))}
          </section>



          {/* Credit Application Trends */}
          <section className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg text-gray-800 font-bold mb-4">Credit Application Trends</h3>
            <div className="h-48 flex items-center justify-center bg-gray-200 rounded-lg">
              Credit Trends Graph Placeholder
            </div>
          </section>

          {/* Risk Analysis Insights */}
          <section className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg text-gray-800 font-bold mb-4">Risk Analysis Insights</h3>
            <div className="h-48 flex items-center justify-center bg-gray-200 rounded-lg">
              Risk Analysis Chart Placeholder
            </div>
          </section>

          {/* Approval Rate */}
          <section className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg text-gray-800 font-bold mb-4">Approval Rate</h3>
            <div className="h-48 flex items-center justify-center bg-gray-200 rounded-lg">
              Approval Rate Graph Placeholder
            </div>
          </section>

          {/* Financial Performance Overview */}
          <section className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg text-gray-800 font-bold mb-4">Financial Performance Overview</h3>
            <div className="h-48 flex items-center justify-center bg-gray-200 rounded-lg">
              Financial Performance Data Placeholder
            </div>
          </section>
          <section className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg text-gray-800 font-bold mb-4">Innovation Reports</h3>
            <p className="text-gray-700">Stay ahead by analyzing innovation and research trends in the financial sector.</p>
          </section>
           {/* Reports Section */}
        <section className="bg-blue-50 p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg text-gray-800 font-bold mb-4">Recent Reports</h3>
          <ul className="space-y-3">
            {["Risk Analysis Q1", "Credit Request Trends", "Performance of Granted Credits"].map((report, index) => (
              <li key={index} className="flex justify-between items-center text-gray-600 text-sm">
                <span>{report}</span>
                <button className="text-blue-600 font-semibold hover:underline">View</button>
              </li>
            ))}
          </ul>
        </section>

        </div>
      </main>
    </div>
  );
};

export default DashD;
