import React, { useEffect, useState } from "react";
import './style.css';
import axios from "axios";
import { Link } from "react-router-dom";
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

const Decision = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/demandes/")
      .then((res) => {
    const pending = res.data.filter((req) => req.loan_status === null);

        setRequests(pending);
      })
      .catch((err) => console.error("Failed to fetch demandes", err));
  }, []);
const handleStatusChange = (id, status) => {
  const loan_status = status === "Approved" ? 1 : 0;

  axios
    .patch(`http://localhost:8000/api/demandes/${id}`, { loan_status })
    .then(() => {
      setRequests(prev => prev.filter(req => req._id !== id));
    })
    .catch(err => {
      console.error("❌ PATCH ERROR:", err.response?.data || err.message);
      alert("Error updating status");
    });
};



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
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 ml-64 overflow-y-auto h-screen relative">
        <header className="flex justify-between items-center mb-6 bg-white shadow-md p-4 fixed w-full z-10 top-0 left-64">
          <h1 className="text-xl font-extrabold text-gray-500 tracking-wide uppercase">Decision-Making Dashboard</h1>
        </header>

      {/* Credit Requests Table */}
<section className="bg-white p-6 rounded-lg shadow-md mb-6 mt-20">
  <h3 className="text-lg text-gray-800 font-bold mb-4">Credit Requests Overview</h3>
  <div className="overflow-hidden rounded-lg shadow-md border border-gray-300">
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-100 text-gray-700">
          <th className="text-left p-4">Client Name</th>
          <th className="text-left p-4">Loan Purpose</th>
          <th className="text-left p-4">Loan Amount (€)</th>
          <th className="text-left p-4">Request Date</th>
          <th className="text-left p-4">Credit Score</th>
          <th className="text-left p-4">Status</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((req) => (
          <tr key={req._id} className="border-t border-gray-200 hover:bg-gray-50 transition">
            <td className="p-4">{req.userId?.name || "Unknown"}</td>
            <td className="p-4">{req.loan_intent || "—"}</td>
            <td className="p-4 font-semibold">{req.loan_amnt}</td>
            <td className="p-4">{req.createdAt ? new Date(req.createdAt).toLocaleDateString() : "—"}</td>
            <td className="p-4">{req.credit_score || "—"}</td>
            <td className="p-4 flex space-x-2">
              <button
                className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm"
                onClick={() => handleStatusChange(req._id, "Approved")}
              >
                Approved
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm"
                onClick={() => handleStatusChange(req._id, "Rejected")}
              >
                Deny
              </button>
 <button
    className="px-3 py-1 bg-yellow-500 text-white rounded-lg text-sm"
   
  >
    Predict
  </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>

      </main>
    </div>
  );
};

export default Decision;
