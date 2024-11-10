import express, { Router } from 'express'
import ProductController from '../../controller/productController';

class ProductRouter {
    private readonly productController;
    private readonly router;

    constructor(
        productController: ProductController,
    ) {
        this.productController = productController;

        this.router = express.Router();
    }

    public initRoutes() : Router{
        this.router.get("/:id", this.productController.getProductById);
        this.router.get("/", this.productController.getAllProducts);
        this.router.post("/", this.productController.createProduct);
        this.router.put("/:id", this.productController.updateProduct);
        this.router.delete("/:id", this.productController.deleteProduct);

        return this.router;
    }
}

export default ProductRouter;