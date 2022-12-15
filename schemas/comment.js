const mongoose = require("mongoose")

// comment 모델(스키마) 작성. key값들의 정보를 입력함
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
    required:false,
  }

});

// Posts라는 모델(스키마)는 상단의 goodsSchema를 이용해 정의함
// 정의한 것을 module.exports를 통해 내보내줌
module.exports = mongoose.model("Comments", commentsSchema);