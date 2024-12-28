import { User } from "../models/config.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

const createUsers = async (users) => {
    users.forEach(user => {
        delete user.id;
    });

    const createdUsers = await User.bulkCreate(users);

    return createdUsers.length > 0 ? true : false;
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

const login = async (credentials) => {
    const { email, password } = credentials;

    const user = await getUsers({ email });

    const loginData = {
        success: false,
        userExists: false,
    };

    if (user && user.length === 1) {
        loginData.userExists = true;
        const identifiedUser = user[0];

        if(password) {
            const isPasswordValid = await bcrypt.compare(password, identifiedUser.password);
    
            if (isPasswordValid) {
                const { id, password, createdAt, updatedAt, ...userData } = identifiedUser.toJSON();
                loginData.success = true;
                loginData.user = userData;
            }
        }
    }

    return loginData;
};

const register = async (credentials) => {
    const {first_name, last_name, email, role} = credentials;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(credentials.password, saltRounds);

    const newUser = {
        first_name,
        last_name,
        email,
        password: hashedPassword,
        role
    };

    return await createUsers([newUser]);
};

export {
    createUsers,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    login,
    register
};