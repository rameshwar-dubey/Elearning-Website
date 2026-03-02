const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  completedTopics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic"
  }],

  certificates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Certificate"
  }]
});

module.exports = mongoose.model("User", userSchema);