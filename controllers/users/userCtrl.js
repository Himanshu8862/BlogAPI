const bcrypt = require("bcryptjs");
const User = require("../../model/User/User");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeader = require("../../utils/getTokenFromHeader");



// register
const userRegisterCtrl = async(req,res)=>{
    const {firstname, lastname, profilePhoto, email, password} = req.body;
    try {
        // check if email exists
        const userFound = await User.findOne({email});
        if(userFound){
            return res.json({
                "msg" : "User already exists"
            })
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
        res.json(error.message);
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

module.exports = {
    userRegisterCtrl,
    userLoginCtrl,
    usersCtrl,
    userProfileCtrl,
    userDeleteCtrl,
    userUpdateCtrl
};