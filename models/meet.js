const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let meet = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: mongoose.Types.ObjectId,
    },
    name: {
      type: String
    },
    date: {
      type: Number
    },
    location: {
      type: String
    },
    scores: {
      type: Map
    },
    notes: {
      type: String
    }
  }
);

const MeetModel = mongoose.model("meets", meet);
module.exports = MeetModel;