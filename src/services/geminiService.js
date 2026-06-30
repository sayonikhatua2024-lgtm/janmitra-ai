import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const askGemini = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);

    const response = await result.response;

    return response.text();

  } catch (error) {

    console.error("Gemini Error:", error);

    // Retry once after 3 seconds
    try {

      console.log("Retrying Gemini request...");

      await new Promise(resolve =>
        setTimeout(resolve, 3000)
      );

      const retryResult =
        await model.generateContent(prompt);

      const retryResponse =
        await retryResult.response;

      return retryResponse.text();

    } catch (retryError) {

      console.error(
        "Retry failed:",
        retryError
      );

      return `
AI servers are currently busy.

Priority: MEDIUM

Recommended Citizen Actions:

✔ Register complaint immediately.
✔ Upload photo evidence.
✔ Save complaint ID for tracking.
✔ Contact department if unresolved.

Please try again after a few seconds.
`;
    }
  }
};