import EmergencyHelp from "./EmergencyHelp";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Authentication & Dashboard
import Login from "./Login";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "./AdminDashboard";

// Complaint Modules
import ComplaintForm from "./ComplaintForm";
import ComplaintStatus from "./ComplaintStatus";
import ComplaintSummaryTest from "./ComplaintSummaryTest";
import ComplaintPriorityTest from "./ComplaintPriorityTest";

// AI Modules
import ChatPage from "./ChatPage";
import GeminiTest from "./GeminiTest";
import SchemeRecommendation from "./SchemeRecommendation";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
  path="/emergency"
  element={<EmergencyHelp />}
/>

        {/* Login Route */}
        <Route path="/" element={<Login />} />

        {/* User Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Complaint Submission */}
        <Route
          path="/complaint"
          element={
            <ProtectedRoute>
              <ComplaintForm />
            </ProtectedRoute>
          }
        />

        {/* Complaint Status */}
        <Route
          path="/status"
          element={
            <ProtectedRoute>
              <ComplaintStatus />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
  path="/admin"
  element={<AdminDashboard />}
/>

        {/* AI Complaint Summary */}
        <Route
          path="/summary"
          element={<ComplaintSummaryTest />}
        />

        {/* AI Priority Detection */}
        <Route
          path="/priority"
          element={<ComplaintPriorityTest />}
        />

        {/* Government Scheme Recommendation */}
        <Route
          path="/schemes"
          element={<SchemeRecommendation />}
        />

        {/* AI Chat Assistant */}
        <Route
          path="/chat"
          element={<ChatPage />}
        />

        {/* Gemini Testing */}
        <Route
          path="/gemini"
          element={<GeminiTest />}
        />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);