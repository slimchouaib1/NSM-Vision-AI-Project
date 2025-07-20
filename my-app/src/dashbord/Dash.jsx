import React, { useEffect, useState } from "react";
import axios from "axios";
import './style.css';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

import {
  FaTachometerAlt,
  FaBox,
  FaEnvelope,
  FaCog,
  FaBell,
} from "react-icons/fa";

const Dash = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/demandes/")
      .then((res) => setRequests(res.data))
      .catch((err) =>
        console.error("Erreur lors du chargement des demandes :", err)
      );
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-5 flex flex-col justify-between fixed h-full">
        <div>
          <img src={require("./images/logo.png")} alt="NSMVISION Logo" className="w-100 mb-6" />
          <nav>
            <ul className="space-y-4">
              <li><a href="/dashboard" className="flex items-center text-gray-600 text-sm hover:text-blue-600"><FaTachometerAlt className="mr-3 text-lg" /> Dashboard</a></li>
              <li><a href="#" className="flex items-center text-gray-600 text-sm hover:text-blue-600"><FaBox className="mr-3 text-lg" /> Analysis & Reports</a></li>
              <li><a href="#" className="flex items-center text-gray-600 text-sm hover:text-blue-600"><FaEnvelope className="mr-3 text-lg" /> Report Generation</a></li>
              <li><Link to="/credit-applications" className="flex items-center text-gray-600 text-sm hover:text-blue-600"><FaEnvelope className="mr-3 text-lg" /> Credit Applications</Link></li>
              <li><a href="#" className="flex items-center text-gray-600 text-sm hover:text-blue-600"><FaEnvelope className="mr-3 text-lg" /> Messages <span className="bg-blue-600 text-white rounded-full px-2 text-xs ml-2">6</span></a></li>
              <div className="my-4 border-t border-gray-200"></div>
              <li><Link to="/" className="flex items-center text-gray-600 text-sm hover:text-blue-600"><FaTachometerAlt className="mr-3 text-lg" /> Home</Link></li>
              <li><a href="#" className="flex items-center text-gray-600 text-sm hover:text-blue-600"><FaCog className="mr-3 text-lg" /> Settings</a></li>
              <li><a href="#" className="flex items-center text-gray-600 text-sm hover:text-blue-600"><FaBell className="mr-3 text-lg" /> Notifications <span className="bg-blue-600 text-white rounded-full px-2 text-xs ml-2">23</span></a></li>
            </ul>
          </nav>
        </div>

        <footer className="flex items-center mt-auto">
          <div>
            
            <button onClick={handleLogout} className="text-red-500 text-xs mt-2 block">Logout</button>
          </div>
        </footer>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 ml-64 overflow-y-auto h-screen relative">
        <header className="flex justify-between items-center mb-6 bg-white shadow-md p-4 fixed w-full z-10 top-0 left-64">
          <h1 className="text-xl font-extrabold text-gray-500 tracking-wide uppercase">Analyst Dashboard</h1>
        </header>

        <div className="pt-16 pb-20">
          {/* Statistics Section */}
          <section className="grid grid-cols-4 gap-4 mb-6">
            {[
              "Generated Reports", "Completed Analyses", "Processed Requests",
              "Satisfied Clients", "Active Users", "Acceptance Rate",
              "Credit Evolution", "Messages Received"
            ].map((label, index) => (
              <div key={index} className="bg-blue-100 shadow-md rounded-lg p-4 transition">
                <h3 className="text-blue-800 font-semibold">{label}</h3>
                <p className="text-2xl font-bold text-gray-900">{Math.floor(Math.random() * 100000)}</p>
                <span className="text-green-600 font-medium">{Math.floor(Math.random() * 10)}% increase</span>
              </div>
            ))}
          </section>
        </div>

{/* Ongoing Credit Requests Table */}
<section className="bg-white p-6 rounded-lg shadow-md mt-6 max-h-[calc(100vh-4rem)] overflow-auto">
  <h3 className="text-lg font-bold text-gray-800 mb-4">Ongoing Credit Requests</h3>
  <div className="overflow-auto">
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-100 text-gray-800">
          <th className="text-left p-4">Client Name</th>
          <th className="text-left p-4">Income </th>
          <th className="text-left p-4">Status</th>
          <th className="text-left p-4">Date</th>
        </tr>
      </thead>
      <tbody>
        {requests.filter(req => req.status === "Pending").length === 0 ? (
          <tr>
            <td className="p-4 text-center text-gray-500" colSpan="4">No ongoing credit requests</td>
          </tr>
        ) : (
          requests
            .filter(req => req.status === "Pending")
            .map((req) => (
              <tr key={req._id} className="border-t border-gray-200">
                <td className="p-4 text-blue-600">{req.userId?.name || "Unknown"}</td>
                <td className="p-4 font-bold">{req.person_income}</td>
               <td className="p-4">
  {req.loan_status === 1
    ? "Approved"
    : req.loan_status === 0
    ? "Rejected"
    : "Pending"}
</td>

                <td className="p-4 text-sm">{new Date(req.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
        )}
      </tbody>
    </table>
  </div>
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

{/* Analysis Insights Section */}
<section className="bg-blue-50 p-8 rounded-xl shadow-lg mb-8">
          <h3 className="text-xl text-gray-800 font-bold mb-6">Analysis and Insights</h3>
          <div className="h-48 flex items-center justify-center bg-gray-200 rounded-xl shadow-inner">
            Trend Analysis Graph Placeholder
          </div>
        </section>

        {/* Risk Evaluation Section */}
        <section className="bg-blue-50 p-8 rounded-xl shadow-lg mb-8">
          <h3 className="text-xl text-gray-800 font-bold mb-6">Risk Evaluation</h3>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="text-left p-5">Factor</th>
                <th className="text-left p-5">Impact</th>
              </tr>
            </thead>
            <tbody>
              {["Credit History", "Repayment Capacity", "Financial Stability"].map((factor, index) => (
                <tr key={index} className="border-t border-gray-300 hover:bg-gray-100 transition">
                  <td className="p-5">{factor}</td>
                  <td className="p-5 text-red-600 font-semibold">High</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>


  {/* Client Feedback Section - Enhanced */}
  <section className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <h3 className="text-xl text-gray-800 font-bold mb-6">Client Feedback</h3>
          <div className="grid grid-cols-3 gap-6">
            {[
              "Fast and efficient service", "Needs improvement in transparency", "Satisfied with the support", 
              "Excellent communication", "Highly recommend this service", "Could be faster response time"
            ].map((feedback, index) => (
              <div key={index} className="p-6 bg-gradient-to-br from-gray-50 to-gray-200 shadow-lg rounded-xl border-l-4 border-blue-600 flex flex-col transform hover:scale-105 transition-transform">
                <p className="text-gray-700 italic text-lg">"{feedback}"</p>
                <div className="flex justify-end mt-4">
                  <span className="text-sm text-gray-600 font-semibold">- Client {index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </section>


         {/* Financial Risk Prediction Section */}
         <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg text-gray-800 font-bold mb-4">Financial Risk Prediction</h3>
          <div className="h-48 flex items-center justify-center bg-gray-100 rounded-lg">
            AI-based Risk Analysis Placeholder
          </div>
        </section>

        {/* Loan Approval Trends Section */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg text-gray-800 font-bold mb-4">Loan Approval Trends</h3>
          <div className="h-48 flex items-center justify-center bg-gray-100 rounded-lg">
            Approval Trends Graph Placeholder
          </div>
        </section>
      </main>


    </div>
  );
};

export default Dash;
