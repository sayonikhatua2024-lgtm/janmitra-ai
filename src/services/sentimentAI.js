import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export const generateSentimentAnalysis =
  async (complaints) => {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const complaintSummary = complaints
        .map(
          (c) =>
            `Description: ${c.description}
Priority: ${c.priority}`
        )
        .join("\n");

      const prompt = `
You are a civic sentiment analyst.

Analyze citizen complaints and determine overall citizen sentiment.

Return plain text only.

Keep response under 150 words.

Use EXACT format:

😊 CITIZEN SENTIMENT INDEX

😡 Negative:
Percentage:

😐 Neutral:
Percentage:

😊 Positive:
Percentage:

Overall Mood:

Key Reasons:

Citizen Complaints:

${complaintSummary}
`;

      const result =
        await model.generateContent(prompt);

      return result.response.text();
    } catch (error) {
      console.log(error);

      return "Unable to analyze sentiment.";
    }
  };