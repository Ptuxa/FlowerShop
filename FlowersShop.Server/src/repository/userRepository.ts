import db from "../configuration/mysqlDb";
import { User } from "../model/entity/user";

export class UserRepository {
    private async create(user: User) :Promise<User> {
        try {
            await db.execute("INSERT INTO users (id, email, password, role) VALUES (?, ?, ?, ?)", [
                user.id,
                user.email,
                user.password,
                user.role,
            ]);            
        } catch (error) {
            throw new Error("Save user error: " + error);
        }

        return Promise.resolve(user);
    }

    private async update(user: User):Promise<User> {    
        try {
            const [result]: any = await db.execute(
                `UPDATE users SET email = ?, password = ?, role = ? WHERE id = ?`, 
                [user.email, user.password, user.role, user.id]
            );
        } catch (error) {
            throw new Error("Update user error: " + error);
        }

        return Promise.resolve(user);
    }

    public async getUserById(id: string): Promise<User> {
        let result: any;

        try {
            const [result]: any = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
        } catch (error) {
            throw new Error("Get user by id error: " + error);
        }

        const user: User = {
            id: result[0].id,
            email: result[0].email,
            password: result[0].password,
            role: result[0].role,
        };

        return Promise.resolve(user);
    }

    public async getAll(): Promise<User[]> {
        let result: any;

        try {
            const [result]: any = await db.execute("SELECT * FROM users");
        } catch (error) {
            throw new Error("Get all user error: " + error);
        }

        const users: User[] = result.map((row: any) => ({
            id: row.id,
            email: row.email,
            password: row.password,
            role: row.role,
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
        } catch(error) {
            throw error;
        }
    }

    public async delete(user: User): Promise<User> {
        try {
            await this.getUserById(user.id);
        } catch (error) {
            throw error;            
        }

        try {
            await db.execute("DELETE FROM users WHERE id = ?", user.id);
        } catch(error) {
            throw new Error("Delete user error: " + error);
        }

        return Promise.resolve(await this.create(user));
    }
}
