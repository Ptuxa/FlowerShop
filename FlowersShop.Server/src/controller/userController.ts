import { Request, Response } from "express";

class UserController {
    // // Создание нового пользователя
    // public async createUser(req: Request, res: Response): Promise<void> {
    //     const { id, email, password, role }: UserDto = req.body;

    //     try {
    //         await db.query("INSERT INTO users (id, email, password, role) VALUES (?, ?, ?, ?)", [
    //             id,
    //             email,
    //             password,
    //             role,
    //         ]);
    //         res.status(201).json({ message: "User created successfully!" });
    //     } catch (error) {
    //         res.status(500).json({ error: "Failed to create user" });
    //     }
    // }

    // // Получение всех пользователей
    // public async getUsers(req: Request, res: Response): Promise<void> {
    //     try {
    //         const [users] = await db.query("SELECT * FROM users");
    //         res.status(200).json(users);
    //     } catch (error) {
    //         res.status(500).json({ error: "Failed to fetch users" });
    //     }
    // }

    // // Обновление пользователя
    // public async updateUser(req: Request, res: Response): Promise<void> {
    //     const { id, email, password, role }: UserDto = req.body;

    //     try {
    //         await db.query("UPDATE users SET email = ?, password = ?, role = ? WHERE id = ?", [
    //             email,
    //             password,
    //             role,
    //             id,
    //         ]);
    //         res.status(200).json({ message: "User updated successfully!" });
    //     } catch (error) {
    //         res.status(500).json({ error: "Failed to update user" });
    //     }
    // }
}

export default new UserController();
