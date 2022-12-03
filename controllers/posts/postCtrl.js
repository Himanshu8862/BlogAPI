// post create
const createPostCtrl = async(req,res)=>{
    try {
        res.json({
            status:"Success",
            data:"post created"
        });
    } catch (error) {
        res.json(error.message);
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