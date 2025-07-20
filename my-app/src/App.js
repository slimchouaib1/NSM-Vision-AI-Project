import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeAnalyst from "./pages/homeAnalyst";
import Dash from "./dashbord/Dash";
import CreditApp from "./dashbord/CreditApp";
import Home from "./pages/home";
import Credit from "./pages/Credit";
import DashD from "./dashbord/DashD";
import Decision from "./dashbord/decisions";
import CreditReq from "./dashbord/CreditReq";
import ApprovedCredits from "./dashbord/ApprovedCredits";
import RejectedCredits from "./dashbord/RejectedCredits";
import HomeDecideur from "./pages/homeDecideur";
import ChatWidget from "./pages/ChatWidget";
import Signup from "./pages/Signup";
import Login from "./pages/login";



function App() {
  return (
    <Router>
      <Routes>

        <Route path="/signup" element={<Signup />} />     {/* ✅ Signup Page */}
        <Route path="/login" element={<Login />} />       {/* ✅ Login Page */}

        
        <Route path="/Home" element={<Home />} />  
        <Route path="/credit" element={<Credit />} />
        <Route path="/dashbordDec" element={<DashD />} />
        <Route path="/credit-Decision" element={<Decision />} />
        
        <Route path="/credit-req" element={<CreditReq />} />
        
        <Route path="/credit-approvals" element={<ApprovedCredits />} />
        <Route path="/credit-rejections" element={<RejectedCredits />} />

        <Route path="/dec" element={<HomeDecideur />} />
        <Route path="/" element={<HomeAnalyst />} />
        <Route path="/dashboard" element={<Dash />} />
        <Route path="/credit-applications" element={<CreditApp />} />
      </Routes>
      <ChatWidget />
    </Router>
  );
}

export default App;
