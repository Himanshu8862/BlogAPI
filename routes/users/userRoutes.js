const express = require("express");
const storage = require("../../config/cloudinary");
const {
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
}= require("../../controllers/users/userCtrl");

const multer = require("multer")
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");

const userRouter = express.Router();


// instance of multer
const upload = multer({storage});

// POST/api/v1/users/register
userRouter.post("/register", userRegisterCtrl);

// POST/api/v1/users/login
userRouter.post("/login", userLoginCtrl);

// GET/api/v1/users/profile/:id
userRouter.get("/profile/",isLogin, userProfileCtrl);

// GET/api/v1/users/
userRouter.get("/", usersCtrl);

// DELETE/api/v1/users/delete-account
userRouter.delete("/delete-account", isLogin, userDeleteCtrl);

// PUT/api/v1/users/
userRouter.put("/", isLogin, userUpdateCtrl);

// GET/api/v1/users/profile-viewers/:id         here :id is the id of the user whose profile is being viewed
userRouter.get("/profile-viewers/:id", isLogin, whoViewedMyProfileCtrl);

// GET/api/v1/users/following/:id         here :id is the id of the user whom you want to follow
userRouter.get("/following/:id", isLogin, followingCtrl);

// GET/api/v1/users/unfollowing/:id         here :id is the id of the user whom you want to unfollow
userRouter.get("/unfollowing/:id", isLogin, unfollowCtrl);

// GET/api/v1/users/blocked/:id         here :id is the id of the user whom you want to block
userRouter.get("/blocked/:id", isLogin, blockUserCtrl);

// GET/api/v1/users/unblock/:id         here :id is the id of the user whom you want to unblock
userRouter.get("/unblock/:id", isLogin, unblockUserCtrl);

// PUT/api/v1/users/admin-block/:id         here :id is the id of the user who admin wants to block
userRouter.put("/admin-block/:id", isLogin, isAdmin, adminBlockUserCtrl);

// PUT/api/v1/users/admin-unblock/:id         here :id is the id of the user who admin wants to unblock
userRouter.put("/admin-unblock/:id", isLogin, isAdmin, adminUnblockUserCtrl);

// PUT/api/v1/users/update-password/
userRouter.put("/update-password", isLogin, updatePasswordCtrl);


// POST/api/v1/users/profile-photo-upload
userRouter.post("/profile-photo-upload", isLogin, upload.single("profile"), profilePhotoUploadCtrl); // chaining multiple middleware

module.exports = userRouter;