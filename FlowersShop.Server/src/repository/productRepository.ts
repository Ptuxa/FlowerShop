import { RowDataPacket } from "mysql2";
import db from "../configuration/mysqlDb";
import { Product } from "../model/entity/product";

export class ProductRepository {
    private async create(product: Product): Promise<Product> {
        try {
            await db.query(
                "INSERT INTO products (id, category_id, name, amount, price, image_name) VALUES (?, ?, ?, ?, ?, ?)",
                [product.id, product.categoryId, product.name, product.amount, product.price, product.imageName]
            );
        } catch (error) {
            throw new Error("Save product error: " + error);
        }

        return Promise.resolve(product);
    }

    private async update(product: Product): Promise<Product> {
        try {
            await db.query(
                `UPDATE products SET category_id = ?, name = ?, amount = ?, price = ?, image_name = ? WHERE id = ?`,
                [product.categoryId, product.name, product.amount, product.price, product.imageName, product.id]
            );
        } catch (error) {
            throw new Error("Update product error: " + error);
        }

        return Promise.resolve(product);
    }

    public async updateCategoriesIdByCategoryId(categoryIdOld: string, categoryIdNew: string | null): Promise<void> {
        try {
            await db.query(
                `UPDATE products SET category_id = ? WHERE category_id = ?`,
                [categoryIdNew, categoryIdOld]
            );
        } catch (error) {
            throw new Error("Update product error: " + error);
        }
    }

    public async getProductById(id: string): Promise<Product> {
        let rows: RowDataPacket[];
        try {
            [rows] = await db.query<RowDataPacket[]>(
                "SELECT `id`, `category_id`, `name`, `amount`, `price`, `image_name` FROM `products` WHERE `id` = ?",
                [id]
            );
        } catch (error) {
            throw new Error("Get product by id error: " + error);
        }

        if (rows.length === 0) {
            throw new Error("Product not found");
        }

        const product: Product = {
            id: rows[0].id,
            categoryId: rows[0].category_id,
            name: rows[0].name,
            amount: rows[0].amount,
            price: rows[0].price,
            imageName: rows[0].image_name,
        };

        return Promise.resolve(product);
    }

    public async getAll(): Promise<Product[]> {
        let rows: RowDataPacket[];

        try {
            [rows] = await db.query<RowDataPacket[]>("SELECT * FROM `products`");
        } catch (error) {
            throw new Error("Get all product error: " + error);
        }

        const products: Product[] = rows.map((row: any) => ({
            id: row.id,
            categoryId: row.category_id,
            name: row.name,
            amount: row.amount,
            price: row.price,
            imageName: row.image_name,
        }));

        return Promise.resolve(products);
    }

    public async getAllByCategoryIds(categoryIds: string[]): Promise<Product[]> {
        let rows: RowDataPacket[];

        if (categoryIds.length === 0)
        {
            return await this.getAll();
        }

        const categorIdsString = categoryIds.map(() => '?').join(', ');

        try {
            [rows] = await db.query<RowDataPacket[]>(`SELECT * FROM \`products\` WHERE \`category_id\` IN (${categorIdsString});`, );
        } catch (error) {
            throw new Error("Get all product error: " + error);
        }

        const products: Product[] = rows.map((row: any) => ({
            id: row.id,
            categoryId: row.category_id,
            name: row.name,
            amount: row.amount,
            price: row.price,
            imageName: row.image_name,
        }));

        return Promise.resolve(products);
    }

    public async save(product: Product): Promise<Product> {
        let isExistProduct: Boolean = true;

        try {
            await this.getProductById(product.id);
        } catch (error) {
            isExistProduct = false;
        }

        try {
            if (isExistProduct) {
                return Promise.resolve(await this.update(product));
            }

            return Promise.resolve(await this.create(product));
        } catch (error) {
            throw error;
        }
    }

    public async deleteById(id: string): Promise<void> {
        try {
            await this.getProductById(id);
        } catch (error) {
            throw error;
        }

        try {
            await db.query("DELETE FROM products WHERE id = ?", id);
        } catch (error) {
            throw new Error("Delete product error: " + error);
        }
    }
}
