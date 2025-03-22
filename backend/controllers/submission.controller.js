const { Submission } = require("../models/submission.models");
const { User } = require("../models/user.models");
const { getAIReview } = require("./ai.controller");
const { exec } = require("child_process"); // Add this to execute code

const submitCode = async (req, res) => {
    try {
        const { title, description, language, code } = req.body;

        if (!title || !language || !code) {
            return res.status(400).json({ message: "Title, language, and code are required." });
        }

        const newSubmission = new Submission({
            author: req.user.userId,
            title,
            description,
            language,
            code,
            processingStatus: "in review"
        });

        const savedSubmission = await newSubmission.save();

        await User.findByIdAndUpdate(req.user.userId, {
            $push: { submissionHistory: savedSubmission._id }
        });

        try {
            console.log("Automatically starting AI review and code execution for submission:", savedSubmission._id);

            // Execute the code and capture the output
            const output = await executeCode(language, code);
            savedSubmission.output = output;

            // Perform AI review
            const aiResponse = await getAIReview(code, language);

            savedSubmission.processingStatus = "completed";
            savedSubmission.feedback = {
                aiReview: aiResponse.feedback,
                staticAnalysisResults: aiResponse.staticAnalysis,
                grade: aiResponse.grade,
            };
            savedSubmission.autoFixCode = aiResponse.autoFixCode;
            savedSubmission.complexity = {
                time: aiResponse.timeComplexity,
                space: aiResponse.spaceComplexity
            };
            savedSubmission.securityReview = aiResponse.securityIssues;

            await savedSubmission.save();

            console.log("AI review and code execution completed successfully");
        } catch (error) {
            console.error("Error in automatic AI review or code execution:", error);
            savedSubmission.processingStatus = "pending";
            await savedSubmission.save();
        }

        res.status(201).json({ message: "Submission created successfully!", submission: savedSubmission });
    } catch (error) {
        res.status(500).json({ message: "Error submitting code", error: error.message });
    }
};

// Helper function to execute code
const executeCode = (language, code) => {
    return new Promise((resolve, reject) => {
        let command;

        // Define the command based on the language
        switch (language) {
            case "JavaScript":
                command = `node -e "${code.replace(/"/g, '\\"')}"`;
                break;
            case "Python":
                command = `python -c "${code.replace(/"/g, '\\"')}"`;
                break;
            case "Java":
                // Add Java execution logic here
                break;
            case "C++":
                // Add C++ execution logic here
                break;
            default:
                return reject(new Error("Unsupported language"));
        }

        exec(command, (error, stdout, stderr) => {
            if (error) {
                return reject(new Error(stderr || "Error executing code"));
            }
            resolve(stdout.trim());
        });
    });
};

const getSubmissions = async (req, res) => {
    try {
        const { language, status, minGrade, maxGrade, userId } = req.query;
        let filter = {};

        if (language) filter.language = language;
        if (status) filter.processingStatus = status;
        if (userId) filter.author = userId;
        if (minGrade || maxGrade) {
            filter["feedback.grade"] = {};
            if (minGrade) filter["feedback.grade"].$gte = parseInt(minGrade);
            if (maxGrade) filter["feedback.grade"].$lte = parseInt(maxGrade);
        }

        const submissions = await Submission.find(filter).populate("author", "username email");
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching submissions", error: error.message });
    }
};

const getSubmissionById = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id).populate("author", "username email");
        if (!submission) {
            return res.status(404).json({ message: "Submission not found." });
        }
        res.status(200).json(submission);
    } catch (error) {
        res.status(500).json({ message: "Error fetching submission", error: error.message });
    }
};

const deleteSubmissionById = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id);
        if (!submission) {
            return res.status(404).json({ message: "Submission not found." });
        }

        if (submission.author.toString() !== req.user.userId) {
            return res.status(403).json({ message: "You are not authorized to delete this submission." });
        }

        await Submission.deleteOne({ _id: req.params.id });
        
        res.status(200).json({ message: "Submission deleted successfully!", id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: "Error deleting submission", error: error.message });
    }
}

module.exports = { submitCode, getSubmissions, getSubmissionById, deleteSubmissionById };
