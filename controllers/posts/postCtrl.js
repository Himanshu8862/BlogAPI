const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
const appErr = require("../../utils/appErr");

// post create
const createPostCtrl = async(req,res,next)=>{
    console.log(req.file);
    const {title, description, category} = req.body;
    try {
        // Find the user
        const author = await User.findById(req.userAuth);
        // check if the user is blocked
        if(author.isBlocked){
            return next(appErr("Access Denied! Account is blocked",403));
        }
        // Create the post
        const postCreated = await Post.create({
            title,
            description,
            category,
            user: author._id,
            photo: req?.file?.path
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
const postDetailsCtrl = async(req,res,next)=>{
    try {
        // find the post to be viewed
        const post = await Post.findById(req.params.id);
        if(!post){
            return next(appErr("Post not found"));
        }
        // check if user has already vieweed the post
        const isAlreadyViewed = post.numViews.includes(req.userAuth);
        // if not already viewed add it to viewed
        if(!isAlreadyViewed){
            post.numViews.push(req.userAuth);
            post.save();
            res.json({
                status:"success",
                data: post
            });
        }else{
            res.json({
                status:"success",
                data: post
            });
        }
    } catch (error) {
        next(appErr(error.message));
    }
};

// toggle Likes
const toggleLikesPostCtrl = async(req,res,next)=>{
    try {
        // get the post
        const post = await Post.findById(req.params.id);
        if(!post){
            return next(appErr("Post not found"));
        }
        // check if user has already liked the post
        const isAlreadyLiked =  post.likes.includes(req.userAuth);
        // if the user didnt like the post, like it
        if(!isAlreadyLiked){
            post.likes.push(req.userAuth);
            await post.save();
        }else{
            post.likes = post.likes.filter(like => like != req.userAuth);
            await post.save();
        }
        res.json({
            status: "success",
            data: "You have successfully liked the post"
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

// toggle dislikes
const toggleDislikesPostCtrl = async(req,res,next)=>{
    try {
        // get the post
        const post = await Post.findById(req.params.id);
        if(!post){
            return next(appErr("Post not found"));
        }
        // check if user has already disliked the post
        const isAlreadyDisliked =  post.dislikes.includes(req.userAuth);
        // if the user didnt dislike the post, dislike it
        if(!isAlreadyDisliked){
            post.dislikes.push(req.userAuth);
            await post.save();
        }else{
            post.dislikes = post.dislikes.filter(dislike => dislike != req.userAuth);
            await post.save();
        }
        res.json({
            status: "success",
            data: "You have successfully disliked the post"
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

// get all posts
const fetchPostsCtrl = async(req,res,next)=>{
    try {
        //  find all posts
        const posts = await Post.find()
            .populate("user")
            .populate("category", "title");

        // check if the user is blocked by post owner
        const filteredPosts = posts.filter(post=>{
            // get all blocked users
            const blockedUsers = post.user.blocked;
            const isBlocked = blockedUsers.includes(req.userAuth);
            // return only those posts where current user is not blocked by the author
            return isBlocked ? null : post;
        });

        res.json({
            status:"success",
            data: filteredPosts
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

// delete
const deletePostCtrl = async(req,res,next)=>{
    try {
        // find the post
        const postToDelete = await Post.findById(req.params.id);
        // if post not found
        if(!postToDelete){
            return next(appErr("Post not found"));
        }
        // if post does not belong to the user
        if( postToDelete.user.toString() !== req.userAuth.toString()){
            return next(appErr("Can not delete the post, you are not the owner!",403));
        }
        await Post.findByIdAndDelete(req.params.id);

        res.json({
            status: "success",
            data: "Post deleted successfully"
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

// update
const updatePostCtrl = async(req,res)=>{
    try {
        const {title, description, category} = req.body;
        // find the post
        const postToUpdate = await Post.findById(req.params.id);
        // if post not found
        if(!postToUpdate){
            return next(appErr("Post not found"));
        }
        // if post does not belong to the user
        if( postToUpdate.user.toString() !== req.userAuth.toString()){
            return next(appErr("Can not update the post, you are not the owner!",403));
        }
        await Post.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                category,
                photo : req?.file?.path
            },
            {
                new : true,
                runValidators:true
            });

        res.json({
            status: "success",
            data: "Post updated successfully"
        });
    } catch (error) {
        next(appErr(error.message));
    }
};



module.exports = {
    createPostCtrl,
    postDetailsCtrl,
    fetchPostsCtrl,
    deletePostCtrl,
    updatePostCtrl,
    toggleLikesPostCtrl,
    toggleDislikesPostCtrl
}