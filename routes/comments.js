// 자동으로 저장되는 _id값을 객체로 만들어주기 위한 기능
const mongoose = require("mongoose")
const {Types} = require("mongoose")

//Router는 클라의 요청을 처리하는 express.js 기능
const express = require("express")
const router = express.Router()

// comment 스키마를 가져와서 Comment라는 변수에 할당. Comment는 API에서 사용됨.
// comment가 게시된 post를 찾기 위해 post 스키마 가져와서 Posts라는 변수에 할당.
const Comment = require("../schemas/comment.js")
const Posts = require("../schemas/post.js")

// localhost:3000/api/comments GET Method
router.get("/comments/:_id", async(req,res) => {
  // 모든 댓글 조회, Comment정보값을 comments에 할당.
  // const {_id} = req.params
  const {postsId: _id} = req.params
  const comments = await Comment.find()
  res.json({comments})
  // console.log(`postId 보이는 모습: ${postsId}`)
  // console.log(`comments 보이는 모습: ${comments}`)
})

// localhost:3000/api/comments POST Method
router.post("/comments/:_id", async(req,res) => {
  const {user, title, content, createdAt, password} = req.body
  const postsId = req.params._id
  console.log(postsId)
  const createdComments = await Comment.create({postsId, user, title, content, createdAt, password})
  res.json({ "commentslist": createdComments})
})

// localhost:3000/api/comments PUT Method

// localhost:3000/api/comments DELETE Method

module.exports = router