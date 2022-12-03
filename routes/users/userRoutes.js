const express = require("express");

const userRouter = express.Router();

// POST/api/v1/users/register
userRouter.post("/register", async(req,res)=>{
    try {
        res.json({
            status:"Success",
            data:"User registered"
        });
    } catch (error) {
        res.json(error.message);
    }
})

// POST/api/v1/users/login
userRouter.post("/login", async(req,res)=>{
    try {
        res.json({
            status:"Success",
            data:"User login"
        });
    } catch (error) {
        res.json(error.message);
    }
});

// GET/api/v1/users/profile/:id
userRouter.get("/profile/:id", async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"Profile route"
        });
    } catch (error) {
        res.json(error.message);
    }
});

// GET/api/v1/users/
userRouter.get("/", async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"all Users route"
        });
    } catch (error) {
        res.json(error.message);
    }
});

// DELETE/api/v1/users/:id
userRouter.delete("/:id", async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"Delete user route"
        });
    } catch (error) {
        res.json(error.message);
    }
});

// PUT/api/v1/users/:id
userRouter.put("/:id", async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"Update user route"
        });
    } catch (error) {
        res.json(error.message);
    }
});

module.exports = userRouter;