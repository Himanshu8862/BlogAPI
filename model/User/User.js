const mongoose = require("mongoose");
const Post = require("../Post/Post");

// create schema
const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required:[true,"First Name is required"]
    },
    lastname:{
        type: String,
        required:[true,"Last Name is required"]
    },
    profilePhoto:{
        type: String
    },
    email:{
        type: String,
        required:[true,"Email is required"]
    },
    password:{
        type: String,
        required:[true,"Password is required"]
    },
    isBlocked:{
        type: Boolean,
        default:false,
    },
    isAdmin:{
        type: Boolean,
        default:false,
    },
    role:{
        type : String,
        enum : ["Admin", "Guest", "Editor"]
    },
    // people who viewed your profile
    viewers:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    followers:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    following:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    posts:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
    }],
    comments:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
    }],
    blocked:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    plan:{
        type : String,
        enum : ["Free", "Premium", "Pro"],
        default : "Free"
    },
    userAward: {
        type : String,
        enum : ["Bronze", "Silver", "Gold"],
        default : "Bronze"
    },
},{
    timestamps : true,
    toJSON : {virtuals : true}  //  for virtuals to appear in your console.log() output and while fetching results of a query
});

// Hooks

// pre - before record is saved (find, findOne, query methods)

// whenever a single user is fetched this hook will be called
userSchema.pre("findOne",async function(next){
    // console.log('prehook called');

    // ------------- find the last post date of the user -------------

    // get the user id
    const userId = this._conditions._id;
    // find the post created by the user
    const posts = await Post.find({user:userId});
    // get the last post created by the user
    const lastPost = posts[posts.length-1];
    // get last post date
    const lastPostDate = new Date(lastPost?.createdAt); // optional chaining, same as
    // last post date in string format
    const lastPostDateStr = lastPostDate.toDateString();
    // add last post date as virtual to the schema
    userSchema.virtual("lastPostDate").get(function(){
        return lastPostDateStr;
    });

    // ------------- check if the user is inactive and block them by system -------------
    const currDate = new Date();
        // get the time duration in days from last post till today
    const diffMilliseconds = Math.abs(lastPostDate - currDate);
    const diffDays = (diffMilliseconds / (1000 * 60 * 60 * 24));

    // add virtuals isInactive to the schema to check if the user has not posted for 30 days
    if (diffDays>30){
        // add virtuals isInactive to the schema to check if a user is inactive for 30 days
        userSchema.virtual("isInactive").get(function(){
            return true;
        });
        // find user by ID and update
        // await User.findByIdAndUpdate(userId,
        //     {isBlocked:true},
        //     {new : true}
        // );
    }else{
        // add virtuals isInactive to the schema to check if a user is inactive for 30 days
        userSchema.virtual("isInactive").get(function(){
            return false;
        });
        // find user by ID and update
        // -- this makes the logic to the program incorrect, if the user has been blocked by
        // the admin, and he they made a post on that day, this prehook will unblock the user --
        // await User.findByIdAndUpdate(userId,
        //     {isBlocked:false},
        //     {new : true}
        // );
    }

    // ------------- last active date of user -------------
    // convert to days ago, for example 1 day ago
    const daysAgo = Math.floor(diffDays);
    // add virtuals lastActive in days to schema
    userSchema.virtual("lastActive").get(function(){
        if(daysAgo<=0){
            return "Today";
        }else if (daysAgo===1){
            return "Yesterday";
        }else(daysAgo>1)
            return `${daysAgo} days ago`;
    });

    // ------------- update user award based on number of posts -------------
    const numberOfPosts = posts.length;
    if(numberOfPosts<10){
        await User.findByIdAndUpdate(userId,
            {userAward:"Bronze"},
            {new:true}
        );
    }
    if(numberOfPosts>10){
        await User.findByIdAndUpdate(userId,
            {userAward:"Silver"},
            {new:true}
        );
    }
    if(numberOfPosts>20){
        await User.findByIdAndUpdate(userId,
            {userAward:"Gold"},
            {new:true}
        );
    }

    // ------------- populate the posts of the user -------------
    this.populate({
        path : "posts"
    });

    next();
});


// post - after saving (create)
userSchema.post("save", function(next){
    // console.log("post hook called");

});

// get fullname
userSchema.virtual("fullname").get(function(){
    // console.log(this);
    return `${this.firstname} ${this.lastname}`;
});

// get initials
userSchema.virtual("initials").get(function(){
    return `${this.firstname[0]}${this.lastname[0]}`;
});

// get postCount
userSchema.virtual("postCount").get(function(){
    return this.posts.length;
});

// get followers count
userSchema.virtual("followersCount").get(function(){
    return this.followers.length;
});

// get following count
userSchema.virtual("followingCount").get(function(){
    return this.following.length;
});

// get viewers count
userSchema.virtual("viewerCount").get(function(){
    return this.viewers.length;
});

// get blocked count
userSchema.virtual("blockedCount").get(function(){
    return this.blocked.length;
});

// compile the user model
const User = mongoose.model("User", userSchema);

module.exports = User;