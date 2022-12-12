const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
const appErr = require("../../utils/appErr");

// post create
const createPostCtrl = async(req,res,next)=>{
    const {title, description} = req.body;
    try {
        // Find the user
        const author = await User.findById(req.userAuth);
        // Create the post
        const postCreated = await Post.create({
            title,
            description,
            user: author._id
        });
        // associate user to post
        author.posts.push(postCreated);
        // save
        await author.save();

        res.json({
            status: "Success",
            data: postCreated
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

// get single post
const postDetailsCtrl = async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"post route"
        });
    } catch (error) {
        res.json(error.message);
    }
};

// get all posts
const fetchPostsCtrl = async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"Posts route"
        });
    } catch (error) {
        res.json(error.message);
    }
};

// delete
const deletePostCtrl = async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"Delete post route"
        });
    } catch (error) {
        res.json(error.message);
    }
};

// update
const updatePostCtrl = async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"Update post route"
        });
    } catch (error) {
        res.json(error.message);
    }
};

module.exports = {
    createPostCtrl,
    postDetailsCtrl,
    fetchPostsCtrl,
    deletePostCtrl,
    updatePostCtrl
}