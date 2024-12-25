import express from "express";
import * as activityController from "../controllers/activity";

export const router = express.Router();

router.get("/", activityController.getActivities);

router.post("/", activityController.createActivity);

router.patch("/", activityController.updateActivity);

router.delete("/", activityController.deleteActivity);