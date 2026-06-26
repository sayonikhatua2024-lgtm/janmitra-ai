import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export const summarizeComplaint = async (complaint) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
  Summarize this complaint in 2-3 lines:

  ${complaint}
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
};