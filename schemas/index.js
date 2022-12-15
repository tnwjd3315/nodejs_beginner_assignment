const express = require("express")
// const router = express.Router()

// mongoose 라이브러리를 가져와서 connect하기
// node.js_beginner_assignment라는 db에 접근
// catch: 에러처리
const mongoose = require ("mongoose")
const connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1/nodejs_beginner_assignment")
    .catch(err => console.log(err))
}
mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
})

// module.exports = router
// connect 함수 내보내주기. app.js에서 connect 사용
module.exports = connect