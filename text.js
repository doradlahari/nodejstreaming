const mongoose = require("mongoose");

const textData = mongoose.Schema({
  text: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("textdetails", textData);
