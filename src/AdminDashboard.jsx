import React, { useEffect, useMemo, useState } from "react";
import { getAllComplaints } from "./services/firestoreService";
import { generateAdminSummary } from "./services/adminSummaryAI";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  // Load complaints
  useEffect(() => {
    const loadComplaints = async () => {
      const data = await getAllComplaints();

      console.log("Complaints fetched:", data);

      setComplaints(data);
    };

    loadComplaints();
  }, []);

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
              {item.priority || "Not Assigned"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;