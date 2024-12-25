import { Participant } from "../models/config";
import { Op } from "sequelize";

const getParticipants = async (filters) => {
    const ParticipantKeys = Object.keys(Participant.getAttributes());
    const filterConditions = {};

    if (filters.activityId) {
        filterConditions.activity_id = filters.activityId;
    }

    if (filters.studentId) {
        filterConditions.student_id = filters.studentId;
    }

    return await Participant.findAll({ where: filterConditions });
};

const createParticipant = async (participant) => {
    delete participant.id; 

    return await Participant.create(participant);
};

const getParticipantById = async (participantId) => {
    return await Participant.findByPk(participantId);
};

const updateParticipant = async (participant) => {
    const identifiedParticipant = await getParticipantById(participant.id);
    if (!!identifiedParticipant) {
        const { id, ...updatedData } = participant;
        identifiedParticipant.set(updatedData);
        return await identifiedParticipant.save();
    }
    return null;
};

const deleteParticipant = async (participantId) => {
    return await Participant.destroy({ where: { id: participantId } });
};

export {
    getParticipants,
    createParticipant,
    getParticipantById,
    updateParticipant,
    deleteParticipant
};
