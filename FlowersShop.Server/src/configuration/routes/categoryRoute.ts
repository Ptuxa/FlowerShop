import express, { Router } from "express";
import CategoryController from "../../controller/categoryController";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { EnumUserRole } from "../../model/enum/enumUserRole";

class CategoryRouter {
    private readonly categoryController: CategoryController;
    private readonly authMiddleware: AuthMiddleware;
    private readonly router: Router;

    constructor(categoryController: CategoryController, authMiddleware: AuthMiddleware) {
        this.categoryController = categoryController;
        this.authMiddleware = authMiddleware;
        this.router = express.Router();
    }

    public initRoutes(): Router {
        this.router.get(
            "/:id",
            this.categoryController.getCategoryById
        );
        this.router.get(
            "/",
            this.authMiddleware.authenticate,
            this.authMiddleware.authorize(EnumUserRole.USER),
            this.categoryController.getAllCategories
        );
        this.router.post(
            "/",
            this.authMiddleware.authenticate,
            this.authMiddleware.authorize(EnumUserRole.ADMIN),
            this.categoryController.createCategory
        );
        this.router.put(
            "/:id",
            this.authMiddleware.authenticate,
            this.authMiddleware.authorize(EnumUserRole.ADMIN),
            this.categoryController.updateCategory
        );
        this.router.delete(
            "/:id",
            this.authMiddleware.authenticate,
            this.authMiddleware.authorize(EnumUserRole.ADMIN),
            this.categoryController.deleteCategory
        );

        return this.router;
    }
}

export default CategoryRouter;
