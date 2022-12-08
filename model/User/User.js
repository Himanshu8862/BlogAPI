const mongoose = require("mongoose");

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
    // make this a virtual property
    // postCount:{
    //     type: Number,
    //     default:0
    // },
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
    // have to make this a virtual property
    // active:{
    //     type : Boolean,
    //     default : true
    // },
    posts:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
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