import { Request, Response } from 'express';
import { ProductService } from "../service/impl/productService";
import { ProductRequest } from '../model/dto/request/productRequest';
import { ProductsByCategoryIdsRequest } from '../model/dto/request/productsCategoryIdsRequest';

class ProductController {
    private productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }

    public getProductById = async (req: Request, res: Response): Promise<void> => {
        try {
            const productResponse = await this.productService.getProductById(req.params.id);
            res.status(200).json(productResponse);
        } catch (error) {
            res.status(404).json({ message: `Product not found: ${(error as Error).message}` });
        }
    };

    public getAllProducts = async (_req: Request, res: Response): Promise<void> => {
        try {
            const productsResponse = await this.productService.getAllProducts();
            res.status(200).json(productsResponse);
        } catch (error) {
            res.status(500).json({ message: `Error retrieving products: ${(error as Error).message}` });
        }
    };

    public getAllProductsByCategoryIds = async (req: Request, res: Response): Promise<void> => {
        try {
            const productsByCategoryIdsRequest: ProductsByCategoryIdsRequest = req.body;
            const productsResponse = await this.productService.getAllProductsByCategoryIds(productsByCategoryIdsRequest);
            res.status(200).json(productsResponse);
        } catch (error) {
            res.status(500).json({ message: `Error retrieving products: ${(error as Error).message}` });
        }
    }

    public createProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const productRequest: ProductRequest = req.body;
            const newProduct = await this.productService.createProduct(productRequest);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(400).json({ message: `Error creating product: ${(error as Error).message}` });
        }
    };

    public updateProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const productRequest: ProductRequest = req.body;
            const updatedProduct = await this.productService.updateProduct(req.params.id, productRequest);
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(400).json({ message: `Error updating product: ${(error as Error).message}` });
        }
    };

    public deleteProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.productService.deleteProduct(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: `Error deleting product: ${(error as Error).message}` });
        }
    };
}

export default ProductController;