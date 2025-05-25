import { Request, Response, NextFunction } from "express"
import { UserService } from "../services/userService";
import { User } from "../models/user";

export class UserController {
    constructor(private userService: UserService) {
        this.userService = userService;
    }

    getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users: User[] = await this.userService.getAllUsers();
            res.json(users);
        } catch (err: any) {
            next(err)
        }
    }

    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: User = await this.userService.getUserById(Number(req.params.id));
            res.status(200).json(user)
        } catch (err: any) {
            next(err)
        }
    }

    createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newUser: User = req.body;
            const user: User = await this.userService.createUser(newUser);
            res.status(201).json(user)
        } catch (err: any) {
            next(err)
        }
    }

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updatedUser: User = req.body;
            const user: User = await this.userService.updateUser(updatedUser);
            res.json(user)
        } catch (err: any) {
            next(err)
        }
    }

}