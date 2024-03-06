const express = require('express');
const router = express.Router();

// Use express.json() middleware to parse JSON in the request body
router.use(express.json());

// GET /
// this will redirect to the meets list
router.get('/', (req, res) => {
    res.redirect('/meets');
});

module.exports = router;