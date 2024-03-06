// Required libraries
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');
const MeetModel = require('../models/meet');

// Use express.json() middleware to parse JSON in the request body
router.use(express.json());

// GET /meets
// this will list the existing meets
router.get('/', async (req, res) => {
  try {
    // find all meets sorted by date descending
    const meets = await MeetModel.find().sort({ date: -1 });
    console.log(`Found ${meets.length} meets:`);
    res.render('meets', {
      meets: meets,
      moment: moment
    });
  } catch (error) {
    console.error('Error finding meets:', error);
    // TODO: return meets with error
  }
});

// GET /meets/new
// show a form allowing a new meet to be created
router.get('/new', (req, res) => {
  res.render('new-meet'); // When user issues request to meets/new show new-meet.ejs
});

// GET /meets/{id}
// this will return the given meet matching the id
router.get('/:id', async (req, res) => {
  console.log('request', req)
  let meetId = req.params.id;
  console.log('meetId', meetId);
  try {
    const meet = await MeetModel.findById(meetId);
    if (meet) {
      console.log('Found meet: ', meet);
      res.render('meet', { // Goes to meet.ejs (meet view)
        meet: meet, // sends meet with given ID to ejs
        moment: moment // JS library to format dates
      });
    } else { // 404 not found error
      console.log(`Meet with ID ${meetId} not found`);
      res.render('404', {
        message: `Meet with ID ${meetId} not found`
      });
    }
  } catch (error) {
    console.error('Error finding meet', error);
    res.render('error', {
      message: `Error finding meet ${error}`
    });
  }
});

// Deletes meet with ID
router.delete('/:id', async (req, res) => {
  let meetId = req.params.id;
  console.log('meetId', meetId);

  try {
    const deleteMeet = await MeetModel.findByIdAndDelete(meetId);
    if (deleteMeet) { // If object exists then it was deleted
      console.log(`Deleted meet with id ${meetId}`);
    } else {
      console.log(`Unable to delete meet. Meet with id ${meetId} not found`);
    }
    // for now return an empty response
    res.json({});
  } catch (error) {
    console.error('Error deleting meet', error);
    res.render('error', {
      message: `Error deleting meet ${error}`
    });
  }
});

// POST /meets
// this will create and save a new meet
router.post('/', async (req, res) => {
  const { name, date, location, notes, scores } = req.body;

console.log("scores: ", scores);

  // create a new meet
  const newMeet = new MeetModel({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    date: date,
    location: location,
    scores: scores,
    notes: notes
  });
  try {
    // Use await to wait for the save operation to complete
    const result = await newMeet.save();
    console.log('New meet saved:', result);
    res.json(result);
  } catch (error) {
    console.error('Error saving to new meet:', error);
    res.json({
      error: `Error saving meet: ${error}`
    });
  }
});

module.exports = router;