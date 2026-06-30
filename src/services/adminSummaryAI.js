import { askGemini } from "./geminiService";

export const generateAdminSummary = async (complaints) => {

  const complaintText = complaints
    .map(
      (c) => `
Title: ${c.title}
Category: ${c.category}
Location: ${c.location}
Description: ${c.description}
`
    )
    .join("\n");

  const prompt = `
You are an AI governance assistant.

Analyze the following citizen complaints and generate a civic report.

Provide:

1. Total complaint categories.
2. Most affected locations.
3. Most urgent issues.
4. Recommended actions for authorities.

Keep it concise and official.

Complaints:

${complaintText}
`;

  return await askGemini(prompt);
};