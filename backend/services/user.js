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

    // Filtrare după rol
    if (filters.role && !Array.isArray(filters.role) && ['professor', 'student'].includes(filters.role)) {
        filterConditions.role = filters.role;
    }

    // Filtrare după nume
    if (filters.searchString) {
        filterConditions[Op.or] = [
            { first_name: { [Op.like]: `%${filters.searchString}%` } },
            { last_name: { [Op.like]: `%${filters.searchString}%` } },
            {
                [Op.and]: [
                    { first_name: { [Op.like]: `%${filters.searchString.split(' ')[0]}%` } },
                    { last_name: { [Op.like]: `%${filters.searchString.split(' ')[1] || ''}%` } }
                ]
            }
        ];
    }

    if (filters.email) {
        filterConditions.email = filters.email;
    }

    return await User.findAll({
        where: filterConditions
    });
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

const login = async (credentials) => {//TODO: finish that shit
    const { email, password } = credentials;

    const user = await getUsers({ email });

    if (user && user.length === 1) {
        const identifiedUser = user[0];

        const isPasswordValid = await bcrypt.compare(password, identifiedUser.password);

        if (isPasswordValid) {
            const { password, ...userData } = identifiedUser.toJSON();
            return userData;
        } else {
            throw new Error("Parolă incorectă");
        }
    } else {
        throw new Error("Email-ul nu este înregistrat");
    }
};

export {
    createUsers,
    getUserById,
    getUsers,
    updateUser,
    deleteUser
};