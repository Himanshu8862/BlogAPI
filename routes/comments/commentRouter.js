const express = require("express");
const {
    createCommentCtrl,
    updateCommentCtrl,
    deleteCommentCtrl,
    commentDetailsCtrl
} = require("../../controllers/comments/commentCtrl");
const isLogin = require("../../middlewares/isLogin");

const commentRouter = express.Router();

// POST/api/v1/comments
commentRouter.post("/:id", isLogin, createCommentCtrl);

// GET/api/v1/comments/:id
commentRouter.get("/:id", isLogin, commentDetailsCtrl);

// DELETE/api/v1/comments/:id
commentRouter.delete("/:id", isLogin, deleteCommentCtrl);

// PUT/api/v1/comments/:id
commentRouter.put("/:id", isLogin, updateCommentCtrl);


module.exports = commentRouter;