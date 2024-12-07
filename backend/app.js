const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database/database');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const activitiesRouter = require('./routes/activities');
const studentsRouter = require('./routes/students');
const professorsRouter = require('./routes/professors');
const feedbackRouter = require('./routes/feedback');
const activityStudentsRouter = require('./routes/activityStudents');
app.use('/activities', activitiesRouter);
app.use('/students', studentsRouter);
app.use('/professors', professorsRouter);
app.use('/feedback', feedbackRouter);
app.use('/activity-students', activityStudentsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});