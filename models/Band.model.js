const { Schema, model } = require("mongoose");

const bandSchema = new Schema({
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
});

module.exports = model("Band", bandSchema);
