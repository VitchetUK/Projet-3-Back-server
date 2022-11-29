const { Schema, model } = require("mongoose");

const musicianSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  description: String,
  availability: {
    type: String,
    enum: [],
  },
  instruments: {
    type: String,
    enum: [],
  },
  musicStyle: {
    type: String,
    enum: [],
  },
  experience: Number,
  isArchived: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Musician", musicianSchema);
