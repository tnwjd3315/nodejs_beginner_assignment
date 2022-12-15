//Router는 클라의 요청을 처리하는 express.js 기능
const express = require("express")
const router = express.Router()

// comment 스키마를 가져와서 Comment라는 변수에 할당. Comment는 API에서 사용됨.
// comment가 게시된 post를 찾기 위해 post 스키마 가져와서 Posts라는 변수에 할당.
const Comment = require("../schemas/comment.js")
const Posts = require("../schemas/post.js")

// localhost:3000/api/comments GET Method
router.get("/comments", async(req,res) => {
  // 모든 댓글 조회, Comment정보값을 comments에 할당.
  const comments = await Comment.find({})
  // 배열이 이런식으로 되어있을 때 postsId를 가져와야 함. postsIds라는 이름으로 할당함
  // [
  //  {postsId, commentsId, user, title, content, createdAt},
  //  {postsId, commentsId, user, title, content, createdAt}  
  // ]
  // map을 통해 배열 안의 값들을 하나씩 순회돌아 리턴된 결과값만 postsIds에 할당해줌
  const postsIds = comments.map((comment) => {
    // 반복문 돌때 postsId만 추출함. 리스트(배열)이 [1,4,8] 이런식으로 리턴됨
    return comment.postsId
  })
  // 실제로 postsId에 해당하는 post를 가져오기
  // postsId에 해당하는 값이 postsIds 리스트(배열)안에 있으면, Posts에 해당하는 모든 정보 가져오기
  const posts = await Posts.find({postsId: postsIds})

  // map 반복문을 통해 리턴값 posts라는 변수에 해당 post의 정보를 넣어줌.
  const commentsdata = comments.map((comment) => {
    return {
      "postsId": 1,
      "commentsId": comment.commentsId,
      "user": comment.user,
      "title": comment.title,
      "content": comment.content,
      "createdAt": comment.createdAt,
      //post에 해당하는 postsId와 comment에 해당하는 postsId가 일치할 때만 결과값을 리턴함
      "posts": posts.find((post => post.postsId === comment.postsId))
    }
  })
  res.json({
    "comments": commentsdata
  })
})

// localhost:3000/api/comments POST Method
router.post("/comments", async(req,res) => {
  const {postsId, commentsId, user, title, content, createdAt} = req.body
  // // find로 게시글 조회
  // const commentslist = await Comment.find({commentsId})
  // if (commentslist.length) {
  //   return res.status(400).json({success:false, errorMessage:"이미 있는 댓글입니다."})
  // }
  // Comment 스키마를 통해 데이터 생성, createdComments에 할당.
  const createdComments = await Comment.create({postsId, commentsId, user, title, content, createdAt})
  res.json({ "commentslist": createdComments})
})


module.exports = router