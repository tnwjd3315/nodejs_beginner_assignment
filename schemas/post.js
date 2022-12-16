const mongoose = require("mongoose")

const postsSchema = new mongoose.Schema({
  user: {
    type: String,
    required: false,
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
    type: String,
    required:false,
  }
});

module.exports = mongoose.model("Posts", postsSchema);