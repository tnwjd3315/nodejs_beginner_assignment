const mongoose = require("mongoose")
const {Types} = require("mongoose")

const express = require("express")
const router = express.Router()

const Posts = require("../schemas/post.js")

// localhost:3000/api/posts GET Method
router.get("/posts", async(req,res) => {
  const posts = await Posts.find({})
  res.json({posts})
  console.log(`post id 값:${Types.ObjectId(posts._id)}`)
  console.log(`posts 값:${posts}`)
})

// localhost:3000/api/posts POST Method
router.post("/posts", async(req,res) => {
  const {user, title, content, createdAt, password} = req.body
  const createdPosts = await Posts.create({user, title, content, createdAt, password})
  res.json({ "postslist": createdPosts})
})

// localhost:3000/api/posts PUT Method
router.put("posts/:_id", async(req, res) => {
  const {_id} = req.params
  const {password} = req.body
  const {title} = req.body
  const {content} = req.body
  await Posts.findById(Types.ObjectId(_id), async (err, doc) => {
    if (err) {
      console.error(err)
    }
    const isPwRight = doc.password === password
    if (isPwRight) {
      await Posts.updateOne(
        {_id: _id},
        {$set: {title, content}}
        )
    }
  })
  res.json({success:true})
})

// localhost:3000/api/posts DELETE Method
router.delete("posts/:_id", async(req, res) => {
  const {_id} = req.params
  await Posts.findById(Types.ObjectId(_id), async (err, doc) => {
    if (err) {
      console.error(err)
    }
    const isPwRight = doc.password === password
    if (isPwRight) {
      await Posts.deleteOne(_id)
    }
  })
  res.json({success:true})
})

module.exports = router