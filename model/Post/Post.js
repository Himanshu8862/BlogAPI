const mongoose = require("mongoose");

// create schema

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required:[true,"Post title is required"],
        trim: true
    },
    description:{
        type: String,
        required:[true,"description title is required"],
        trim: true
    },
    category:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
        required : [true, "Category is required"]
    },
    numViews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    dislikes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required:[true,"Author is required"]
    },
    photo:{
        type: String,
        // required: [true,"Photo is required"]
    }
},{
    timestamps: true

});

// compile the post model
const Post = mongoose.model("Post", postSchema);

module.exports = Post;