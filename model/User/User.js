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
    timestamps : true
})

// compile the user model
const User = mongoose.model("User", userSchema);

module.exports = User;