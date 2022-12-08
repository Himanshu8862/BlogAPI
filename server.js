const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/users/userRoutes");
const postRouter = require("./routes/posts/postRoutes");
const categoryRouter = require("./routes/categories/categoryRoute");
const commentRouter = require("./routes/comments/commentRouter");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const isAdmin = require("./middlewares/isAdmin");

dotenv.config();
require("./config/dbConnect");
const app = express();

// so that we can open in localhost:9000
app.get("/", (req,res)=>{
    res.send("We are building BlogAPI");
});


// MIDDLEWARE
app.use(express.json());    // parse incoming payload
// app.use(isAdmin);           // if implemented like this login and register should also have authorization header of currently logged-in user which does not make sense


// ROUTES
app.use("/api/v1/users",userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/categories", categoryRouter);


// ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

// 404 error
app.use("*", (req,res)=>{
    res.status(404).json({
        message : `${req.originalUrl} - Route Not Found`
    });
});

// LISTEN TO SERVER
const PORT = process.env.PORT || 9000
app.listen(PORT, console.log(`Server is up and running on ${PORT}`));