const database = require('../database/database');

const createActivity = async (description, start_time, end_time, code, professor_id) => {
    const created_at = new Date().toISOString();
    const query = `INSERT INTO activity (description, created_at, start_time, end_time, code, professor_id) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [description, created_at, start_time, end_time, code, professor_id];

    try {
        await database.run(query, values);
        return 'Activity added successfully';
    } catch (error) {
        console.error(error.message);
        throw new Error('Internal server error');
    }
};

const getAllActivities = async () => {
    const query = 'SELECT * FROM activity';
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

const updateActivity = async (description, start_time, end_time, code, professor_id) => {
    const created_at = new Date().toISOString();
    const query = `UPDATE activity SET description = ?, created_at = ?, start_time = ?, end_time = ?, professor_id = ? WHERE code = ?`;
    const values = [description, created_at, start_time, end_time, professor_id, code];

    try {
        await database.run(query, values);
        return 'Activity updated successfully';
    } catch (error) {
        console.error(error.message);
        throw new Error('Internal server error');
    }
};

const getActivityByProfessorId = async (professor_id) => {
    const query = 'SELECT * FROM activity WHERE professor_id = ?';
    try {
        const rows = await new Promise((resolve, reject) => {
            database.all(query, [professor_id], (err, rows) => {
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
}

const getActivityByCode = async (code) => {
    const query = 'SELECT id FROM activity WHERE code = ?';
    try {
        const row = await new Promise((resolve, reject) => {
            database.get(query, [code], (err, row) => {
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

const deleteActivity = async (id) => {
    const query = 'DELETE FROM activity WHERE id = ?';
    try {
        await database.run(query, [id]);
        return 'Activity deleted successfully';
    } catch (error) {
        console.error(error.message);
        throw new Error('Internal server error');
    }
}

module.exports = {
    createActivity,
    getAllActivities,
    getActivityByCode,
    deleteActivity
};