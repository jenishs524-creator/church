
import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client using process.env.API_KEY directly as required.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDevotional = async (topic: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, encouraging Christian devotional (approx 150 words) about: "${topic}".
      Include one relevant Bible verse (NIV or NKJV).
      Format the response with the verse first in quotes, followed by the reflection.
      Tone: Warm, pastoral, uplifting, suitable for the congregation of Utsaha Jagrity Mandali based at Gokarneshwor Banquet, Kathmandu, Nepal.`,
      config: {
        systemInstruction: "You are a helpful and wise pastoral assistant for Utsaha Jagrity Mandali.",
        temperature: 0.7,
      }
    });

    return response.text || "I couldn't generate a devotional at this moment. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to connect to the scripture companion service.");
  }
};
