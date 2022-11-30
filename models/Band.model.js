const { Schema, model } = require("mongoose");

const bandSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  searchedMusician: {
    type: String,
    enum: [],
  },
  musicStyle: {
    type: String,
    enum: [],
  },
  city: String,
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

module.exports = model("Band", bandSchema);
