import { Router } from "express"
import { UserController } from "../controllers/userController";
import { UserService } from "../services/userService";
import { UserRepository } from "../db/userRepository";

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);

export default router;