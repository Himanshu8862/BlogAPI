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

// who viewed my profile
const whoViewedMyProfileCtrl = async(req,res,next)=>{
    try {
        // 1. Find the original user
        const user = await User.findById(req.params.id);

        // 2. Find the user who viewed the original user
        const userWhoViewed = await User.findById(req.userAuth);

        // 3. check if original user and who viewed is found
        if(user && userWhoViewed){
            // 4. Check if userWhoViewed is already in the user's viewers array
            const isUserAlreadyViewed = user.viewers.find(viewer => viewer.toString() === userWhoViewed._id.toString());
            if(isUserAlreadyViewed){
                return next(appErr("You already viewed this profile"));
            }
            else{
                // 5. push the userWhoViewed to the original user's the viewers array
                user.viewers.push(userWhoViewed._id);
                // 6. save the user
                await(user.save())
                res.json({
                    status:"success",
                    data:"you have successfully viewed the profile"
                });
            }
        }
    }catch (error) {
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
        // 1. find the user to be update
        const userToUpdate = await User.findById(req.userAuth);
        // 2. check id user is found
        if(!userToUpdate){
            return next(appErr("User not found", 403));
        }
        // 3. check if user is blocked
        if(userToUpdate.isBlocked){
            return next(appErr("Action not allowed,, your account is blocked", 403));
        }
        // 4. check if user is updating their profile photo
        if(req.file){
            // 5. update profile photo
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
    profilePhotoUploadCtrl,
    whoViewedMyProfileCtrl
};