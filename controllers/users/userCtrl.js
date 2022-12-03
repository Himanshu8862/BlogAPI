// register
const userRegisterCtrl = async(req,res)=>{
    try {
        res.json({
            status:"Success",
            data:"User registered"
        });
    } catch (error) {
        res.json(error.message);
    }
}

// login
const userLoginCtrl = async(req,res)=>{
    try {
        res.json({
            status:"Success",
            data:"User login"
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
        res.json({
            status:"success",
            data:"Profile route"
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