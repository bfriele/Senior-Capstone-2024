const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let score = new Schema(
  {
    event: {
      type: String
    },
    score: {
      type: Number
    }
  }
);

const ScoreModel = mongoose.model("scores", score);
module.exports = ScoreModel;