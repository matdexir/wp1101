import express from "express";
import Post from "../models/post";
import moment from "moment";

const router = express.Router();

// TODO 2-(1): create the 1st API (/api/allPosts)
router.get("/api/allPosts", async (_, res) => {
  try {
    const ret = await Post.find({});
    ret.sort((a, b) => {
      return moment(a.timestamp) - moment(b.timestamp);
    });
    res.status(200).send({
      message: "success",
      data: [...ret],
    });
  } catch (e) {
    res.status(403).send({
      message: "error",
      data: null,
    });
  }
});
// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get("/api/postDetail", async (req, res) => {
  try {
    const ret = await Post.findOne({ postId: req.query.pid });
    console.log(req);
    res.status(200).send({
      message: "success",
      post: ret,
    });
  } catch (e) {
    res.status(403).send({
      message: "error",
      post: null,
    });
  }
});

// TODO 4-(1): create the 3rd API (/api/newPost)
router.post("/api/newPost", async (req, res) => {
  try {
    const newPost = new Post({
      postId: req.body.postId,
      title: req.body.title,
      content: req.body.content,
      timestamp: req.body.timestamp,
    });
    await newPost.save();
    res.status(200).send({
      message: "success",
    });
  } catch (e) {
    res.status(403).send({
      message: "error",
    });
  }
});

// TODO 5-(1): create the 4th API (/api/post)
router.delete("/api/post", async (req, res) => {
	try {
		await Post.deleteOne({postId: req.query.pid })
		res.status(200).send({
			message: "success",
		})
	} catch (e) {
		res.status(403).send({
			message: "error",
		});	
	}
})

export default router;
