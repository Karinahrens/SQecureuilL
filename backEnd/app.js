const express = require("express");
const cors = require("cors");

const postsRouter = require("./routers/posts");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/posts", postsRouter);

app.get("/", (req, res) => {
  res.json({
        title: "Florin County Council Issue Reporting App",
        description: "An issues reporting and tracking app for Florin County Council"
    })
});

module.exports = app;