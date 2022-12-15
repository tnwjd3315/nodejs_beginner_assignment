// 자동 생성되는 _id값 객체로 만들어주기
const mongoose = require("mongoose")
const {Types} = require("mongoose")

const express = require("express")
const router = express.Router()

const Comment = require("../schemas/comment.js")
const Posts = require("../schemas/post.js")

// localhost:3000/api/comments GET Method
router.get("/comments/:_id", async(req,res) => {
  const {_id} = req.params
  // const {postsId: _id} = req.params
  const comments = await Comment.find({postsId: _id})
  res.json({comments})
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
router.put("comments/:_id", async(req, res) => {
  const {_id} = req.params
  const {password} = req.body
  const {title} = req.body
  const {content} = req.body
  await Comment.findById(Types.ObjectId(_id), async (err, doc) => {
    if (err) {
      console.error(err)
    }
    const isPwRight = doc.password === password
    if (isPwRight) {
      await Comment.updateOne(
        {_id: _id},
        {$set: {title, content}}
        )
    }
  })
  res.json({success:true})
})

// localhost:3000/api/comments DELETE Method
router.delete("comments/:_id", async(req, res) => {
  const {_id} = req.params
  await Comment.findById(Types.ObjectId(_id), async (err, doc) => {
    if (err) {
      console.error(err)
    }
    const isPwRight = doc.password === password
    if (isPwRight) {
      await Comment.deleteOne(_id)
    }
  })
  res.json({success:true})
})

module.exports = router