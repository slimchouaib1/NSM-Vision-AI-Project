import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

import {
  FaTachometerAlt,
  FaBox,
  FaEnvelope,
  FaCog,
  FaBell,
} from "react-icons/fa";

const CreditApp = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/demandes/")
      .then((res) => setRequests(res.data))
      .catch((err) => console.error("Failed to fetch credit applications", err));
  }, []);

  const filteredRequests = requests.filter((req) =>
    (req.userId?.name || "Unknown").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (req.loan_intent || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (req.status || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.loan_amnt?.toString().includes(searchQuery)
  );

  return (
    <main className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-5 flex flex-col justify-between fixed h-full">
        <div>
          <img
            src={require("./images/logo.png")}
            alt="NSMVISION Logo"
            className="w-100 mb-6"
          />
          <nav>
            <ul className="space-y-4">
              <li>
                <Link to="/dashboard" className="flex items-center text-gray-600 text-sm hover:text-blue-600">
                  <FaTachometerAlt className="mr-3 text-lg" /> Dashboard
                </Link>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-600 text-sm hover:text-blue-600">
                  <FaBox className="mr-3 text-lg" /> Analysis & Reports
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-600 text-sm hover:text-blue-600">
                  <FaEnvelope className="mr-3 text-lg" /> Report Generation
                </a>
              </li>
              <li>
                <Link to="/credit-applications" className="flex items-center text-gray-600 text-sm hover:text-blue-600">
                  <FaEnvelope className="mr-3 text-lg" /> Credit Applications
                </Link>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-600 text-sm hover:text-blue-600">
                  <FaEnvelope className="mr-3 text-lg" /> Messages
                  <span className="bg-blue-600 text-white rounded-full px-2 text-xs ml-2">6</span>
                </a>
              </li>
              <div className="my-4 border-t border-gray-200"></div>
              <li>
                <Link to="/" className="flex items-center text-gray-600 text-sm hover:text-blue-600">
                  <FaTachometerAlt className="mr-3 text-lg" /> Home
                </Link>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-600 text-sm hover:text-blue-600">
                  <FaCog className="mr-3 text-lg" /> Settings
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-600 text-sm hover:text-blue-600">
                  <FaBell className="mr-3 text-lg" /> Notifications
                  <span className="bg-blue-600 text-white rounded-full px-2 text-xs ml-2">23</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <footer className="flex items-center mt-auto">
          <button onClick={handleLogout} className="text-red-500 text-xs mt-2 block">
            Logout
          </button>
        </footer>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 ml-64 overflow-y-auto h-screen">
        <header className="flex justify-between items-center mb-6 bg-white shadow-md p-4 fixed w-full z-10 top-0 left-64">
          <h1 className="text-xl font-extrabold text-gray-500 tracking-wide uppercase">
            Credit Applications
          </h1>
        </header>

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
                  <th className="text-left p-4">Client</th>
                  <th className="text-left p-4">Age</th>
                  <th className="text-left p-4">Gender</th>
                  <th className="text-left p-4">Education</th>
                  <th className="text-left p-4">Income</th>
                  <th className="text-left p-4">Experience</th>
                  <th className="text-left p-4">Ownership</th>
                  <th className="text-left p-4">Purpose</th>
                  <th className="text-left p-4">Loan Amount</th>
                  <th className="text-left p-4">Interest %</th>
                  <th className="text-left p-4">Loan % Income</th>
                  <th className="text-left p-4">Credit Score</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td className="p-4 text-center text-gray-500" colSpan="14">
                      No applications found
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((req) => (
                    <tr key={req._id} className="border-t border-gray-200">
                      <td className="p-4 text-blue-600">{req.userId?.name || "Unknown"}</td>
                      <td className="p-4">{req.person_age}</td>
                      <td className="p-4">{req.person_gender}</td>
                      <td className="p-4">{req.person_education}</td>
                      <td className="p-4">{req.person_income}</td>
                      <td className="p-4">{req.person_emp_exp}</td>
                      <td className="p-4">{req.person_home_ownership}</td>
                      <td className="p-4">{req.loan_intent}</td>
                      <td className="p-4">{req.loan_amnt}</td>
                      <td className="p-4">{req.loan_int_rate}</td>
                      <td className="p-4">{req.loan_percent_income}</td>
                      <td className="p-4">{req.credit_score}</td>
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
    </main>
  );
};

export default CreditApp;
