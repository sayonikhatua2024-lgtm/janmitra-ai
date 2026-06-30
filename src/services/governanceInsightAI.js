import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export const generateInsight = async (
  type,
  complaints,
  additionalData = {}
) => {
  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are JanMitra Governance AI.

Insight Type:
${type}

Complaints:
${JSON.stringify(complaints)}

Additional Analytics:
${JSON.stringify(additionalData)}

Generate a concise recommendation (max 50 words).

Focus on practical governance actions.
`;

    const result =
      await model.generateContent(prompt);

    return result.response.text();

  } catch (error) {

    console.log(error);

    return "AI insight temporarily unavailable. Continue proactive governance and resolve high-priority complaints.";
  }
};