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
// 구조: router.METHOD(PATH, HANDLER)
// express에서 http라우터를 사용하기 위해서 router.해당method 작성
router.get("/posts", async(req,res) => {
  const posts = await Posts.find({})
  const Ids = posts.map((post) => {
    return post.postsId
  })
  const comments = await Comment.find({commentsId: Ids})
  const postsdata = posts.map((post) => {
    return{
      "postsId": post.postsId,
      "user": post.user,
      "title": post.title,
      "content": post.content,
      "createdAt": post.createdAt,
    }
  })
  res.json({
    "posts": postsdata,
  })
})

// localhost:3000/api/posts POST Method
// 구조: router.METHOD(PATH, HANDLER)
// express에서 http라우터를 사용하기 위해서 router.해당method 작성
// post를 요청했을 때 body에 있는 데이터를 객체 구조분해 할당을 통해 가져온다.
router.post("/posts", async(req,res) => {
  const {user, title, content, createdAt, password} = req.body
  // // find로 게시글 조회
  // const postslist = await Posts.find({postsId})
  // if (postslist.length) {
  //   return res.status(400).json({success:false, errorMessage:"이미 있는 게시글입니다."})
  // }
  // Posts 스키마를 통해 데이터 생성, createdPosts에 할당.
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

