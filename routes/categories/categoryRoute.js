const express = require("express");

const categoryRouter = express.Router();


// POST/api/v1/categories
categoryRouter.post("/", async(req,res)=>{
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
categoryRouter.get("/:id", async(req,res)=>{
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
categoryRouter.delete("/:id", async(req,res)=>{
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
categoryRouter.put("/:id", async(req,res)=>{
    try {
        res.json({
            status:"success",
            data:"Update category route"
        });
    } catch (error) {
        res.json(error.message);
    }
});


module.exports = categoryRouter;