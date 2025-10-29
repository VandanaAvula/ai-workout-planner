// src/api/aiService.js
import axios from "axios";



// 1. CHANGE: Use the Gemini API Key environment variable
const GEMINI_API_KEY = import.meta.env.VITE_OPENAI_KEY;

// 2. CHANGE: Define the Gemini REST API endpoint
// We will use gemini-2.5-flash as an efficient model for this task
const GEMINI_API_URL = 
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export const generateWorkoutPlan = async (goal) => {
  const prompt = `Create a 1-day workout plan for a person whose goal is ${goal} in just 2 sentences`;

  try {
    const response = await axios.post(
      GEMINI_API_URL, // 3. CHANGE: Use the new Gemini API endpoint
      {
        // 4. CHANGE: Use the Gemini request body structure: 'contents'
        contents: [
          { 
            role: "user", 
            parts: [{ text: prompt }] 
          }
        ],
        // Optional: Add configuration here if needed, e.g., temperature
        // generationConfig: {
        //   temperature: 0.7,
        //   maxOutputTokens: 2048,
        // },
      },
      {
        headers: {
          // 5. CHANGE: Gemini uses 'x-goog-api-key' header
          "x-goog-api-key": GEMINI_API_KEY, 
          "Content-Type": "application/json",
        },
      }
    );

    // 6. CHANGE: Update how the final response text is extracted
    // The response structure is nested differently in the Gemini API
    return response.data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    // 7. CHANGE: Update the error handling for the new API
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === 400 && (data?.error?.message?.includes('API key') || data?.error?.message?.includes('INVALID_ARGUMENT'))) {
         console.error("Invalid or missing API key or bad request:", data);
         return "🚫 Invalid Gemini API key or bad request. Please check your .env file and console logs.";
      } else if (status === 429) {
        console.warn("Rate limit hit. Please wait a few seconds before retrying.");
        return "⚠️ Too many requests — please wait a few seconds and try again.";
      } else {
        console.error("Gemini API error:", status, data);
        return "❌ Error from Gemini API. Try again later.";
      }
    } else if (error.request) {
      console.error("No response received from Gemini:", error.request);
      return "🌐 Network issue — check your internet connection.";
    } else {
      console.error("Error setting up request:", error.message);
      return "⚙️ Something went wrong — please try again.";
    }
  }
};
