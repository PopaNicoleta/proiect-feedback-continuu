const database = require('../datatabase/datatbase');

const createStudent = async(name, email, password) => {
    const query = 'INSERT INTO student (name, email, password) VALUES (?, ?, ?)';
    const values = [name, email, password];

    try {
        await database.run(query, values);
        return 'Student added successfully';
    } catch (error) {
        console.error(error.message);
        throw new Error('Internal server error');
    }
};

const getAllStudents = async() => { 
    const query = 'SELECT * FROM student';
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

const getStudentById = async(id) => {
    const query = 'SELECT * FROM student WHERE id = ?';
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
}

const deleteStudent = async(id) => {
    const query = 'DELETE FROM student WHERE id = ?';
    try {
        await database.run(query, [id]);
        return 'Student deleted successfully';
    } catch (error) {
        console.error(error.message);
        throw new Error('Internal server error');
    }
}

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    deleteStudent
}