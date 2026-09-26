import mongoose from "mongoose";
import postService from "../services/postService.js";
import userService from "../services/userService.js";

const fields = body => ({
    title: (body.title || "").trim(),
    content: (body.content || "").trim(),
    user: body.user || "",
    imageUrl: (body.imageUrl || "").trim(),
    hashtags: (body.hashtags || "").split(",").map(tag => tag.trim().replace(/^#/, "")).filter(Boolean)
});

const errorMessage = error => error.name === "ValidationError"
    ? Object.values(error.errors).map(item => item.message).join(" · ")
    : "No se pudo guardar la publicación. Inténtalo de nuevo.";

class PostController {
    async index(req, res) {
        try {
            const posts = await postService.getAll();
            res.render("posts/index", { posts, notice: req.query.notice });
        } catch (error) {
            res.status(500).render("error", { message: error.message });
        }
    }

    async newForm(req, res) {
        try {
            const users = await userService.getAll();
            res.render("posts/form", { post: null, action: "/posts", method: "POST", users, error: null });
        } catch (error) {
            res.status(500).render("error", { message: error.message });
        }
    }

    async create(req, res) {
        const postData = fields(req.body);
        try {
            if (!mongoose.isValidObjectId(postData.user) || !await userService.getById(postData.user)) {
                throw new Error("Selecciona un usuario existente.");
            }
            await postService.create(postData);
            res.redirect("/posts?notice=created");
        } catch (error) {
            const users = await userService.getAll();
            res.status(400).render("posts/form", { post: postData, action: "/posts", method: "POST", users, error: error.name === "ValidationError" ? errorMessage(error) : error.message });
        }
    }

    async edit(req, res) {
        try {
            if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).render("error", { message: "Publicación no encontrada." });
            const post = await postService.getById(req.params.id);
            if (!post) return res.status(404).render("error", { message: "Publicación no encontrada." });
            const users = await userService.getAll();
            res.render("posts/form", { post, action: `/posts/${post._id}`, method: "PUT", users, error: null });
        } catch (error) {
            res.status(500).render("error", { message: error.message });
        }
    }

    async update(req, res) {
        const postData = fields(req.body);
        try {
            if (!mongoose.isValidObjectId(req.params.id) || !await postService.getById(req.params.id)) return res.status(404).render("error", { message: "Publicación no encontrada." });
            if (!mongoose.isValidObjectId(postData.user) || !await userService.getById(postData.user)) throw new Error("Selecciona un usuario existente.");
            await postService.update(req.params.id, postData);
            res.redirect("/posts?notice=updated");
        } catch (error) {
            const users = await userService.getAll();
            res.status(400).render("posts/form", { post: { ...postData, _id: req.params.id }, action: `/posts/${req.params.id}`, method: "PUT", users, error: error.name === "ValidationError" ? errorMessage(error) : error.message });
        }
    }

    async delete(req, res) {
        try {
            if (!mongoose.isValidObjectId(req.params.id) || !await postService.delete(req.params.id)) return res.status(404).render("error", { message: "Publicación no encontrada." });
            res.redirect("/posts?notice=deleted");
        } catch (error) {
            res.status(500).render("error", { message: error.message });
        }
    }
}

export default new PostController();
