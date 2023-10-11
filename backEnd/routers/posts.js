const { Router } = require("express");

const postsController = require("../controllers/postsController");

const postsRouter = Router();

postsRouter.get("/", postsController.index);
postsRouter.get("/order", postsController.orderBy);
postsRouter.get("/Category/:id", postsController.indexCategory);
postsRouter.get("/Category/:id/Date", postsController.indexCategoryDate);
postsRouter.get("/Category/:id/Vote", postsController.indexCategoryVote);
postsRouter.get("/Category/:id/Status", postsController.indexCategoryStatus);
postsRouter.get("/Date", postsController.indexDate);
postsRouter.get("/Vote", postsController.indexVote);
postsRouter.get("/Status", postsController.indexStatus);
postsRouter.get("/:id", postsController.show);

postsRouter.post("/", postsController.create);
postsRouter.delete("/:id", postsController.destroy);
postsRouter.patch("/:id", postsController.update);

module.exports = postsRouter;
