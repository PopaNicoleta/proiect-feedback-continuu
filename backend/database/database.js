const sqlite3 = require('sqlite3').verbose();

const dbSource = 'db.sqlite';

let database = new sqlite3.Database(dbSource, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');

        database.run(`CREATE TABLE IF NOT EXISTS student (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT
        )`, (err) => {
            if (err) {
                console.error(err.message);
                throw err;
            }
        });

        database.run(`CREATE TABLE IF NOT EXISTS professor (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT
        )`, (err) => {
            if (err) {
                console.error(err.message);
                throw err;
            }
        });

        database.run(`CREATE TABLE IF NOT EXISTS activity (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            start_time TIMESTAMP,
            end_time TIMESTAMP,
            code TEXT UNIQUE,
            professor_id INTEGER,
            FOREIGN KEY(professor_id) REFERENCES professor(id)
        )`, (err) => {
            if (err) {
                console.error(err.message);
                throw err;
            }
        });

        database.run(`CREATE TABLE IF NOT EXISTS feedback (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER,
            activity_id INTEGER,
            emoji TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(student_id) REFERENCES student(id),
            FOREIGN KEY(activity_id) REFERENCES activity(id)
        )`, (err) => {
            if (err) {
                console.error(err.message);
                throw err;
            }
        });

        database.run(`CREATE TABLE IF NOT EXISTS activity_student (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            activity_id INTEGER,
            student_id INTEGER,
            FOREIGN KEY(activity_id) REFERENCES activity(id),
            FOREIGN KEY(student_id) REFERENCES student(id)
        )`, (err) => {
            if (err) {
                console.error(err.message);
                throw err;
            }
        });
    }
});

module.exports = database;