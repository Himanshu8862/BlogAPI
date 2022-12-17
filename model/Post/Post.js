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
        required: [true,"Photo is required"]
    }
},{
    timestamps: true,
    toJSON : {virtuals : true}

});

postSchema.pre(/^find/, function(next){

    postSchema.virtual("viewsCount").get(function(){
        return this.numViews.length;
    });

    postSchema.virtual("likesCount").get(function(){
        return this.likes.length;
    });

    postSchema.virtual("dislikesCount").get(function(){
        return this.dislikes.length;
    });

    postSchema.virtual("likesPercentage").get(function(){
        const post = this;
        const total = +post.likes.length + +post.dislikes.length;
        const percentage = (post.likes.length / total) * 100;
        return `${percentage}%`;
    });

    postSchema.virtual("dislikesPercentage").get(function(){
        const post = this;
        const total = +post.likes.length + +post.dislikes.length;
        const percentage = (post.dislikes.length / total) * 100;
        return `${percentage}%`;
    });

    // if day is less than 0 return today, if day is 1 return yesterday else return days ago
    postSchema.virtual("daysAgo").get(function(){
        const post = this;
        const date = new Date(post.createdAt);
        const daysAgo = Math.floor( (Date.now()-date) / (1000*60*60*24) );
        if(daysAgo === 0){
            return "Today";
        }else if (daysAgo === 1){
            return "Yesterday";
        }else
            return `${daysAgo} days ago`;
    });


    next();
});




// compile the post model
const Post = mongoose.model("Post", postSchema);

module.exports = Post;