import { Feedback } from "../models/config.js";
import { Op } from "sequelize";

const createFeedbacks = async (feedbacks) => {
    feedbacks.forEach(feedback => {
        delete feedback.id;
    });

    return await Feedback.bulkCreate(feedbacks);
};

const getFeedback = async (filters) => {
    const feedbackKeys = Object.keys(Feedback.getAttributes());

    const filterConditions = {};

    if (filters.activityId) {
        filterConditions.activity_id = filters.activityId;
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