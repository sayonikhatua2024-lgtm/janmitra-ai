import { GoogleGenerativeAI }
from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export const generateSustainabilityInsight =
async (
  complaints,
  sustainabilityScore,
  carbonImpact
) => {

  try {

    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
      });

    const prompt = `
You are an Environmental Governance Expert.

Current Sustainability Score:
${sustainabilityScore}

Current Carbon Impact:
${carbonImpact}

Citizen Complaints:
${JSON.stringify(complaints)}

Generate:

1 short sustainability recommendation.

Keep under 40 words.

Focus on:
- environment
- SDGs
- resilience
- governance

`;

    const result =
      await model.generateContent(prompt);

    return result.response.text();

  } catch (error) {

    console.log(error);

    if (sustainabilityScore >= 80)
      return "Strong sustainability performance detected. Continue preventive governance and green initiatives.";

    if (sustainabilityScore >= 60)
      return "Moderate sustainability performance. Prioritize water and sanitation improvements.";

    if (sustainabilityScore >= 40)
      return "Environmental sustainability is declining. Immediate intervention is recommended.";

    return "Critical sustainability risk detected. Urgent environmental action required.";
  }
};