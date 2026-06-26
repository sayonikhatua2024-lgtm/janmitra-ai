import { askGemini } from "./geminiService";

export const analyzeComplaintPriority = async (complaint) => {

  const prompt = `
You are an AI system used by the Government of India.

Classify the complaint into exactly ONE category:

LOW
MEDIUM
HIGH
CRITICAL

Guidelines:

LOW:
- Minor inconvenience
- Street light issue
- Garbage not collected

MEDIUM:
- Water supply issue
- Moderate road damage
- Public inconvenience

HIGH:
- Large potholes causing accidents
- Major road damage
- Severe infrastructure issues

CRITICAL:
- Bridge collapse
- Floods
- Fire
- Medical emergencies
- Situations involving risk to human life
- People trapped or injured

Complaint:
${complaint}

Return ONLY one word:
LOW, MEDIUM, HIGH, or CRITICAL.
`;

  const response = await askGemini(prompt);
  return response.trim();
};