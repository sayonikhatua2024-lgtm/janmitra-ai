import React, { useEffect, useState } from "react";
import { getAllComplaints } from "./services/firestoreService";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const loadComplaints = async () => {
      const data = await getAllComplaints();

      console.log("Complaints fetched:", data);

      setComplaints(data);
    };

    loadComplaints();
  }, []);

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        backgroundColor: "#0b1020",
        color: "white",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "50px",
        }}
      >
        📊 Admin Dashboard
      </h1>

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
            <h2>{item.title}</h2>

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
              <b>Priority:</b> {item.priority || "Not Assigned"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;