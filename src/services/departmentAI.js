import { askGemini } from "./geminiService";

export const getDepartmentSuggestion = async (complaint) => {

  const prompt = `
You are an expert civic grievance assistant for India.

The complaint may be written in English, Hindi, Odia, Bengali, or any Indian language.

You must understand the complaint irrespective of language and analyze it correctly.

Always provide the response in English.

Provide the response exactly in this format:

Category: <issue category>

Department: <responsible department>

Priority: <Low/Medium/High/Critical>

Suggested Action: <specific action citizens or authorities should take>

Complaint:
${complaint}
`;

  return await askGemini(prompt);
};