import express from "express";
import { getGeminiResponse } from "../controllers/gptController.js";

const router = express.Router();

router.post("/send-code", getGeminiResponse);

export default router;
