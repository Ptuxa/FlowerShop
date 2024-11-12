import { RowDataPacket } from "mysql2";
import db from "../configuration/mysqlDb";
import { User } from "../model/entity/user";
import { getRoleFromString } from "../model/enum/enumUserRole";

export class UserRepository {
    private async create(user: User): Promise<User> {
        try {
            await db.query(
                "INSERT INTO users (id, email, password, role) VALUES (?, ?, ?, ?)",
                [user.id, user.email, user.password, user.role]
            );
        } catch (error) {
            throw new Error("Save user error: " + error);
        }

        return Promise.resolve(user);
    }

    private async update(user: User): Promise<User> {
        try {
            await db.query(
                `UPDATE users SET email = ?, password = ?, role = ? WHERE id = ?`,
                [user.id, user.email, user.password, user.role]
            );
        } catch (error) {
            throw new Error("Update user error: " + error);
        }

        return Promise.resolve(user);
    }

    public async getUserById(id: string): Promise<User> {
        let rows: RowDataPacket[];
        try {
            [rows] = await db.query<RowDataPacket[]>(
                "SELECT `id`, `email`, `password`, `role` FROM `users` WHERE `id` = ?",
                [id]
            );
        } catch (error) {
            throw new Error("Get user by id error: " + error);
        }

        if (rows.length === 0) {
            throw new Error("User not found");
        }

        const user: User = {
            id: rows[0].id,
            email: rows[0].email,
            password: rows[0].password,
            role: getRoleFromString(rows[0].role),
        };

        return Promise.resolve(user);
    }

    public async getAll(): Promise<User[]> {
        let rows: RowDataPacket[];

        try {
            [rows] = await db.query<RowDataPacket[]>("SELECT * FROM `users`");
        } catch (error) {
            throw new Error("Get all user error: " + error);
        }

        const users: User[] = rows.map((row: any) => ({
            id: row.id,
            email: row.email,
            password: row.password,
            role: row.role
        }));

        return Promise.resolve(users);
    }

    public async save(user: User): Promise<User> {
        let isExistUser: Boolean = true;

        try {
            await this.getUserById(user.id);
        } catch (error) {
            isExistUser = false;
        }

        try {
            if (isExistUser) {
                return Promise.resolve(await this.update(user));
            }

            return Promise.resolve(await this.create(user));
        } catch (error) {
            throw error;
        }
    }

    public async getUserByEmail(email: string) {
        let rows: RowDataPacket[];
        try {
            [rows] = await db.query<RowDataPacket[]>(
                "SELECT `id`, `email`, `password`, `role` FROM `users` WHERE `email` = ?",
                [email]
            );
        } catch (error) {
            throw new Error("Get user by email error: " + error);
        }

        if (rows.length === 0) {
            throw new Error("User not found");
        }

        const user: User = {
            id: rows[0].id,
            email: rows[0].email,
            password: rows[0].password,
            role: getRoleFromString(rows[0].role),
        };

        return Promise.resolve(user);
    }

    public async deleteById(id: string): Promise<void> {
        try {
            await this.getUserById(id);
        } catch (error) {
            throw error;
        }

        try {
            await db.query("DELETE FROM users WHERE id = ?", id);
        } catch (error) {
            throw new Error("Delete user error: " + error);
        }
    }
}
