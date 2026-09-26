import Post from "../models/Post.js";

class PostRepository {
    async create(post) {
        return await Post.create(post);
    }

    async findAll() {
        return await Post.find().sort({ createdAt: -1 }).populate("user", "name lastName email");
    }

    async findById(id) {
        return await Post.findById(id).populate("user", "name lastName email");
    }

    async findByUser(userId) {
        return await Post.find({ user: userId }).populate("user", "name lastName email");
    }

    async update(id, postData) {
        return await Post.findByIdAndUpdate(id, { ...postData, updatedAt: new Date() }, { new: true, runValidators: true });
    }

    async delete(id) {
        return await Post.findByIdAndDelete(id);
    }
}

export default new PostRepository();
