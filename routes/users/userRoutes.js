const express = require("express");
const storage = require("../../config/cloudinary");
const {
    userRegisterCtrl,
    userLoginCtrl,
    usersCtrl,
    userProfileCtrl,
    userDeleteCtrl,
    userUpdateCtrl,
    profilePhotoUploadCtrl
}= require("../../controllers/users/userCtrl");

const multer = require("multer")
const isLogin = require("../../middlewares/isLogin");

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

// DELETE/api/v1/users/:id
userRouter.delete("/:id", userDeleteCtrl);

// PUT/api/v1/users/:id
userRouter.put("/:id", userUpdateCtrl);

// POST/api/v1/users/profile-photo-upload
userRouter.post("/profile-photo-upload", isLogin, upload.single("profile"), profilePhotoUploadCtrl); // chaining multiple middleware

module.exports = userRouter;