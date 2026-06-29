import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export const generateBudgetAllocation = async (
  complaints
) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const complaintSummary = complaints
      .map(
        (c) =>
          `Category: ${c.category}
Location: ${c.location}
Priority: ${c.priority}`
      )
      .join("\n");

    const prompt = `
You are an expert constituency development planner and public policy advisor.

Analyze the citizen complaints and recommend how an MP/MLA should allocate a development budget of ₹5 Crore.

Instructions:

- Allocate funds based on complaint frequency, severity, and urgency.
- Prioritize critical public infrastructure.
- Keep response under 200 words.
- Do not use markdown symbols such as ** or *.
- Return plain text only.

Use EXACT format:

💰 RECOMMENDED BUDGET ALLOCATION

🛣 Road Infrastructure
Amount:
Percentage:
Reason:

💧 Water Supply
Amount:
Percentage:
Reason:

🗑 Waste Management
Amount:
Percentage:
Reason:

🏥 Health Infrastructure
Amount:
Percentage:
Reason:

📌 OVERALL RECOMMENDATION

Provide one concise recommendation.

Citizen Complaints:

${complaintSummary}
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.log(error);

    return "Unable to generate budget allocation.";
  }
};