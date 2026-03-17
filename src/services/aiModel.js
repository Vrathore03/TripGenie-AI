import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

// System prompt to guide AI response format
const SYSTEM_PROMPT = `You are a travel planning assistant. Generate travel plans in strict JSON format.

Required JSON structure:
{
  "tripNote": "Brief overview of the trip",
  "hotelsOptions": [
    {
      "hotelName": "string",
      "hotelAddress": "string", 
      "priceRange": "string",
      "imageUrl": "string",
      "rating": number,
      "description": "string",
      "coordinate": { "latitude": number, "longitude": number }
    }
  ],
  "itinerary": [
    {
      "dayNumber": number,
      "theme": "string",
      "activities": [
        {
          "activityName": "string",
          "description": "string",
          "imageUrl": "string",
          "ticketPrice": "string",
          "timeRange": "string",
          "timeToTravel": "string",
          "coordinate": { "latitude": number, "longitude": number }
        }
      ]
    }
  ]
}`;

const chat = ai.chats.create({
  model: "gemini-2.5-flash",
  history: [
    {
      role: "user",
      parts: [{ text: SYSTEM_PROMPT }],
    },
    {
      role: "model",
      parts: [{ text: "I understand. I will generate travel plans in the exact JSON format specified." }],
    },
  ],
});

/**
 * Generate a trip plan using AI
 * @param {string} dynamicPrompt - The trip requirements prompt
 * @returns {Promise<Object>} Parsed trip data
 * @throws {Error} If generation fails
 */
export async function generateTripWithAI(dynamicPrompt) {
  try {
    const response = await chat.sendMessage({
      message: dynamicPrompt,
    });

    const textResponse = response.text;
    
    // Clean markdown formatting if present
    const cleanJson = textResponse.replace(/```json|```/g, "").trim();
    
    return JSON.parse(cleanJson);
  } catch (error) {
    throw new Error(error.message || "Failed to generate trip plan");
  }
}


