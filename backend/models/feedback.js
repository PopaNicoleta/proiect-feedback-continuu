const database = require('../database/database');

const createFeedback = async (emoji, student_id, code) => {
    const timestamp = new Date().toISOString();
    const sqlSelect = 'SELECT id FROM activity WHERE code = ?';
    const paramsSelect = [code];

    try {
        const row = await new Promise((resolve, reject) => {
            database.get(sqlSelect, paramsSelect, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        if (!row) {
            throw new Error('Activity not found');
        }

        const activityId = row.id;
        const sqlInsert = 'INSERT INTO feedback (student_id, activity_id, emoji, created_at) VALUES (?, ?, ?, ?)';
        const paramsInsert = [student_id, activityId, emoji, timestamp];

        await new Promise((resolve, reject) => {
            database.run(sqlInsert, paramsInsert, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        return 'Feedback added!';
    } catch (error) {
        console.error(error.message);
        throw new Error('Internal server error');
    }
}

const updateFeedback = async (emoji, student_id, code) => {
    const timestamp = new Date().toISOString();
    const sqlSelect = 'SELECT id FROM activity WHERE code = ?';
    const paramsSelect = [code];

    try {
        const row = await new Promise((resolve, reject) => {
            database.get(sqlSelect, paramsSelect, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        if (!row) {
            throw new Error('Activity not found');
        }

        const activityId = row.id;
        const sqlInsert = 'UPDATE feedback SET emoji = ?, created_at = ? WHERE student_id = ? AND activity_id = ?';
        const paramsInsert = [emoji, timestamp, student_id, activityId];

        await new Promise((resolve, reject) => {
            database.run(sqlInsert, paramsInsert, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        return 'Feedback updated!';
    } catch (error) {
        console.error(error.message);
        throw new Error('Internal server error');
    }
}

const deleteFeedback = async (student_id, code) => {
    const sqlSelect = 'SELECT id FROM activity WHERE code = ?';
    const paramsSelect = [code];

    try {
        const row = await new Promise((resolve, reject) => {
            database.get(sqlSelect, paramsSelect, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        if (!row) {
            throw new Error('Activity not found');
        }

        const activityId = row.id;
        const sqlDelete = 'DELETE FROM feedback WHERE student_id = ? AND activity_id = ?';
        const paramsDelete = [student_id, activityId];

        await new Promise((resolve, reject) => {
            database.run(sqlDelete, paramsDelete, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        return 'Feedback deleted!';
    } catch (error) {
        console.error(error.message);
        throw new Error('Internal server error');
    }
}

module.exports = {
    createFeedback, 
    updateFeedback,
    deleteFeedback
};