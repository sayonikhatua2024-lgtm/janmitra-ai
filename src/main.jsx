import ComplaintForm from "./ComplaintForm";
import ComplaintStatus from "./ComplaintStatus";
import ComplaintSummaryTest from "./ComplaintSummaryTest";
import ComplaintPriorityTest from "./ComplaintPriorityTest";
import SchemeRecommendation from "./SchemeRecommendation";
import ChatPage from "./ChatPage";
import GeminiTest from "./GeminiTest";
import ProtectedRoute from "./ProtectedRoute";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
  path="/summary"
  element={<ComplaintSummaryTest />}
/>
        <Route
  path="/priority"
  element={<ComplaintPriorityTest />}
/>
        <Route
  path="/schemes"
  element={<SchemeRecommendation />}
/>
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/gemini" element={<GeminiTest />} />
        <Route path="/" element={<Login />} />
        <Route path="/complaint" element={<ComplaintForm />} />
       <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
  
/>
<Route
  path="/status"
  element={
    <ProtectedRoute>
      <ComplaintStatus />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);