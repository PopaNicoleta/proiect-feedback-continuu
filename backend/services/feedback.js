import { Feedback } from "../models/config.js";
import { Op } from "sequelize";
import { getActivities } from "./activity.js";

const createFeedbacks = async (feedbacks) => {
    const activityId = feedbacks[0].activity_id;

    const activities = await getActivities({ id: activityId });

    if (activities.length === 0) return {notValid: true, inexistentActivity: true};

    const activity = activities[0];
    const activityStartTime = new Date(activity.start_time); 
    const activityEndTime = new Date(activity.end_time);

    const validFeedbacks = feedbacks.filter(feedback => {
        const feedbackTimestamp = new Date(feedback.timestamp);
        return feedbackTimestamp >= activityStartTime && feedbackTimestamp <= activityEndTime;
    });

    if (validFeedbacks.length === 0) return {notValid: true};

    validFeedbacks.forEach(feedback => {
        delete feedback.id;
    });

    return await Feedback.bulkCreate(validFeedbacks);
};

const getFeedback = async (filters) => {
    const feedbackKeys = Object.keys(Feedback.getAttributes());

    const filterConditions = {};

    if (filters.activityId) {
        filterConditions.activity_id = filters.activityId;
    }

    if(filters.timestamp) {
        filterConditions.timestamp = { [Op.gt]: new Date(filters.timestamp) };
    }

    if (filters.emoji) {
        if (Array.isArray(filters.emoji)) {
            filterConditions.emoji = { [Op.in]: filters.emoji };
        } else {
            filterConditions.emoji = filters.emoji;
        }
    }

    return await Feedback.findAll({ where: filterConditions });
};

const getFeedbackById = async (feedbackId) => {
    return await Feedback.findByPk(feedbackId);
};

const updateFeedback = async (feedback) => {
    const identifiedFeedback = await getFeedbackById(feedback.id);
    if (!!identifiedFeedback) {
        const { id, ...updatedData } = feedback;
        identifiedFeedback.set(updatedData);
        return await identifiedFeedback.save();
    }
    return null;
};

const deleteFeedback = async (feedbackId) => {
    return await Feedback.destroy({ where: { id: feedbackId } });
};

export {
    createFeedbacks,
    getFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback
};