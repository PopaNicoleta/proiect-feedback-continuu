import express from "express";
import * as feedbackController from "../controllers/feedback.js";

export const router = express.Router();

router.get("/", feedbackController.getFeedback);

router.post("/", feedbackController.createFeedbacks);

router.patch("/", feedbackController.updateFeedback);

router.delete("/", feedbackController.deleteFeedback);
