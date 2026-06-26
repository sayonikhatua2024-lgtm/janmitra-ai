import React, { useState } from "react";
import { analyzeComplaintPriority }
from "./services/complaintAI";

function ComplaintPriorityTest() {

  const [complaint, setComplaint] = useState("");
  const [priority, setPriority] = useState("");

  const handleAnalyze = async () => {

    if (!complaint) return;

    const result =
      await analyzeComplaintPriority(complaint);

    setPriority(result);
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "50px auto",
        color: "white"
      }}
    >

      <h1>🚨 AI Complaint Prioritizer</h1>

      <textarea
        rows="6"
        placeholder="Describe the complaint..."
        value={complaint}
        onChange={(e) => setComplaint(e.target.value)}
        style={{
          width: "100%",
          padding: "10px"
        }}
      />

      <br /><br />

      <button onClick={handleAnalyze}>
        Analyze Priority
      </button>

      <br /><br />

      {priority && (
        <div>
          <h2>Priority Level:</h2>
          <h1>{priority}</h1>
        </div>
      )}

    </div>
  );
}

export default ComplaintPriorityTest;