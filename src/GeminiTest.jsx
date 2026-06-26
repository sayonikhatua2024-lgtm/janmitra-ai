import React, { useState } from "react";
import { askGemini } from "./services/geminiService";

function GeminiTest() {
  const [answer, setAnswer] = useState("");

  const testGemini = async () => {
    const response = await askGemini(
      "How to apply for ration card in Odisha?"
    );

    setAnswer(response);
  };

  return (
    <div>
      <button onClick={testGemini}>
        Test Gemini
      </button>

      <p>{answer}</p>
    </div>
  );
}

export default GeminiTest;