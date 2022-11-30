const { Schema, model } = require("mongoose");

const bandSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  searchedMusician: {
    type: String,
  },
  musicStyle: {
    type: String,
  },
  city: String,
  description: String,
  availability: {
    type: String,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Band", bandSchema);
