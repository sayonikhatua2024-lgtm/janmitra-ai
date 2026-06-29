import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateMPActionPlan = async (complaints) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const complaintSummary = complaints
      .map(
        (c) =>
          `Category: ${c.category},
           Location: ${c.location},
           Priority: ${c.priority},
           Status: ${c.status},
           Description: ${c.description}`
      )
      .join("\n\n");

    const prompt = `
You are an AI advisor for Members of Parliament in India.

Analyze these citizen complaints and create a constituency development plan.

Return the response in plain text.

Do not use markdown symbols like **, ##, or *.

Begin with a one-line executive summary.

Use this exact format:

OVERALL CONSTITUENCY INSIGHT:
<One sentence summarizing the constituency's current development condition>

CONSTITUENCY DEVELOPMENT PLAN

1. Recurring Issues:
- ...

2. Hotspot Locations:
- ...

3. Recommended Development Works:
- ...

4. Suggested Fund Allocation:
- ...

5. Priority Ranking:

Immediate (0-1 month):
- ...

Short Term (1-3 months):
- ...

Long Term (3-12 months):
- ...

Citizen Complaints:

${complaintSummary}
`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error(error);
    return "Unable to generate MP Action Plan.";
  }
};