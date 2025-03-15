import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;// Use environment variable for security
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;


export const getGeminiResponse = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: "Code input is required" });

    const response = await axios.post(API_URL, { contents: [{ parts: [{ text: `Please review the following code and provide: 1. Feedback on code quality. 2. Static analysis results (e.g., potential issues, bugs). 3. A grade from 1 to 10 based on code quality. 4. Plagiarism check score (0-100). 5. Suggestions for code improvement. 6. Time complexity (Big O notation). 7. Security issues (if any). Code:\n\n${code}` }] }] });


    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    res.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to get response",
      details: error.response?.data || error.message
    });
  }
};
