const bcrypt = require("bcryptjs");
const User = require("../../model/User/User");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeader = require("../../utils/getTokenFromHeader");
const appErr = require("../../utils/appErr");


// register
const userRegisterCtrl = async(req,res, next)=>{
    const {firstname, lastname, profilePhoto, email, password} = req.body;
    try {
        // check if email exists
        const userFound = await User.findOne({email});
        if(userFound){
            return next(appErr("User already exists", 500));
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);


        // create the user
        const user = await User.create({
            firstname,
            lastname,
            // profilePhoto,
            email,
            password : hashedPassword
        });
        res.json({
            status:"Success",
            data: user
        });
    } catch (error) {
        next(appErr(error.message, 500));
    }
}

// login
const userLoginCtrl = async(req,res)=>{
    const {email, password} = req.body;
    try {
        // check if email exists
        const userFound = await User.findOne({email});
        if(!userFound){
            return res.json({
                "msg" : "Invalid login credentials"
            });
        }


        // verify password
        const isPasswordMatched = await bcrypt.compare(password,userFound.password);
        if(!isPasswordMatched){
            return res.json({
                "msg" : "Invalid login credentials"
            });
        }

        res.json({
            status:"Success",
            data: {
                firstname : userFound.firstname,
                lastname : userFound.lastname,
                email : userFound.email,
                isAdmin : userFound.isAdmin,
                token : generateToken(userFound._id),
            }
        });
    } catch (error) {
        res.json(error.message);
    }
};

// all users
const usersCtrl = async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"all Users route"
        });
    } catch (error) {
        res.json(error.message);
    }
};

// profile
const userProfileCtrl = async(req,res)=>{
    try {
        const user = await User.findById(req.userAuth);
        res.json({
            status:"success",
            data: user
        });
    } catch (error) {
        res.json(error.message);
    }
};

// delete
const userDeleteCtrl =  async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"Delete user route"
        });
    } catch (error) {
        res.json(error.message);
    }
};

// update
const userUpdateCtrl = async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"Update user route"
        });
    } catch (error) {
        res.json(error.message);
    }
};

// profile photo upload
const profilePhotoUploadCtrl = async(req,res, next)=>{

    try {
        // find the user to be update
        const userToUpdate = await User.findById(req.userAuth);
        // check id user is found
        if(!userToUpdate){
            return next(appErr("User not found", 403));
        }
        // check if user is blocked
        if(userToUpdate.isBlocked){
            return next(appErr("Action not allowed,, your account is blocked", 403));
        }
        // check if user is updating their profile photo
        if(req.file){
            // update profile photo
            await User.findByIdAndUpdate(req.userAuth,{
                $set:{
                    profilePhoto : req.file.path,
                },
            },{
                new:true
            });
        }
        res.json({
            status:"success",
            data:"you have successfully updated your profile photo"
        });
    } catch (error) {
        next(appErr(error.message, 500));
    }
};

module.exports = {
    userRegisterCtrl,
    userLoginCtrl,
    usersCtrl,
    userProfileCtrl,
    userDeleteCtrl,
    userUpdateCtrl,
    profilePhotoUploadCtrl
};