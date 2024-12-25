import { Activity } from "../models/config";
import { Op } from "sequelize";

const createActivity = async (activity) => {
    delete activity.id;

    return await Activity.create(activity); 
}

const getActivities = async (filters) => {
    const activityKeys = Object.keys(Activity.getAttributes());

    const filterConditions = {};

    if (filters.professor) {
        if (Array.isArray(filters.professor)) {
            filterConditions.professor_id = { [Op.in]: filters.professor };
        } else {
            filterConditions.professor_id = filters.professor;
        }
    }

    return await Activity.findAll({where: filterConditions});
}

const getActivityById = async (activityId) => {
    return await Activity.findByPk(userId);
}

const updateActivity = async (activity) => {
    const identifiedActivity = await getActivityById(activity.id);
    if(!!identifiedActivity) {
        const {id, ...updatedData} = activity;
        identifiedActivity.set(updatedData);
        return await identifiedActivity.save();
    }
    return null;
}

const deleteActivity = async (activityId) => {
    return await Activity.destroy({where: {id: activityId}});
}

export {
    getActivities,
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity
}