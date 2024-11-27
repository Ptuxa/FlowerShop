import { ProductRequest } from "../../model/dto/request/productRequest";
import { ProductsByCategoryIdsRequest } from "../../model/dto/request/productsCategoryIdsRequest";
import { ProductResponse } from "../../model/dto/response/productResponse";
import { Product } from "../../model/entity/product";
import { ProductRepository } from "../../repository/productRepository";
import { ProductMapper } from "../mapper/productMapper";

export class ProductService {
    private productRepository: ProductRepository;
    private productMapper: ProductMapper;

    constructor(productRepository: ProductRepository, productMapper: ProductMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    public async getProductById(id: string): Promise<ProductResponse> {
        let product: Product | null;

        try {
            product = await this.productRepository.getProductById(id);
        } catch (error) {
            throw new Error("Error in ProductService getProductById: " + error);
        }

        return this.productMapper.toProductResponse(product);
    }

    public async getAllProducts(): Promise<ProductResponse[]> {
        let products: Product[] | null;

        try {
            products = await this.productRepository.getAll();
        } catch (error) {
            throw new Error("Error in ProductService getAllCategories: " + error);
        }

        return this.productMapper.toProductResponseList(products);
    }

    public async getAllProductsByCategoryIds(productsByCategoryIdsRequest: ProductsByCategoryIdsRequest): Promise<ProductResponse[]> {
        let products: Product[] | null;

        try {
            products = await this.productRepository.getAllByCategoryIds(productsByCategoryIdsRequest.categoryIds);
        } catch (error) {
            throw new Error("Error in ProductService getAllCategories: " + error);
        }

        return this.productMapper.toProductResponseList(products);
    }

    public async createProduct(productRequest: ProductRequest): Promise<ProductResponse> {
        let product: Product | null;

        try {
            product = await this.productRepository.save(this.productMapper.toProduct(productRequest));
        } catch (error) {
            throw new Error("Error in ProductService saveProduct: " + error);
        }

        return this.productMapper.toProductResponse(product);
    }

    public async updateProduct(id: string, productRequest: ProductRequest): Promise<ProductResponse> {
        let product: Product | null;

        try {
            product = await this.productRepository.save(
                this.productMapper.partialUpdate(productRequest, await this.productRepository.getProductById(id))
            );
        } catch (error) {
            throw new Error("Error in ProductService saveProduct: " + error);
        }

        return this.productMapper.toProductResponse(product);
    }

    public async deleteProduct(id: string): Promise<void> {
        try {
            await this.productRepository.deleteById(id);
        } catch (error) {
            throw new Error("Error in ProductService deleteProduct: " + error);
        }
    }
}
