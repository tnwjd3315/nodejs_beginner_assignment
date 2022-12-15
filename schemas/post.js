// const express = require("express")
// const router = express.Router()
const mongoose = require("mongoose")
const idAutoIncrement = require("id-auto-increment")

// post 모델(스키마) 작성. key값들의 정보를 입력함
const postsSchema = new mongoose.Schema({
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
    required:false,
  }

});

// Posts라는 모델(스키마)는 상단의 postsSchema를 이용해 정의함
// 정의한 것을 module.exports를 통해 내보내줌
module.exports = mongoose.model("Posts", postsSchema);
// module.exports = router