// 자동으로 저장되는 _id값을 객체로 만들어주기 위한 기능
const mongoose = require("mongoose")
const {Types} = require("mongoose")

//Router는 클라의 요청을 처리하는 express.js 기능
const express = require("express")
const router = express.Router()

// post 스키마를 가져와서 Posts라는 변수에 할당. Posts는 API에서 사용됨.
const Posts = require("../schemas/post.js")
const Comment = require("../schemas/comment.js")

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
  const {_id} = req.params //라우터 매개 변수에 대한 정보가 담긴 객체
  const {password} = req.body // request호출 시 body로 전달된 정보가 담긴 객체
  const {title} = req.body
  const {content} = req.body
  console.log("put이 정상작동됨.")

  // _id를 사용해서 db에서 수정하려는 post를 가져오기, 그 post에 해당하는 pw가 일치하면 객체 보내주기
  // Types.ObjectId()로 _id를 Object로 만들기
  //err와 doc가 각각 무슨 뜻일까?
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

// router를 app.js에서 사용하기 위해 내보내주는 코드
module.exports = router

