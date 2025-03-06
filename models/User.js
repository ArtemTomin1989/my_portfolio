const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
  },
  age: {
    type: Number,
  },
  avatar: {
    type: String,
  },
  job_title: {
    type: String,
  },
  description: {
    type: String,
  },
  gender: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = model("userSchema", userSchema);
