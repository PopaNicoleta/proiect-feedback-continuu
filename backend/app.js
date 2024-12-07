const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database/database');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const activitiesRouter = require('./routes/activities');
app.use('/activities', activitiesRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});