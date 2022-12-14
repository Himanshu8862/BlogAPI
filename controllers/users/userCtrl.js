const bcrypt = require("bcryptjs");
const User = require("../../model/User/User");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeader = require("../../utils/getTokenFromHeader");
const appErr = require("../../utils/appErr");
const Post = require("../../model/Post/Post");
const Category = require("../../model/Category/Category");
const Comment = require("../../model/Comment/Comment");

// register
const userRegisterCtrl = async(req,res, next)=>{
    const {firstname, lastname, email, password} = req.body;
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
const userLoginCtrl = async(req,res,next)=>{
    const {email, password} = req.body;
    try {
        // check if email exists
        const userFound = await User.findOne({email});
        if(!userFound){
            return next(appErr("Invalid login credentials"));
        }


        // verify password
        const isPasswordMatched = await bcrypt.compare(password,userFound.password);
        if(!isPasswordMatched){
            return next(appErr("Invalid login credentials"));
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
        next(appErr(error.message));
    }
};

// who viewed my profile
const whoViewedMyProfileCtrl = async(req,res,next)=>{
    try {
        // 1. Find the original user
        const user = await User.findById(req.params.id);

        // ------ have to add this condition in every controller which uses req.params.id
        //  otherwise the request gets stuck (case arise when someone is trying to find recently deleted user) ------
        // if(!user){
        //     return next(appErr("User not found"));
        // }

        // 2. Find the user who viewed the original user
        const userWhoViewed = await User.findById(req.userAuth);

        // 3. check if original user and userWhoViewed are found
        if(user && userWhoViewed){
            // 4. Check if userWhoViewed is already in the user's viewers array
            const isUserAlreadyViewed = user.viewers.find(
                viewer => viewer.toString() === userWhoViewed._id.toString());

            if(isUserAlreadyViewed){
                return next(appErr("You already viewed this profile"));
            }
            else{
                // 5. push the userWhoViewed to the original user's the viewers array
                user.viewers.push(userWhoViewed._id);
                // 6. save the user
                await user.save();
                res.json({
                    status:"success",
                    data:"you have successfully viewed the profile"
                });
            }
        }
    }catch (error) {
        next(appErr(error.message));
    }
};

// following
const followingCtrl = async(req,res, next)=>{
    try {
        // 1. find the user to follow
        const userToFollow = await User.findById(req.params.id);

        // 2. find the user who is following
        const userWhoFollowed = await User.findById(req.userAuth);

        // 3. check if userToFollow and userWhoFollowed are found
        if(userWhoFollowed && userToFollow){
            // 4. check if userWhoFollowed is already in userToFollow's followers array
            const isUserAlreadyFollowed = userToFollow.followers.find(
                follower => follower.toString() === userWhoFollowed._id.toString());

            if(isUserAlreadyFollowed){
                return next(appErr("You already follow this user"));
            }
            else{
                // 5. push userWhoFollowed into userToFollow's followers array
                userToFollow.followers.push(userWhoFollowed._id);
                // 6. push userToFollow into userWhoFollowed following array
                userWhoFollowed.following.push(userToFollow._id);

                // 7. save the both users
                await userToFollow.save();
                await userWhoFollowed.save();
                res.json({
                    status:"success",
                    data:"you have successfully followed the user"
                });
            }
        }
    } catch (error) {
        next(appErr(error.message));
    }
};

// unfollow
const unfollowCtrl = async(req,res, next)=>{
    try {
        // 1. find the user to unfollow
        const userToUnfollow = await User.findById(req.params.id);

        // 2. find the user who is unfollowing
        const userWhoUnfollowed = await User.findById(req.userAuth);

        // 3. check if userToUnfollow and userWhoUnfollowed are found
        if(userToUnfollow && userWhoUnfollowed){
            // 4. check if userWhoUnfollowed is already in userToUnfollow's followers array
            const isUserAlreadyFollowed = userToUnfollow.followers.find(
                follwer => follwer.toString() === userWhoUnfollowed._id.toString());

            if(!isUserAlreadyFollowed){
                return next(appErr("You have not followed this user"));
            }
            else{
                // 5. remove userToUnfollow from userWhoUnfollowed following array
                userWhoUnfollowed.following = userWhoUnfollowed.following.filter(
                    follower => follower.toString() !== userToUnfollow._id.toString());

                await userWhoUnfollowed.save();

                // 6. remove userWhoUnfollowed from userToUnfollow followers array
                userToUnfollow.followers = userToUnfollow.followers.filter(
                    follower => follower.toString() !== userWhoUnfollowed._id.toString());

                await userToUnfollow.save();

                res.json({
                    status:"success",
                    data:"you have successfully unfollowed the user"
                });
            }

        }

    } catch (error) {
        next(appErr(error.message));
    }
};

// block
const blockUserCtrl = async(req,res,next)=>{
    try {
        // 1. find the user to be blocked
        const userToBeBlocked = await User.findById(req.params.id);

        // 2. find the user who is blocking
        const userWhoBlocked = await User.findById(req.userAuth);

        // 3. check if userToBeBlocked and userWhoBlocked are found
        if(userToBeBlocked && userWhoBlocked){
            // 4. check if userToBeBlocked is already in userWhoBlocked's blocked array
            const isUserAlreadyBlocked = userWhoBlocked.blocked.find(
                blocked => blocked.toString() === userToBeBlocked._id.toString());

            if(isUserAlreadyBlocked){
                return next(appErr("You have already blocked this user"));
            }
            else{
                // 5. Push userToBeBlocked in userWhoBlocked's blocked array
                userWhoBlocked.blocked.push(userToBeBlocked._id);
                await userWhoBlocked.save();
                res.json({
                    status:"success",
                    data:"You successfully blocked the user"
                });
            }
        }

    } catch (error) {
        next(appErr(error.message));
    }
};

// unblock
const unblockUserCtrl = async(req,res,next)=>{
    try {
        // 1. find the user to be unblocked
        const userToBeUnblocked = await User.findById(req.params.id);

        // 2. find the user who is unblocking
        const userWhoUnblocked = await User.findById(req.userAuth);

        // 3. check if userToBeUnblocked and userWhoUnblocked are found
        if(userToBeUnblocked && userWhoUnblocked){
            // 4. check if userToBeUnblocked is already in userWhoUnblocked's blocked array
            const isUserAlreadyBlocked = userWhoUnblocked.blocked.find(
                blocked => blocked.toString() === userToBeUnblocked._id.toString());

            if(!isUserAlreadyBlocked){
                return next(appErr("You have not blocked this user"));
            }
            else{
                // 5. Remove userToBeUnblocked from userWhoUnblocked's blocked array
                userWhoUnblocked.blocked = userWhoUnblocked.blocked.filter(
                    blocked => blocked.toString() !== userToBeUnblocked._id.toString());

                await userWhoUnblocked.save();
                res.json({
                    status:"success",
                    data:"You successfully unblocked the user"
                });
            }
        }

    } catch (error) {
        next(appErr(error.message));
    }
};

// admin-block
const adminBlockUserCtrl = async(req,res,next)=>{
    try {
        // 1. find the user to be blocked
        const userToBeBlocked = await User.findById(req.params.id);

        // find which Admin is unblocking
        const admin = await User.findById(req.userAuth);

        // 2. check if user found
        if(!userToBeBlocked){
            return next(appErr("User not found"));
        }
        // 3. change isBlocked to True
        else{
            userToBeBlocked.isBlocked = true;
            await userToBeBlocked.save();
            res.json({
                status:"success",
                data:`Admin ${admin.email} has successfully blocked the user`
            });
        }
    } catch (error) {
        next(appErr(error.message));
    }
};

// admin-unblock
const adminUnblockUserCtrl = async(req,res,next)=>{
    try {
        // 1. find the user to be unblocked
        const userToBeUnblocked = await User.findById(req.params.id);

        // find which Admin is unblocking
        const admin = await User.findById(req.userAuth);

        // 2. check if user found
        if(!userToBeUnblocked){
            return next(appErr("User not found"));
        }
        // 3. change isBlocked to false
        else{
            userToBeUnblocked.isBlocked = false;
            await userToBeUnblocked.save();
            res.json({
                status:"success",
                data:`Admin ${admin.email} has successfully unblocked the user`
            });
        }
    } catch (error) {
        next(appErr(error.message));
    }
};

// all users
const usersCtrl = async(req,res,next)=>{
    try {
        const users = await User.find();
        res.json({
            status:"success",
            data: users
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

// profile
const userProfileCtrl = async(req,res,next)=>{
    try {
        const user = await User.findById(req.userAuth);
        if(!user){
            return next(appErr("User not found"));
        }
        res.json({
            status:"success",
            data: user
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

// delete
const userDeleteCtrl = async(req,res,next)=>{
    try {
        // find the user to be deleted
        const userToDelete = await User.findById(req.userAuth);
        if(!userToDelete){
            return next(appErr("User not found", 403));
        }
        // find all the posts to deleted
        await Post.deleteMany({user:req.userAuth});
        // delete all the comments
        await Comment.deleteMany({user:req.userAuth});
        // Delete all the categories
        await Category.deleteMany({user:req.userAuth});
        // Delelte the user
        await userToDelete.delete();

        res.json({
            status:"success",
            data:"you have successfully deleted your account"
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

// update
const userUpdateCtrl = async(req,res,next)=>{
    const {email, firstname, lastname} = req.body;
    try {
        // check if email is not taken
        if(email){
            const emailTaken = await User.findOne({email});
            if(emailTaken){
                return next(appErr("Email is already taken",400));
            }
        }

        // update the user
        const user = await User.findByIdAndUpdate(
            req.userAuth,
            {
                lastname,
                firstname,
                email
            },
            {
                new:true,
                runValidators:true
            }
        );
        if(!user){
            return next(appErr("User not found", 403));
        }

        // send response
        res.json({
            status:"success",
            data: user
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

// update password
const updatePasswordCtrl = async(req,res,next)=>{
    const {password} = req.body;
    try {
        if(password){
            // hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);

            // update the user
            await User.findByIdAndUpdate(
                req.userAuth,
                {
                    password : hashedPassword
                },
                {
                    new:true,
                    runValidators:true
                }
            );
            res.json({
                status:"success",
                data: "password has been changed successfully"
            });
        } else{
            return next(appErr("Please provide password field"));
        }
    } catch (error) {
        next(appErr(error.message));
    }
}

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
    whoViewedMyProfileCtrl,
    followingCtrl,
    unfollowCtrl,
    blockUserCtrl,
    unblockUserCtrl,
    adminBlockUserCtrl,
    adminUnblockUserCtrl,
    updatePasswordCtrl
};