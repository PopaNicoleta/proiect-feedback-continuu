const database = require('../database');

const createActivityStudent = async (student_id, activity_id) => {
    const query = 'INSERT INTO activity_student (student_id, activity_id) VALUES (?, ?)';
    const values = [student_id, activity_id];

    try {
        await database.run(query, values);
        return 'Activity added to student';
    } catch (error) {
        console.error(error.message);
        throw new Error('Internal server error');
    }
}

const getAllActivityStudents = async () => {
    const query = 'SELECT * FROM activity_student';

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

const getActivityStudentById = async (student_id, activity_id) => {
    const query = 'SELECT * FROM activity_student WHERE student_id = ? AND activity_id = ?';
    const values = [student_id, activity_id];

    try {
        const row = await new Promise((resolve, reject) => {
            database.get(query, values, (err, row) => {
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

const deleteActivityStudent = async (student_id, activity_id) => {
    const query = 'DELETE FROM activity_student WHERE student_id = ? AND activity_id = ?';
    const values = [student_id, activity_id];

    try {
        await database.run(query, values);
        return 'Activity removed from student';
    } catch (error) {
        console.error(error.message);
        throw new Error('Internal server error');
    }
};

module.exports = {
    createActivityStudent,
    getAllActivityStudents,
    getActivityStudentById,
    deleteActivityStudent
};