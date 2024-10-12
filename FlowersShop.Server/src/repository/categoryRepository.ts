import db from "../configuration/mysqlDb";
import { Category } from "../model/entity/category";

export class CategoryRepository {
    private async create(category: Category) :Promise<Category> {
        try {
            const [result]: any = await db.execute("INSERT INTO categories (id, name) VALUES (?, ?)", [
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
            const [result]: any = await db.execute(
                `UPDATE categories SET name = ? WHERE id = ?`, 
                [category.name, category.id]
            );
        } catch (error) {
            throw new Error("Update category error: " + error);
        }

        return Promise.resolve(category);
    }

    public async getCategoryById(id: string): Promise<Category> {
        let result: any;

        try {
            const [result]: any = await db.execute("SELECT * FROM categories WHERE id = ?", [id]);
        } catch (error) {
            throw new Error("Get category by id error: " + error);
        }

        const category: Category = {
            id: result[0].id,
            name: result[0].name
        };

        return Promise.resolve(category);
    }

    public async getAll(): Promise<Category[]> {
        let result: any;

        try {
            const [result]: any = await db.execute("SELECT * FROM categories");
        } catch (error) {
            throw new Error("Get all category error: " + error);
        }

        const categories: Category[] = result.map((row: any) => ({
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

    public async delete(category: Category): Promise<Category> {
        try {
            await this.getCategoryById(category.id);
        } catch (error) {
            throw error;            
        }

        try {
            await db.execute("DELETE FROM categories WHERE id = ?", category.id);
        } catch(error) {
            throw new Error("Delete category error: " + error);
        }

        return Promise.resolve(await this.create(category));
    }
}
