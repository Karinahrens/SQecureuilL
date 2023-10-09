const { Router } = require("express");

const postsController = require("../controllers/postsController");

const postsRouter = Router();

florinRouter.get("/", postsController.index);
florinRouter.get("/:id", postsController.show);
florinRouter.post("/", postsController.create);
florinRouter.delete("/:id", postsController.destroy);
florinRouter.patch("/:id", postsController.update);

module.exports = postsRouter;