const { Schema, model } = require("mongoose");

const musicianSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  instruments: {
    type: String,
  },
  musicStyle: {
    type: String,
  },
  city: String,
  experience: Number,
  description: String,
  availability: {
    type: String,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Musician", musicianSchema);
