import React, { useState } from "react";
import { askGemini } from "./services/geminiService";

function ChatPage() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {

    if (!question.trim()) return;

    setLoading(true);

    const response = await askGemini(question);

    setAnswer(response);

    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        padding: "20px",
        color: "black",
        background: "white",
        borderRadius: "12px"
  }}
>

     <h1 style={{ color: "black" }}>
  🤖 JanMitra AI Assistant
</h1>
            <textarea
        rows="5"
        placeholder="Ask your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "10px",
          border: "2px solid #2563eb",
          backgroundColor: "white",
          color: "black",
          fontSize: "16px",
          marginTop: "20px",
          marginBottom: "20px"
        }}
/>
  

      <br /><br />

      <button
        onClick={handleAsk}
        style={{
          padding: "12px 30px",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "#2563eb",
          color: "white",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "20px"
        }}
>
  Ask AI
</button>

      <br /><br />

      {loading && <p>Generating response...</p>}

      {answer && (
    <div
  style={{
    background: "#1e293b",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px"
  }}
>
   <h3 style={{ color: "#38bdf8" }}>Response:</h3>

    <div
      style={{
        whiteSpace: "pre-wrap",
        lineHeight: "1.8",
        fontSize: "16px"
      }}
    >
      {answer}
    </div>
  </div>
)}
       
        </div>
      
    );
  }
export default ChatPage;