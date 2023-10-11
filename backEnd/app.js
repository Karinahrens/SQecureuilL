const express = require("express");
const cors = require("cors");
const logger = require('morgan')

const postsRouter = require("./routers/posts");
const userRouter = require("./routers/users");

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger('dev'))

app.use("/posts", postsRouter);
//app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.json({
        title: "Florin County Council Issue Reporting App",
        description: "An issues reporting and tracking app for Florin County Council"
    })
});

module.exports = app;