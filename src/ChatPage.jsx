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
        color: "white"
      }}
    >

      <h1>🤖 JanMitra AI Assistant</h1>

      <textarea
        rows="5"
        placeholder="Ask your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "10px"
        }}
      />

      <br /><br />

      <button
        onClick={handleAsk}
        style={{
          padding: "10px 20px",
          borderRadius: "10px",
          cursor: "pointer"
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
            padding: "20px",
            borderRadius: "10px"
          }}
        >
          <h3>Response:</h3>
          <p>{answer}</p>
        </div>
      )}

    </div>
  );
}

export default ChatPage;