const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const app = express()
const port = 3000

mongoose.set('strictQuery', false)
// router 미들웨어
const postsRouter = require("./routes/posts")
const commentsRouter = require("./routes/comments")

// connect라는 변수에 require을 통해 ./schemas에 있는 모듈을 가져옴
// connect()를 통해 실제로 db에 연결함
const connect = require("./schemas");
connect();

// localhost:3000/api -> postsRouter,commentsRouter
// 의미: 이제부터 localhost:3000뒤에 /api로 시작되는 주소는
// routes/posts.js, routes/comments.js에 있는 router 미들웨어를 통해 처리된다.
// 미들웨어가 순차적으로 거쳐가기 때문에 app.use(express.json())가 먼저 작성되어야 함
// body로 전달받은 JSON 데이터를 바로 사용할 수 없으므로 JSON middleware를 사용해 body로 전달된 데이터를 사용할 수 있도록 함. 
app.use(express.json())
app.use("/api", [postsRouter, commentsRouter])


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});

module.exports = router