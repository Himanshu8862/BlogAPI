const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/users/userRoutes");
const postRouter = require("./routes/posts/postRoutes");
const categoryRouter = require("./routes/categories/categoryRoute");
const commentRouter = require("./routes/comments/commentRouter");

dotenv.config();
require("./config/dbConnect");
const app = express();


// MIDDLEWARE

// ROUTES
app.use("/api/v1/users",userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/categories", categoryRouter);


// ERROR HANDLING MIDDLEWARE
// LISTEN TO SERVER

const PORT = process.env.PORT || 9000
app.listen(PORT, console.log(`Server is up and running on ${PORT}`));