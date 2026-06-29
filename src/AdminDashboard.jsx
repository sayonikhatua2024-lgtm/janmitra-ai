import { generateMPActionPlan } from "./services/mpActionPlanAI";
import { toast } from "react-toastify";
import ComplaintMap from "./ComplaintMap";
import React, { useEffect, useMemo, useState } from "react";
import {
  getAllComplaints,
  updateComplaintStatus
} from "./services/firestoreService";
import { generateAdminSummary } from "./services/adminSummaryAI";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [mpPlan, setMpPlan] = useState("");
const [loadingPlan, setLoadingPlan] = useState(false);
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const handleStatusUpdate = async (id, status) => {
  const success = await updateComplaintStatus(id, status);

  if (success) {
    alert(`Complaint marked as ${status}`);

    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === id
        ? { ...complaint, status }
        : complaint
    );

    setComplaints(updatedComplaints);
  } else {
    alert("Failed to update complaint status");
  }
};

  // Load complaints
  useEffect(() => {
  const loadComplaints = async () => {
    const data = await getAllComplaints();

    console.log("Complaints fetched:", data);

    // Sort newest first
    data.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;

      return (
        b.createdAt.seconds - a.createdAt.seconds
      );
    });

    setComplaints(data);
  };

  loadComplaints();

  // Auto refresh every 5 seconds
  const interval = setInterval(
    loadComplaints,
    5000
  );

  return () => clearInterval(interval);
}, []);
useEffect(() => {
  if (complaints.length === 0) return;

  const criticalComplaints = complaints.filter(
    (complaint) =>
      complaint.status === "Critical" ||
      complaint.priority === "CRITICAL"
  );

  if (criticalComplaints.length > 0) {
    toast.error(
      `🚨 ${criticalComplaints.length} Critical Complaint(s) detected!`,
      {
        position: "top-right",
        autoClose: 5000,
      }
    );
  }
}, [complaints]);
  // Statistics
  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const resolvedComplaints = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  const criticalComplaints = complaints.filter(
    (c) =>
      c.priority === "High" ||
      c.priority === "Critical"
  ).length;

  // Hotspots
  const hotspots = useMemo(() => {
    const counts = {};

    complaints.forEach((complaint) => {
      const location = complaint.location;

      if (!location) return;

      counts[location] = (counts[location] || 0) + 1;
    });

    return Object.entries(counts)
      .filter(([_, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1]);
  }, [complaints]);
  const alerts = hotspots
  .filter(([_, count]) => count >= 3)
  .map(([location, count]) => ({
    location,
    message: `Multiple complaints detected in ${location}. Immediate attention recommended.`,
    count,
  }));
const categoryData = Object.entries(
  complaints.reduce((acc, complaint) => {
    const category = complaint.category || "Others";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {})
).map(([name, value]) => ({ name, value }));

const statusData = Object.entries(
  complaints.reduce((acc, complaint) => {
    const status = complaint.status || "Pending";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {})
).map(([name, value]) => ({ name, value }));

const COLORS = [
  "#00C49F",
  "#FF8042",
  "#0088FE",
  "#FFBB28",
  "#FF4444",
];
const handleGenerateMPPlan = async () => {
  try {
    setLoadingPlan(true);

    const plan = await generateMPActionPlan(
      complaints
    );

    setMpPlan(plan);
  } catch (error) {
    console.log(error);

    setMpPlan(
      "⚠️ Unable to generate MP Action Plan."
    );
  } finally {
    setLoadingPlan(false);
  }
};
// AI Summary
  const handleGenerateSummary = async () => {
    
    try {
      setLoadingSummary(true);

      const report =
        await generateAdminSummary(complaints);

      setSummary(report);
    } catch (error) {
      console.log(error);

      if (error.message?.includes("503")) {
        setSummary(
          "⚠️ AI servers are currently busy. Please try again in a few moments."
        );
      } else {
        setSummary(
          "⚠️ Unable to generate AI report at the moment."
        );
      }
    } finally {
      setLoadingSummary(false);
    }
  };

  const cardStyle = {
    background: "#1a1f38",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
  };

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        backgroundColor: "#0b1020",
        color: "white",
      }}
    >
      {/* Title */}
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "50px",
        }}
      >
        📊 Admin Dashboard
      </h1>

      {/* Hotspots */}
      {hotspots.length > 0 && (
        <div
          style={{
            background: "#1a1f38",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "30px",
            border: "1px solid red",
          }}
        >
          <h2
            style={{
              color: "#ff4d4d",
              marginBottom: "15px",
            }}
          >
            🔥 Civic Hotspots
          </h2>

          {hotspots.map(([location, count]) => (
            <p key={location} style={{ fontSize: "18px" }}>
              📍 {location} — {count} complaints
            </p>
          ))}
        </div>
      )}
      {alerts.length > 0 && (
  <div
    style={{
      background: "#3b0000",
      border: "2px solid #ff4444",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "30px",
    }}
  >
    <h2
      style={{
        color: "#ff4d4d",
        marginBottom: "15px",
      }}
    >
      
          
            🚨 Civic Alerts
          </h2>

          {alerts.map((alert, index) => (
            <div key={index}>
              <p style={{ fontSize: "20px" }}>
                <strong>{alert.location}</strong>
              </p>

              <p style={{ fontSize: "18px" }}>
                {alert.message}
              </p>

              <hr style={{ marginTop: "10px" }} />
            </div>
          ))}
        </div>
      )}
      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Complaints</h3>
          <h1>{totalComplaints}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Pending</h3>
          <h1>{pendingComplaints}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Critical</h3>
          <h1>{criticalComplaints}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Resolved</h3>
          <h1>{resolvedComplaints}</h1>
        </div>
      </div>
{/* Charts */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
    marginBottom: "40px",
  }}
