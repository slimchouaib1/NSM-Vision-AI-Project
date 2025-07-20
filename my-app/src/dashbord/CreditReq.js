import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import {
  FaTachometerAlt,
  FaChartBar,
  FaMoneyBillWave,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaBell,
  FaCog,
} from "react-icons/fa";

const CreditReq = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // ✅ Redirection
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();            // Supprime du contexte + localStorage
    navigate("/login");       // Redirige vers la page d'accueil
  };

  const filteredRequests = requests.filter((req) =>
    (req.userId?.name || "Unknown").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (req.credit_type || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (req.status || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.requested_amount?.toString().includes(searchQuery)
  );

useEffect(() => {
  axios.get("http://localhost:8000/api/demandes/")
    .then(res => setRequests(res.data))
    .catch(err => console.error("Error fetching requests", err));
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
      <div className="flex-1 p-6 ml-64 overflow-y-auto h-screen">
        <header className="flex justify-between items-center mb-6 bg-white shadow-md p-4 fixed w-full z-10 top-0 left-64">
          <h1 className="text-xl font-extrabold text-gray-500 tracking-wide uppercase">Credit Requests</h1>
        </header>

        {/* Requests Table */}
    <section className="bg-white p-6 rounded-lg shadow-md mt-20 max-h-[calc(100vh-4rem)] overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <button className="text-sm text-blue-600">Filters</button>
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

<div className="overflow-auto">
  <table className="w-full table-auto border-collapse">
    <thead>
      <tr className="bg-gray-100 text-gray-800">
        <th className="text-left p-4">Client Name</th>
        <th className="text-left p-4">Purpose</th>
        <th className="text-left p-4">Submission Date</th>
        <th className="text-left p-4">Loan Amount (€)</th>
        <th className="text-left p-4">Income (€)</th>
        <th className="text-left p-4">Experience</th>
        <th className="text-left p-4">Education</th>
        <th className="text-left p-4">Status</th>
        <th className="text-left p-4">Action</th>
      </tr>
    </thead>
    <tbody>
      {filteredRequests.length === 0 ? (
        <tr>
          <td className="p-4 text-center text-gray-500" colSpan="9">
            No applications found
          </td>
        </tr>
      ) : (
        filteredRequests.map((req) => (
          <tr key={req._id} className="border-t border-gray-200">
            <td className="p-4 text-blue-600">{req.userId?.name || "Unknown"}</td>
            <td className="p-4">{req.loan_intent}</td>
            <td className="p-4">{new Date(req.createdAt).toLocaleDateString()}</td>
            <td className="p-4 font-semibold">{req.loan_amnt}</td>
            <td className="p-4">{req.person_income}</td>
            <td className="p-4">{req.person_emp_exp} yrs</td>
            <td className="p-4">{req.person_education}</td>
 <td className="p-4">
  {req.loan_status === 1
    ? "Approved"
    : req.loan_status === 0
    ? "Rejected"
    : "Pending"}
</td>

            <td className="p-4">
              <button className="text-gray-600 hover:text-blue-600">...</button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>

    </section>
      </div>
    </div>
  );
};

export default CreditReq;
