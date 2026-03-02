const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  title: String,
  content: String,

  order: Number, 

  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject"
  }
});

module.exports = mongoose.model("Topic", topicSchema);