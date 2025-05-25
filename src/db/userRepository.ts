import { User } from "../models/user"
import { UserId } from "../types/userTypes";
import { getConnection } from "./database";

export class UserRepository {

    async getAllUsers(): Promise<User[]> {
        const connection = await getConnection();
        // logic to fetch all users from database
        const [rows] = await connection.execute<any[]>('SELECT * FROM users');
        return rows.map((row) => new User(row.id, row.name, row.email, row.password));
    }

    async getUserById(id: UserId): Promise<User> {
        const connection = await getConnection();
        // logic to fetch user by id from database
        const [rows] = await connection.execute<any[]>('SELECT * FROM users WHERE id = ?', [id]);
        if (rows.length === 0) {
            throw new Error('User not found');
        }
        return new User(rows[0].id, rows[0].name, rows[0].email, rows[0].password);
    }

    async createUser(user: User): Promise<User> {
        const connection = await getConnection();
        const [result] = await connection.execute(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [user.name, user.email, user.password]
        );


        return new User(
            (result as any)[0].insertId,
            user.name,
            user.email,
            user.password,
        );
    }


    async updateUser(user: User): Promise<User> {
        const connection = await getConnection();
        const [result] = await connection.execute(
            'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
            [user.name, user.email, user.password, user.id]
        );
        if ((result as any).affectedRows === 0) {
            throw new Error('User not found');
        }
        return new User(
            user.id,
            user.name,
            user.email,
            user.password,
        );
    }

}