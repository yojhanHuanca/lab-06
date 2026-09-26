import { Router } from "express";
import postService from "../services/postService.js";
import postController from "../controllers/postController.js";
import userController from "../controllers/userController.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const posts = await postService.getAll();
        res.render("home", { title: "Inicio", posts });
    } catch (error) {
        res.status(500).render("error", { message: error.message });
    }
});

router.route("/users")
    .get(userController.index)
    .post(userController.store);

router.route("/posts")
    .get(postController.index)
    .post(postController.create);

router.get("/posts/new", postController.newForm);

router.get("/posts/:id/edit", postController.edit);

router.route("/posts/:id")
    .put(postController.update)
    .delete(postController.delete);

export default router;