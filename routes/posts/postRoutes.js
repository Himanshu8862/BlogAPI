const express = require("express");
const storage = require("../../config/cloudinary");
const multer = require("multer")
const {
    createPostCtrl,
    postDetailsCtrl,
    fetchPostsCtrl,
    deletePostCtrl,
    updatePostCtrl,
    toggleLikesPostCtrl,
    toggleDislikesPostCtrl
} = require("../../controllers/posts/postCtrl");
const isLogin = require("../../middlewares/isLogin");

const postRouter = express.Router();
// instance of multer
const upload = multer({storage});


// POST/api/v1/posts
postRouter.post("/", isLogin, upload.single("photo"), createPostCtrl);

// GET/api/v1/posts/:id
postRouter.get("/:id", isLogin, postDetailsCtrl);

// GET/api/v1/posts/
postRouter.get("/", fetchPostsCtrl);

// GET/api/v1/posts/likes/:id
postRouter.get("/likes/:id", isLogin, toggleLikesPostCtrl);

// GET/api/v1/posts/dislikes/:id
postRouter.get("/dislikes/:id", isLogin, toggleDislikesPostCtrl);

// DELETE/api/v1/posts/:id
postRouter.delete("/:id", isLogin, deletePostCtrl);

// PUT/api/v1/posts/:id
postRouter.put("/:id", isLogin, upload.single("photo"), updatePostCtrl);

module.exports = postRouter;