import userService from "../services/userService.js";

class UserController {
    async index(req, res) {
        try {
            const users = await userService.getAll();
            res.render("users", { users });
        } catch (error) {
            res.status(500).render("error", { message: error.message });
        }
    }

    async store(req, res) {
        try {
            const user = await userService.create(req.body);
            res.redirect("/users");
        } catch (error) {
            res.status(500).render("error", { message: error.message });
        }
    }
}

export default new UserController();