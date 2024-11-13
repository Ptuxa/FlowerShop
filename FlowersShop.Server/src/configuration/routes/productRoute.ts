import express, { Router } from "express";
import ProductController from "../../controller/productController";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { EnumUserRole } from "../../model/enum/enumUserRole";

class ProductRouter {
    private readonly productController;
    private readonly authMiddleware: AuthMiddleware;
    private readonly router;

    constructor(productController: ProductController, authMiddleware: AuthMiddleware) {
        this.productController = productController;
        this.authMiddleware = authMiddleware;

        this.router = express.Router();
    }

    public initRoutes(): Router {
        this.router.get(
            "/:id",
            this.productController.getProductById
        );
        this.router.get(
            "/",
            this.productController.getAllProducts
        );
        this.router.post(
            "/",
            this.authMiddleware.authenticate,
            this.authMiddleware.authorize(EnumUserRole.ADMIN),
            this.productController.createProduct
        );
        this.router.put(
            "/:id",
            this.authMiddleware.authenticate,
            this.authMiddleware.authorize(EnumUserRole.ADMIN),
            this.productController.updateProduct
        );
        this.router.delete(
            "/:id",
            this.authMiddleware.authenticate,
            this.authMiddleware.authorize(EnumUserRole.ADMIN),
            this.productController.deleteProduct
        );

        return this.router;
    }
}

export default ProductRouter;
