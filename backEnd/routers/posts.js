const { Router } = require("express");

const postsController = require("../controllers/postsController");

const postsRouter = Router();

postsRouter.get("/", postsController.index);
postsRouter.get("/:id", postsController.show);
postsRouter.post("/", postsController.create);
postsRouter.delete("/:id", postsController.destroy);
postsRouter.patch("/:id", postsController.update);

module.exports = postsRouter;