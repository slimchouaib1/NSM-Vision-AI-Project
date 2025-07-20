import React, { useEffect, useState } from "react";
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
  

const ApprovedCredits = () => {
 const [approvedCredits, setApprovedCredits] = useState([]);

useEffect(() => {
  axios.get("http://localhost:8000/api/demandes/")
    .then((res) => {
      const approved = res.data.filter((app) => app.loan_status === 1);
      setApprovedCredits(approved);
    })
    .catch((err) => console.error("Error fetching approved credits", err));
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
                <Link to="/dashboard" className="flex items-center text-gray-600 text-sm hover:text-blue-600">
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
      <div className="flex-1 p-6 ml-64 overflow-y-auto h-screen">
        <header className="flex justify-between items-center mb-6 bg-white shadow-md p-4 fixed w-full z-10 top-0 left-64">
          <h1 className="text-xl font-extrabold text-gray-500 tracking-wide uppercase">Approved Credits</h1>
        </header>

        {/* Approved Credits Table */}
        <section className="bg-white p-6 rounded-lg shadow-md mt-20 max-h-[calc(100vh-4rem)] overflow-auto">
          <div className="overflow-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
  <tr className="bg-gray-100 text-gray-800">
    <th className="text-left p-4">Client Name</th>
    <th className="text-left p-4">Loan Purpose</th>
    <th className="text-left p-4">Amount (€)</th>
    <th className="text-left p-4">Approval Date</th>
    <th className="text-left p-4">Status</th>
  </tr>
</thead>
<tbody>
  {approvedCredits.map((credit) => (
    <tr key={credit._id} className="border-t border-gray-200 hover:bg-gray-50 transition">
      <td className="p-4">{credit.userId?.name || "Unknown"}</td>
      <td className="p-4">{credit.loan_intent}</td>
      <td className="p-4">{credit.loan_amnt}</td>
      <td className="p-4">
        {new Date(credit.decisionDate || credit.updatedAt || credit.createdAt).toLocaleDateString()}
      </td>
      <td className="p-4">
        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
          Approved
        </span>
      </td>
    </tr>
  ))}
</tbody>


            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ApprovedCredits;