const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    username: String,
    email: {
      type: String,
      unique: true,
    },
    phone: Number,
    password: String,
    age: Number,
    image: {
      name: String,
      url: String,
    },
    socialMedia: String,
    displayEmail: String,
  }
  // {
  // 	// this second object adds extra properties: `createdAt` and `updatedAt`
  // 	timestamps: true,
  // }
);

module.exports = model("User", userSchema);
