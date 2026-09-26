import userRepository from "../repositories/userRepository.js";

class UserService {
    async getAll() {
        return await userRepository.findAll();
    }

    async create(userData) {
        return await userRepository.create(userData);
    }

    async getById(id) {
        return await userRepository.findById(id);
    }
}

export default new UserService();