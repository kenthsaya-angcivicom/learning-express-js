import { UserRepository } from "../db/userRepository";
import { User } from "../models/user";
import { UserId } from "../types/userTypes";

export class UserService {
	private userRepository: UserRepository;

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async getAllUsers(): Promise<User[]> {
		return await this.userRepository.getAllUsers();
	}

	async getUserById(id: UserId): Promise<User> {
		return await this.userRepository.getUserById(id);
	}

	async createUser(user: User): Promise<User> {
		return await this.userRepository.createUser(user);
	}

	async updateUser(user: User): Promise<User> {
		return await this.userRepository.updateUser(user);
	}

}