>
  {/* Category Chart */}
  <div
    style={{
      background: "#1a1f38",
      padding: "20px",
      borderRadius: "12px",
    }}
  >
    <h2
      style={{
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      Complaints by Category
    </h2>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={categoryData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#38bdf8" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* Status Chart */}
  <div
    style={{
      background: "#1a1f38",
      padding: "20px",
      borderRadius: "12px",
    }}
  >
    <h2
      style={{
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      Complaint Status Distribution
    </h2>

    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={statusData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {statusData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>
     {/* Complaint Map */}
<div
  style={{
    background: "#1a1f38",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "40px",
  }}
>
  <h2
    style={{
      textAlign: "center",
      marginBottom: "20px",
      color: "white",
    }}
  >
    🗺️ Civic Complaint Map
  </h2>

  <ComplaintMap complaints={complaints} />
</div>
      {/* AI Summary */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >

        <button
          onClick={handleGenerateSummary}
          style={{
            padding: "12px 25px",
            borderRadius: "10px",
            border: "none",
            background: "#2563eb",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {loadingSummary
            ? "Generating Report..."
            : "🤖 Generate Daily Civic Report"}
        </button>
        <button
  onClick={handleGenerateMPPlan}
  style={{
    padding: "12px 25px",
    borderRadius: "10px",
    border: "none",
    background: "#7c3aed",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    marginLeft: "15px",
  }}
>
  {loadingPlan
    ? "Generating MP Plan..."
    : "🏛 Generate Constituency Development Plan"}
</button>
      </div>

      {summary && (
  <div
    style={{
      background: "#1a1f38",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "30px",
      whiteSpace: "pre-wrap",
    }}
  >
    <h2 style={{ color: "#38bdf8" }}>
      AI Civic Report
    </h2>

    <p>{summary}</p>
  </div>
)}

{mpPlan && (
  <div
    style={{
      background: "#1a1f38",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "30px",
      whiteSpace: "pre-wrap",
    }}
  >
    <h2 style={{ color: "#a855f7" }}>
      🏛 AI-Powered Constituency Development Plan
    </h2>

    <p>{mpPlan}</p>
  </div>
)}
      {/* Complaint List */}
      {complaints.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>
          No complaints found
        </h2>
      ) : (
        complaints.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid gray",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
              backgroundColor: "#1a1f38",
            }}
          >
            <h2
              style={{
                fontSize: "28px",
                marginBottom: "15px",
                color: "#38bdf8",
              }}
            >
              {item.title}
            </h2>

            <p>
              <b>Category:</b> {item.category}
            </p>

            <p>
              <b>Description:</b> {item.description}
            </p>

            <p>
              <b>Location:</b> {item.location}
            </p>

            <p>
              <b>Status:</b> {item.status}
            </p>

            <p>
              <b>Name:</b> {item.name}
            </p>

            <p>
  <b>Priority:</b>{" "}
  {item.priority ||
    item.aiAnalysis?.match(/Priority:\s*(HIGH|MEDIUM|LOW|CRITICAL)/i)?.[1] ||
    "MEDIUM"}
</p>
{item.imageName && item.imageName !== "" && (
  <p>
    <b>Evidence File:</b> 📷 {item.imageName}
  </p>
)}
            <div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "15px",
    flexWrap: "wrap",
  }}
>
  <button
    onClick={() =>
      handleStatusUpdate(item.id, "In Progress")
    }
    style={{
      padding: "10px 15px",
      border: "none",
      borderRadius: "8px",
      background: "#f59e0b",
      color: "white",
      cursor: "pointer",
    }}
  >
    🟡 In Progress
  </button>

  <button
    onClick={() =>
      handleStatusUpdate(item.id, "Resolved")
    }
    style={{
      padding: "10px 15px",
      border: "none",
      borderRadius: "8px",
      background: "#10b981",
      color: "white",
      cursor: "pointer",
    }}
  >
    ✅ Resolve
  </button>

  <button
    onClick={() =>
      handleStatusUpdate(item.id, "Critical")
    }
    style={{
      padding: "10px 15px",
      border: "none",
      borderRadius: "8px",
      background: "#ef4444",
      color: "white",
      cursor: "pointer",
    }}
  >
    🔴 Critical
  </button>
</div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;
