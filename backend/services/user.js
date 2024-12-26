import { User } from "../models/config.js";
import { Op } from "sequelize";

const createUsers = async (users) => {
    users.forEach(user => {
        delete user.id;
    });

    return await User.bulkCreate(users);
}


const getUsers = async (filters) => {
    const userKeys = Object.keys(User.getAttributes());

    const filterConditions = {};

    //filtrare dupa rol
    if(filters.role && !Array.isArray(filters.role) && ['professor', 'student'].includes(filters.role)) {
        filterConditions.role = filters.role;
    }

    //filtrare dupa nume
    if (filters.searchString) {
        filterConditions[Op.or] = [
            { first_name: { [Op.like]: `%${filters.searchString}%` } },
            { last_name: { [Op.like]: `%${filters.searchString}%` } },   
            { [Op.and]: [ 
                { first_name: { [Op.like]: `%${filters.searchString.split(' ')[0]}%` } },
                { last_name: { [Op.like]: `%${filters.searchString.split(' ')[1] || ''}%` } }
            ]}
        ];
    }

    return await User.findAll({
        where: filterConditions
    })  
};

const getUserById = async (userId) => {
    return await User.findByPk(userId);
}

const updateUser = async (user) => {
    const identifiedUser = await getUserById(user.id);
    if(!!identifiedUser) {
        const { id, ...updatedData } = user;
        identifiedUser.set(updatedData);
        return await identifiedUser.save();
    }
    return null;
}

const deleteUser = async (userId) => {
    return await User.destroy({where: {id: userId}});
}

export {
    createUsers,
    getUserById,
    getUsers,
    updateUser,
    deleteUser
};