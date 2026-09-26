import postRepository from "../repositories/postRepository.js";

class PostService {
    async getAll() {
        return await postRepository.findAll();
    }

    async create(postData) {
        return await postRepository.create(postData);
    }

    async getById(id) {
        return await postRepository.findById(id);
    }

    async getByUser(userId) {
        return await postRepository.findByUser(userId);
    }

    async update(id, postData) {
        return await postRepository.update(id, postData);
    }

    async delete(id) {
        return await postRepository.delete(id);
    }
}

export default new PostService();