const express = require("express");

const commentRouter = express.Router();

// POST/api/v1/comments
commentRouter.post("/", async(req,res)=>{
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
commentRouter.get("/:id", async(req,res)=>{
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
commentRouter.delete("/:id", async(req,res)=>{
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
commentRouter.put("/:id", async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"Update comment route"
        });
    } catch (error) {
        res.json(error.message);
    }
});


module.exports = commentRouter;