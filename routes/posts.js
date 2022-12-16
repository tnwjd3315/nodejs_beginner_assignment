const mongoose = require("mongoose")
const {Types} = require("mongoose")

const express = require("express")
const router = express.Router()

const Posts = require("../schemas/post.js")

// localhost:3000/api/posts GET Method 전체 게시글 조회
router.get("/posts", async(req,res) => {
  const posts = await Posts.find({})
  res.json({posts})
})

// localhost:3000/api/posts GET Method 특정 게시글 조회
router.get("/posts/:postsId", async(req,res) => {
  const {postsId} = req.params
  const post = await Posts.find({postsId: Number(postsId)})
  res.json({post})
})

// localhost:3000/api/posts POST Method
router.post("/posts", async(req,res) => {
  const {user, title, content, createdAt, password} = req.body
  const createdPosts = await Posts.create({user, title, content, createdAt, password})
  res.json({ "postslist": createdPosts})
})

// localhost:3000/api/posts PUT Method
router.put("/posts/:postsId", async(req,res) => {
  const {postsId} = req.params
  const {title, content} = req.body

  //레코드의 개수(쿼리 결과 리절트의 개수)로 비밀번호 일치여부를 판단
  //몽고 디비에 일치하는 document가 있는지의 여부로 판단.
  //만약 editPosts가 있다면 비밀번호 일치, 그렇지 않으면 비밀번호 불일치
  const editPosts = await Posts.find({postsId, password})
  const pw = editPosts[0].password

  try{
    if (!pw || !title.length) {
      return res.return(400).json({
        success:false,
        errorMessage:"잘못된 접근입니다."
      })
    }
    await Posts.updateOne({title: title},{content: content})
        res.json({success: true})
  } catch (err) {
    console.log("잘못된 접근입니다.")
  } 
})


// router.put("/posts/:_id", async(req, res) => {
//   const {_id} = req.params
//   const {password, title, content} = req.body
//   await Posts.findById(Types.ObjectId(_id), async (err, doc) => {
//     if (err) {
//       console.error(err)
//     }
//     const isPwRight = doc.password === password
//     if (isPwRight) {
//       await Posts.updateOne(
//         {_id: _id},
//         {$set: {title, content}}
//         )
//     }
//   })
//   res.json({success:true})
// })

// localhost:3000/api/posts DELETE Method
router.delete("/posts/:_id", async(req, res) => {
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