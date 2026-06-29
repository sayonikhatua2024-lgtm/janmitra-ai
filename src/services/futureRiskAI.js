import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export const generateFutureRiskPrediction =
  async (complaints) => {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const complaintSummary = complaints
        .map(
          (c) =>
            `Category: ${c.category}
Location: ${c.location}
Priority: ${c.priority}
Description: ${c.description}`
        )
        .join("\n\n");

      const prompt = `
You are an expert AI governance advisor specializing in constituency development, civic planning, disaster preparedness, and public policy.

Analyze the following citizen complaints and predict future civic risks if these issues remain unresolved.

Your job is to help elected representatives and government officials proactively prevent crises.

Instructions:

1. Identify only the TOP 3 most important future risks.
2. Focus on realistic governance risks such as:
   - Flooding
   - Water crisis
   - Public health emergencies
   - Infrastructure collapse
   - Traffic accidents
   - Citizen unrest
   - Waste management crisis
3. Keep the response concise and practical.
4. Do NOT use markdown symbols such as **, ##, or *.
5. Keep the total response under 250 words.
6. Use plain text only.

Return the response in EXACTLY this format:

🔮 FUTURE RISK PREDICTION

🚨 HIGH RISK

Risk Name:
Affected Location:
Probability: High
Impact:

⚠️ MEDIUM RISK

Risk Name:
Affected Location:
Probability: Medium
Impact:

⚡ LOW RISK

Risk Name:
Affected Location:
Probability: Low
Impact:

🛡️ RECOMMENDED PREVENTIVE ACTIONS

1.
2.
3.

Important:
The recommendations must be specific, actionable, and suitable for municipal authorities, MPs, MLAs, and local government bodies.

Citizen Complaints:

${complaintSummary}
`;

      const result =
        await model.generateContent(prompt);

      return result.response.text();
    } catch (error) {
      console.error(error);
      return "Unable to generate future risk prediction.";
    }
  };