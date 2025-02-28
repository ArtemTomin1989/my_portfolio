const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  // вдома дописати
});

module.exports = model("userSchema", userSchema);
