import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export const generateGovernanceAdvice = async (
  query,
  complaints
) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are JanMitra Governance Copilot.

Citizen complaints:
${JSON.stringify(complaints)}

Question:
${query}

Respond strictly in this format:

📉 Expected Complaint Reduction:
(percentage)

😊 Citizen Satisfaction Impact:

🏥 Public Health Impact:

🌍 SDG Goals Improved:

💰 Estimated Budget Utilization:

⚠ Potential Risks:

💡 Final Governance Recommendation:

Keep response concise, practical and policy-oriented.
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.log(error);

    return "Unable to generate governance advice.";
  }
};