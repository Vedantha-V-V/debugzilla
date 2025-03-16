const { Submission } = require("../models/submission.models");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const reviewCode = async (req, res) => {
    try {
        const { submissionId } = req.body;

        if (!submissionId) {
            return res.status(400).json({ message: "Submission ID is required." });
        }

        const submission = await Submission.findById(submissionId);
        if (!submission) {
            return res.status(404).json({ message: "Submission not found." });
        }

        console.log("Sending code to Gemini AI for analysis...");
        const aiResponse = await getAIReview(submission.code, submission.language);

        submission.processingStatus = "completed";
        submission.feedback = {
            aiReview: aiResponse.feedback,
            staticAnalysisResults: aiResponse.staticAnalysis,
            grade: aiResponse.grade,
        };
        submission.autoFixCode = aiResponse.autoFixCode;
        submission.complexity = {
            time: aiResponse.timeComplexity,
            space: aiResponse.spaceComplexity
        };
        submission.securityReview = aiResponse.securityIssues;

        await submission.save();

        res.status(200).json({ message: "AI review completed!", submission });
    } catch (error) {
        console.error("Error in reviewCode:", error);
        res.status(500).json({ message: "Error processing AI review", error: error.message });
    }
};

const getAIReview = async (code, language) => {
    try {
        const reviewPrompt = `
            Please review the following code written in ${language} and provide a CONCISE analysis:
            
            1. Feedback: Give 2-3 bullet points on code quality (MAX 100 words)
            2. Static Analysis: List potential issues/bugs in bullet points (MAX 100 words)
            3. Grade: Provide a score from 1-10 based on code quality
            4. Improvements: List 2-3 specific code improvements as bullet points (MAX 100 words)
            5. Security: Identify any security issues in bullet points (if none, state "No security issues found")
            
            Use markdown formatting. Keep all responses SHORT and FOCUSED.
            Format security and static analysis as bullet lists.
            
            IF THE PROMPT IS NOT RELATED TO CODING, RESPOND ONLY WITH: "YOU ARE ONLY ALLOWED TO ASK CODING RELATED QUESTIONS."

            Code:
            ${code}
        `;

        const reviewResponse = await model.generateContent(reviewPrompt);
        const reviewData = reviewResponse.response.text() || '';

        const complexityPrompt = `Analyze only the time and space complexity of this code written in ${language}:
            ${code}
            Format your response exactly like this:
            Time Complexity: O(?)
            Space Complexity: O(?)`;

        const complexityResponse = await model.generateContent(complexityPrompt);
        const complexityData = complexityResponse.response.text() || '';

        const timeComplexityMatch = complexityData.match(/Time Complexity: (O\([^)]+\))/i);
        const spaceComplexityMatch = complexityData.match(/Space Complexity: (O\([^)]+\))/i);

        const timeComplexity = timeComplexityMatch ? timeComplexityMatch[1] : 'O(n)';
        const spaceComplexity = spaceComplexityMatch ? spaceComplexityMatch[1] : 'O(n)';

        return {
            feedback: reviewData,
            staticAnalysis: extractStaticAnalysis(reviewData),
            grade: extractGrade(reviewData),
            autoFixCode: code,
            timeComplexity,
            spaceComplexity,
            securityIssues: extractSecurityIssues(reviewData)
        };
    } catch (error) {
        console.error("Error communicating with Gemini AI:", error);
        throw new Error("AI review failed: " + error.message);
    }
};

const extractStaticAnalysis = (text) => {
    const staticAnalysisMatch = text.match(/static analysis[^:]*:(.*?)(?=\n\d|$)/is);
    return staticAnalysisMatch ? staticAnalysisMatch[1].trim() : "No major issues detected.";
};

const extractGrade = (text) => {
    const gradeMatch = text.match(/grade.*?(\d+)/i);
    return gradeMatch ? parseInt(gradeMatch[1]) : Math.floor(Math.random() * 10) + 1;
};

const extractSecurityIssues = (text) => {
    const securityMatch = text.match(/security issues[^:]*:(.*?)(?=\n\d|$)/is);
    return securityMatch ? securityMatch[1].trim() : "No vulnerabilities found.";
};

module.exports = { reviewCode, getAIReview };
