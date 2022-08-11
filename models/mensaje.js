const mongoose = require("mongoose");
const msjSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  msg: {
    type: String,
  },

  img: {
    type: String,
  },

  id: {
    type: String,
  }
});

const Msg = mongoose.model("ms", msjSchema);

module.exports = Msg;
