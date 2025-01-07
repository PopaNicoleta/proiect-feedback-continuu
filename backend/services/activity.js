import { Activity } from "../models/config.js";
import { Op } from "sequelize";
import { getUsers } from "./user.js";

const createActivities = async (activities) => {
    activities.forEach(activity => {
        delete activity.id;
    });

    //lasam doar activitatile care au start time < end time
    activities.filter((activity) => {
        const startTime = new Date(activity.start_time);
        const endTime = new Date(activity.end_time);
        return startTime <= endTime;
    });

    if(activities.length === 0) {
        return {fail: true};
    }

    return await Activity.bulkCreate(activities);
}

const getActivities = async (filters) => {
    const activityKeys = Object.keys(Activity.getAttributes());

    const filterConditions = {};

    if(filters.id) {
        filterConditions.id = filters.id;
    }

    if (filters.email) {
        const users = await getUsers({ email: filters.email });
        filterConditions.professor_id = users[0].id;
    }

    if (filters.professor) {
        if (Array.isArray(filters.professor)) {
            filterConditions.professor_id = { [Op.in]: filters.professor };
        } else {
            filterConditions.professor_id = filters.professor;
        }
    }

    if (filters.code) {
        filterConditions.access_code = filters.code;
    }

    return await Activity.findAll({ where: filterConditions });
}

const getActivityById = async (activityId) => {
    return await Activity.findByPk(activityId);
}

const updateActivity = async (activity) => {
    const identifiedActivity = await getActivityById(activity.id);
    if (!!identifiedActivity) {
        const { id, ...updatedData } = activity;
        identifiedActivity.set(updatedData);
        return await identifiedActivity.save();
    }
    return null;
}

const deleteActivity = async (activityId) => {
    if (!!activityId) {
        return await Activity.destroy({ where: { id: activityId } });
    }
    return null;
}

const joinActivity = async (activityCode) => {
    if (activityCode && activityCode != "") {
        const activitiesMatching = await getActivities({ code: activityCode });
        if (activitiesMatching.length === 0) return { success: false };

        const activityToJoin = activitiesMatching[0];
        const current_time = new Date();

        if (current_time >= activityToJoin.start_time && current_time <= activityToJoin.end_time) {
            return { success: true, activityId: activityToJoin.id };
        } else {
            return { notInTime: true };
        }
    }
    else return { success: false };
}

export {
    getActivities,
    getActivityById,
    createActivities,
    updateActivity,
    deleteActivity,
    joinActivity
}