import { User } from "../models/config";
import { Op } from "sequelize";

const createUser = async (user) => {
    delete user.id;

    return User.create(user);
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
            { firstName: { [Op.like]: `%${filters.searchString}%` } },
            { lastName: { [Op.like]: `%${filters.searchString}%` } },   
            { [Op.and]: [ 
                { firstName: { [Op.like]: `%${filters.searchString.split(' ')[0]}%` } },
                { lastName: { [Op.like]: `%${filters.searchString.split(' ')[1] || ''}%` } }
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
        identifiedUser.set({updatedData});
        return await identifiedUser.save();
    }
}

const deleteUser = async (id) => {
    return await User.destroy({where: {id: id}});
}

export {
    createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser
};