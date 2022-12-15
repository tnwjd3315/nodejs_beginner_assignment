const mongoose = require("mongoose")

const commentsSchema = new mongoose.Schema({
  postsId: {
    type: String,
    required:false
  },
  user: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  createdAt:{
    type: String,
  },
  password:{
    type: String
  }

});

module.exports = mongoose.model("Comments", commentsSchema);