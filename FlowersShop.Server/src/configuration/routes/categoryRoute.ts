import express, { Router } from "express";
import CategoryController from "../../controller/categoryController";

class CategoryRouter {
    private readonly categoryController;
    private readonly router;

    constructor(categoryController: CategoryController) {
        this.categoryController = categoryController;
        this.router = express.Router();
    }

    public initRoutes(): Router {
        this.router.get("/:id", this.categoryController.getCategoryById);
        this.router.get("/", this.categoryController.getAllCategories);
        this.router.post("/", this.categoryController.createCategory);
        this.router.put("/:id", this.categoryController.updateCategory);
        this.router.delete("/:id", this.categoryController.deleteCategory);

        return this.router;
    }
}

export default CategoryRouter;
