const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const port = 3000; // Listen on port 3000
const dbUri = "mongodb+srv://user:MSEHVI04GClnTKFn@brendan-meet-scores.dc3h5hv.mongodb.net/?retryWrites=true&w=majority"; // MongoDB database

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

const rootRouter = require('./routes/root');
const meetsRouter = require('./routes/meets');
app.use('/', rootRouter); // When running, localhost:3000 redirects to /meets
app.use('/meets', meetsRouter);

// Connects to database
mongoose.connect(dbUri);
const connection = mongoose.connection;

connection.once('open', function() {
  console.log('Successfully connected to database');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});