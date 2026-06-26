import React, { useState } from "react";
import { summarizeComplaint }
from "./services/summaryAI";

function ComplaintSummaryTest() {

  const [complaint, setComplaint] = useState("");
  const [summary, setSummary] = useState("");

  const handleSummary = async () => {

    const result =
      await summarizeComplaint(complaint);

    setSummary(result);
  };

  return (
    <div style={{
      maxWidth: "700px",
      margin: "50px auto",
      color: "white"
    }}>

      <h1>📝 AI Complaint Summarizer</h1>

      <textarea
        rows="6"
        placeholder="Enter complaint"
        value={complaint}
        onChange={(e)=>setComplaint(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSummary}>
        Generate Summary
      </button>

      <br /><br />

      {summary && (
        <div>
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}

    </div>
  );
}

export default ComplaintSummaryTest;