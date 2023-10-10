const { Router } = require("express");

const postsController = require("../controllers/postsController");

const postsRouter = Router();

postsRouter.get("/", postsController.index);
postsRouter.get("/Category/:id", postsController.indexCategory);
postsRouter.get("/Date", postsController.indexDate);
postsRouter.get("/Vote", postsController.indexVote);
postsRouter.get("/Status", postsController.indexStatus);
postsRouter.get("/:id", postsController.show);
postsRouter.get("/order", postsController.orderBy);
postsRouter.post("/", postsController.create);
postsRouter.delete("/:id", postsController.destroy);
postsRouter.patch("/:id", postsController.update);

module.exports = postsRouter;