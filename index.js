const express = require('express');
const connectDB = require('./db/server');
require('dotenv').config();
const userRoutes = require('./routes/userRoute');
const categoryRoutes = require('./routes/categoryRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const lessonRoutes = require('./routes/lessonRoutes');


// Connect to the database
connectDB();

// Initialize express
const app = express();

// SEEDERS
const {seedAdmin} = require('./seeders/admin');
seedAdmin();

// Initialize Express middleware
app.use(express.json({extended: false}));
app.use(userRoutes, categoryRoutes, subjectRoutes, lessonRoutes)


// Create a basic express app with
app.get('/', (req, res) => res.json({message: 'Welcome to tutoring app'}));

const port = process.env.PORT || 9001

// Listen to connections
app.listen(port, () => console.log(`Server up and running on port ${port}`));

