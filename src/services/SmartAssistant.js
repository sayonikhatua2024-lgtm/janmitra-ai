import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { askGemini } from "./geminiService";

export const askSmartAssistant = async (question) => {
  try {
    // Fetch complaints
    const snapshot = await getDocs(collection(db, "complaints"));

    const complaints = snapshot.docs.map((doc) => doc.data());

    // Convert complaints into text
    const complaintContext = complaints
      .map(
        (c, index) =>
          `${index + 1}.
Title: ${c.title}
Category: ${c.category}
Status: ${c.status}
Location: ${c.location}
Description: ${c.description}`
      )
      .join("\n\n");

    // Prompt for Gemini
    const prompt = `
You are JanMitra AI, a smart citizen assistant for India.

You can answer:
- Civic complaints
- Government departments
- Public services
- Government schemes
- Emergency guidance

Here are complaints stored in the system:

${complaintContext}

User Question:
"${question}"

If the question relates to existing complaints, use the complaint data.

Otherwise, answer using your general civic knowledge in a practical and citizen-friendly way.
`;

    return await askGemini(prompt);

  } catch (error) {

    console.log(error);

    return "Unable to fetch complaint data.";

  }
};