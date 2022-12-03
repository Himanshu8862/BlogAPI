const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
require("./config/dbConnect");
const app = express();


// MIDDLEWARE

// ----------
// ROUTES
// ----------

// ---- Users Routes ----

// POST/api/v1/users/register
app.post("/api/v1/users/register", async(req,res)=>{
    try {
        res.json({
            status:"Success",
            data:"User registered"
        });
    } catch (error) {
        res.json(error.message);
    }
});

// POST/api/v1/users/login
app.post("/api/v1/users/login", async(req,res)=>{
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
app.get("/api/v1/users/profile/:id", async(req,res)=>{
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
app.get("/api/v1/users/", async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"Users route"
        });
    } catch (error) {
        res.json(error.message);
    }
});

// DELETE/api/v1/users/:id
app.delete("/api/v1/users/:id", async(req,res)=>{
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
app.put("/api/v1/users/:id", async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"Update user route"
        });
    } catch (error) {
        res.json(error.message);
    }
});

// ---- Posts Routes ----

// POST/api/v1/posts
app.post("/api/v1/posts", async(req,res)=>{
    try {
        res.json({
            status:"Success",
            data:"post created"
        });
    } catch (error) {
        res.json(error.message);
    }
});

// GET/api/v1/posts/:id
app.get("/api/v1/posts/:id", async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"post route"
        });
    } catch (error) {
        res.json(error.message);
    }
});

// GET/api/v1/posts/
app.get("/api/v1/posts/", async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"Posts route"
        });
    } catch (error) {
        res.json(error.message);
    }
});

// DELETE/api/v1/posts/:id
app.delete("/api/v1/posts/:id", async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"Delete post route"
        });
    } catch (error) {
        res.json(error.message);
    }
});

// PUT/api/v1/posts/:id
app.put("/api/v1/posts/:id", async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"Update post route"
        });
    } catch (error) {
        res.json(error.message);
    }
});

// ---- Comments Routes ----

// POST/api/v1/comments
app.post("/api/v1/comments", async(req,res)=>{
    try {
        res.json({
            status:"Success",
            data:"comment created"
        });
    } catch (error) {
        res.json(error.message);
    }
});

// GET/api/v1/comments/:id
app.get("/api/v1/comments/:id", async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"comment route"
        });
    } catch (error) {
        res.json(error.message);
    }
});


// DELETE/api/v1/comments/:id
app.delete("/api/v1/comments/:id", async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"Delete comment route"
        });
    } catch (error) {
        res.json(error.message);
    }
});

// PUT/api/v1/comments/:id
app.put("/api/v1/comments/:id", async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"Update comment route"
        });
    } catch (error) {
        res.json(error.message);
    }
});

// ---- Categories Routes ----

// POST/api/v1/categories
app.post("/api/v1/categories", async(req,res)=>{
    try {
        res.json({
            status:"Success",
            data:"category created"
        });
    } catch (error) {
        res.json(error.message);
    }
});

// GET/api/v1/categories/:id
app.get("/api/v1/categories/:id", async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"category route"
        });
    } catch (error) {
        res.json(error.message);
    }
});

// DELETE/api/v1/categories/:id
app.delete("/api/v1/categories/:id", async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"Delete category route"
        });
    } catch (error) {
        res.json(error.message);
    }
});

// PUT/api/v1/categories/:id
app.put("/api/v1/categories/:id", async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"Update category route"
        });
    } catch (error) {
        res.json(error.message);
    }
});


// ERROR HANDLING MIDDLEWARE
// LISTEN TO SERVER

const PORT = process.env.PORT || 9000
app.listen(PORT, console.log(`Server is up and running on ${PORT}`));