const Comment = require("../../model/Comment/Comment");
const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
const appErr = require("../../utils/appErr");

// create
const createCommentCtrl = async(req,res,next)=>{
    const {description} = req.body;
    try {
        // find the post
        const post = await Post.findById(req.params.id);
        if(!post){
            return next(appErr("Post not found"));
        }

        // find the user
        const user = await User.findById(req.userAuth);

        // check if the user is blocked
        if(user.isBlocked){
            return next(appErr("Access Denied! Account is blocked",403));
        }

        // create the comment
        const commentCreated = await Comment.create({
            description,
            post : post._id,
            user: user._id
        });

        // push comment to post and user
        post.comments.push(commentCreated._id);
        user.comments.push(user._id);

        // to disable validation await post.save({validateBeforeSave:false})
        await post.save();
        await user.save();

        res.json({
            status:"Success",
            data: commentCreated
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

// update
const updateCommentCtrl = async(req,res, next)=>{
    try {
        const {description} = req.body;
        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            {description},
            {new:true, runValidators:true}
        );
        // if comment does not belong to the user
        if( comment.user.toString() !== req.userAuth.toString()){
            return next(appErr("Can not update the comment, you are not the owner!",403));
        }
        res.json({
            status: "success",
            data: comment
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

const deleteCommentCtrl = async(req,res,next)=>{
    try {
        // find the post
        const commentToDelete = await Comment.findById(req.params.id);
        // if post not found
        if(!commentToDelete){
            return next(appErr("comment not found"));
        }
        // if comment does not belong to the user
        if( commentToDelete.user.toString() !== req.userAuth.toString()){
            return next(appErr("Can not delete the comment, you are not the owner!",403));
        }
        await Comment.findByIdAndDelete(req.params.id);

        res.json({
            status: "success",
            data: "comment deleted successfully"
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

const commentDetailsCtrl = async(req,res,next)=>{
    try {
        const comment = await Comment.findById(req.params.id);
        res.json({
            status:"success",
            data: comment
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

module.exports = {
    createCommentCtrl,
    updateCommentCtrl,
    deleteCommentCtrl,
    commentDetailsCtrl
  };