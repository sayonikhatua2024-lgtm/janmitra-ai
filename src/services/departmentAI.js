import { askGemini } from "./geminiService";

export const getDepartmentSuggestion = async (complaint) => {

  const prompt = `
You are an expert civic grievance assistant for India.

Analyze the complaint and provide the response exactly in this format:

Category: <issue category>

Department: <responsible department>

Priority: <Low/Medium/High/Critical>

Suggested Action: <specific action citizens or authorities should take>

Complaint:
${complaint}
`;

  return await askGemini(prompt);
};