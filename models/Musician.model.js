const { Schema, model } = require("mongoose");

const musicianSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  instruments: {
    type: String,
    enum: [],
  },
  musicStyle: {
    type: String,
    enum: [],
  },
  city: String,
  experience: Number,
  description: String,
  availability: {
    type: String,
    enum: [],
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Musician", musicianSchema);
