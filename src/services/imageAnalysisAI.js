import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export const analyzeComplaintImage = async (
  imageBase64
) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const prompt = `
You are an Indian civic governance AI.

Analyze this complaint image.

Return:

Detected Issue:
Severity:
Urgency:
Recommended Government Action:
Estimated Citizen Impact:

Keep answer concise.
`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64
        }
      }
    ]);

    return result.response.text();

  } catch (error) {
    console.log(error);
    return "Unable to analyze image.";
  }
};