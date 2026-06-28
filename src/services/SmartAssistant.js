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
You are JanMitra AI, a smart citizen assistant.

Here are the complaints stored in the system:

${complaintContext}

Now answer this user's question:

"${question}"

Answer politely and only using the information above.
If the answer isn't available, clearly say so.
`;

    return await askGemini(prompt);

  } catch (error) {

    console.log(error);

    return "Unable to fetch complaint data.";

  }
};