import { Request, Response } from 'express';
import { CategoryRequest } from "../model/dto/request/categoryRequest";
import { CategoryService } from "../service/impl/categoryService";

class CategoryController {
    private categoryService: CategoryService;

    constructor(categoryService: CategoryService) {
        this.categoryService = categoryService;
    }

    public getCategoryById = async (req: Request, res: Response): Promise<void> => {
        try {
            const categoryResponse = await this.categoryService.getCategoryById(req.params.id);
            res.status(200).json(categoryResponse);
        } catch (error) {
            res.status(404).json({ message: `Category not found: ${(error as Error).message}` });
        }
    };

    public getAllCategories = async (_req: Request, res: Response): Promise<void> => {
        try {
            const categoriesResponse = await this.categoryService.getAllCategories();
            res.status(200).json(categoriesResponse);
        } catch (error) {
            res.status(500).json({ message: `Error retrieving categories: ${(error as Error).message}` });
        }
    };

    public createCategory = async (req: Request, res: Response): Promise<void> => {
        try {
            const categoryRequest: CategoryRequest = req.body;
            const newCategory = await this.categoryService.createCategory(categoryRequest);
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(400).json({ message: `Error creating category: ${(error as Error).message}` });
        }
    };

    public updateCategory = async (req: Request, res: Response): Promise<void> => {
        try {
            const categoryRequest: CategoryRequest = req.body;
            const updatedCategory = await this.categoryService.updateCategory(req.params.id, categoryRequest);
            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(400).json({ message: `Error updating category: ${(error as Error).message}` });
        }
    };

    public deleteCategory = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.categoryService.deleteCategory(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: `Error deleting category: ${(error as Error).message}` });
        }
    };
}

export default CategoryController;