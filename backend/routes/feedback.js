import express from "express";
import * as feedbackController from "../controllers/feedback";

export const router = express.Router();

router.get("/", feedbackController.getFeedback);

router.post("/", feedbackController.createFeedback);

router.patch("/", feedbackController.updateFeedback);

router.delete("/", feedbackController.deleteFeedback);
