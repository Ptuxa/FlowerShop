import { FieldPacket, RowDataPacket } from "mysql2";
import db from "../configuration/mysqlDb";
import { Category } from "../model/entity/category";

// const pool: Pool = mysql2.createPool({...}).promise();

export class CategoryRepository {
    private async create(category: Category) :Promise<Category> { 
        try {
            await db.query("INSERT INTO categories (id, name) VALUES (?, ?)", [
                category.id,
                category.name,                
            ]);   
        } catch (error) {
            throw new Error("Save category error: " + error);
        }

        return Promise.resolve(category);
    }

    private async update(category: Category):Promise<Category> {    
        try {
            await db.query(
                `UPDATE categories SET name = ? WHERE id = ?`, 
                [category.name, category.id]
            );
        } catch (error) {
            throw new Error("Update category error: " + error);
        }

        return Promise.resolve(category);
    }

    public async getCategoryById(id: string): Promise<Category> {
        let rows: RowDataPacket[];
        try {
            [rows] = await db.query<RowDataPacket[]>(
                "SELECT `id`, `name` FROM `categories` WHERE `id` = ?",
                [id]
            );            
        } catch (error) {
            throw new Error("Get category by id error: " + error);
        }

        if (rows.length === 0) {
            throw new Error("Category not found");
        }
        const category: Category = {
            id: rows[0].id,
            name: rows[0].name
        }
        return Promise.resolve(category);
    };

    public async getAll(): Promise<Category[]> {
        let rows: RowDataPacket[];        
        
        try {
            [rows] = await db.query<RowDataPacket[]>("SELECT id, name FROM categories");
        } catch (error) {
            throw new Error("Get all category error: " + error);
        }

        const categories: Category[] = rows.map((row: any) => ({
            id: row.id,
            name: row.name
        }));
        
        return Promise.resolve(categories);
    }

    public async save(category: Category): Promise<Category> {
        let isExistCategory: Boolean = true;
        
        try {
            await this.getCategoryById(category.id);
        } catch (error) {
            isExistCategory = false;            
        }

        try {
            if (isExistCategory) {
                return Promise.resolve(await this.update(category));
            }

            return Promise.resolve(await this.create(category));
        } catch(error) {
            throw error;
        }
    }

    public async deleteById(id: string): Promise<void> {
        try {
            await this.getCategoryById(id);
        } catch (error) {
            throw error;            
        }

        try {
            await db.query("DELETE FROM categories WHERE id = ?", id);
        } catch(error) {
            throw new Error("Delete category error: " + error);
        }
    }
}
