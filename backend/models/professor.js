const database = require('../database/database');


const createProfessor = async(name, email, password) => {
    const query = 'INSERT INTO professor (name, email, password) VALUES (?, ?, ?)';
    const values = [name, email, password];

    try {
        await database.run(query, values);
        return 'Professor added successfully';
    } catch (error) {
        console.error(error.message);
        throw new Error('Internal server error');
    }
};

const getAllProfessors = async() => { 
    const query = 'SELECT * FROM professor';
    try {
        const rows = await new Promise((resolve, reject) => {
            database.all(query, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
        return rows;
    } catch (error) {
        console.error(error.message);
        throw new Error('Internal server error');
    }
};

const getProfessorById = async(id) => {
    const query = 'SELECT * FROM professor WHERE id = ?';
    try {
        const row = await new Promise((resolve, reject) => {
            database.get(query, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
        return row;
    } catch (error) {
        console.error(error.message);
        throw new Error('Internal server error');
    }
};

const deleteProfessor = async(id) => {
    const query = 'DELETE FROM professor WHERE id = ?';
    try {
        await database.run(query, [id]);
        return 'Professor deleted successfully';
    } catch (error) {
        console.error(error.message);
        throw new Error('Internal server error');
    }
};

const getProfessorByEmail = async(email) => {
    const query = 'SELECT * FROM professor WHERE email = ?';
    try {
        const row = await new Promise((resolve, reject) => {
            database.get(query, [email], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
        return row;
    } catch (error) {
        console.error(error.message);
        throw new Error('Internal server error');
    }
};

module.exports = {
    createProfessor,
    getAllProfessors,
    getProfessorById,
    deleteProfessor,
    getProfessorByEmail
};
