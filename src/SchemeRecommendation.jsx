import React, { useState } from "react";
import { askGemini } from "./services/geminiService";

function SchemeRecommendation() {

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");
  const [income, setIncome] = useState("");
  const [state, setState] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const findSchemes = async () => {

    setLoading(true);

    const prompt = `
Suggest Indian government schemes for:

Age: ${age}
Gender: ${gender}
Occupation: ${occupation}
Monthly Income: ${income}
State: ${state}

Provide:
1. Scheme name
2. Benefits
3. Eligibility
`;

    const response = await askGemini(prompt);

    setResult(response);
    setLoading(false);
  };

  return (
    <div style={{
      maxWidth: "700px",
      margin: "50px auto",
      color: "white"
    }}>

      <h1>🎁 Government Scheme Finder</h1>

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      /><br /><br />

      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select><br /><br />

      <input
        type="text"
        placeholder="Occupation"
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
      /><br /><br />

      <input
        type="number"
        placeholder="Monthly Income"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
      /><br /><br />

      <input
        type="text"
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
      /><br /><br />

      <button onClick={findSchemes}>
        Find Schemes
      </button>

      <br /><br />

      {loading && <p>Searching schemes...</p>}

      {result && (
        <div style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "10px"
        }}>
          <h3>Recommended Schemes</h3>
          <p>{result}</p>
        </div>
      )}

    </div>
  );
}

export default SchemeRecommendation;