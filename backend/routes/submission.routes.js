const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
        submitCode, getSubmissions, getSubmissionById, deleteSubmissionById
    } = require("../controllers/submission.controller");

const router = express.Router();

router.post("/submission", authMiddleware, submitCode);
router.get("/submission", authMiddleware, getSubmissions);
router.get("/submission/:id", authMiddleware, getSubmissionById);
router.delete("/submission/:id", authMiddleware, deleteSubmissionById);

module.exports = router;
