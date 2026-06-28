import React, { useState } from "react";
import { askGemini } from "./services/geminiService";

function ChatPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    const prompt = `
You are JanMitra AI, an intelligent civic assistant for Indian citizens.

Answer questions related to:

- Government departments
- Public grievances
- Roads, water, sanitation
- Government schemes
- Emergency assistance
- Public services
- Local administration
- Citizen complaints

Provide:
1. Relevant department.
2. Practical steps citizens should take.
3. Emergency numbers if applicable.

Keep answers short, practical and citizen-friendly.

Only reject questions that are clearly unrelated such as movies, songs, celebrities or entertainment.

If the question is unrelated, reply:
"JanMitra AI specializes in civic and government assistance."

Citizen Question:
${question}
`;

    try {
      const response = await askGemini(prompt);
      setAnswer(response);
      setQuestion("");
    } catch (error) {
      console.error(error);
      setAnswer(
        "Unable to connect to JanMitra AI. Please try again later."
      );
    }

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

      <p style={{ color: "#555", marginBottom: "20px" }}>
        Examples:
        <br />
        • Which department handles road complaints?
        <br />
        • What should I do during flooding?
        <br />
        • How can I report garbage issues?
      </p>

      <textarea
        rows="5"
        placeholder="Ask about complaints, roads, water, schemes or emergencies..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleAsk();
          }
        }}
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

      <button
        onClick={handleAsk}
        disabled={loading}
        style={{
          padding: "12px 30px",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "#2563eb",
          color: "white",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "20px",
          opacity: loading ? 0.6 : 1
        }}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {loading && (
        <div
          style={{
            marginTop: "20px",
            color: "#2563eb"
          }}
        >
          🤖 Thinking...
        </div>
      )}

      {answer && (
        <div
          style={{
            background: "#1e293b",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "30px",
            maxHeight: "400px",
            overflowY: "auto"
          }}
        >
          <h3 style={{ color: "#38bdf8" }}>
            Response:
          </h3>

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