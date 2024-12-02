import { Product } from "@/app/extension/model/entity/product";
import { ProductRequest } from "../../model/dto/request/productRequest";
import { ProductResponse } from "../../model/dto/response/productResponse";
import { fetchWithTokenRefresh } from "../../utils/serviceUtils";
import { ProductMapper } from "../mapper/productMapper";
import { ProductsByCategoryIdsRequest } from "@/app/extension/model/dto/request/productsByCategoryIdsRequest";

export class ProductService {
    public static getProductById = async (id: string): Promise<Product> => {
        let getProductByIdResponse: Response;
    
        try {
            getProductByIdResponse = await fetch(`http://localhost:5000/api/product/${id}`, {
                method: "GET"
            });
        } catch(error) {
            throw new Error(`Get product by id error ${error}`);
        }
    
        if (getProductByIdResponse.status !== 200) {
            throw new Error(`Cannot get product by id`);
        }
    
        return ProductMapper.toProduct(await getProductByIdResponse.json());
    }
    
    public static getAllProducts = async (): Promise<Product[]> => {
        let getAllProductsResponse: Response;
    
        try {
            getAllProductsResponse = await fetch("http://localhost:5000/api/product/", {
                method: "GET"            
            });
        } catch(error) {
            throw new Error(`Get all products error ${error}`);
        }
    
        if (getAllProductsResponse.status !== 200) {
            throw new Error(`Cannot get all products`);
        }
    
        return ProductMapper.toProducts(await getAllProductsResponse.json());
    }

    public static getAllProductsByCategoryIds = async(productsByCategoryIdsRequest: ProductsByCategoryIdsRequest): Promise<Product[]> => {
        let getAllProductsByCategoryIdsResponse: Response;
    
        try {
            getAllProductsByCategoryIdsResponse = await fetch("http://localhost:5000/api/product/filter", {
                method: "POST",
                headers: {
                    "content-type": "application/json",            
                },
                body: JSON.stringify(productsByCategoryIdsRequest)
            });
        } catch(error) {
            throw new Error(`Get all products error ${error}`);
        }
    
        if (getAllProductsByCategoryIdsResponse.status !== 200) {
            throw new Error(`Cannot get all products`);
        }
    
        return ProductMapper.toProducts(await getAllProductsByCategoryIdsResponse.json());
    }
    
    public static createProduct = async (productRequest: ProductRequest): Promise<Product> => {
        let createProductResponse: Response;
    
        try {
            createProductResponse = await fetchWithTokenRefresh("http://localhost:5000/api/product/", {
                method: "POST",
                headers: {
                    "content-type": "application/json",            
                },
                body: JSON.stringify(productRequest),
                credentials: "include"
            });
        } catch(error) {
            throw new Error(`Create product error ${error}`);
        }
    
        if (createProductResponse.status !== 201) {
            throw new Error(`Cannot create product`);
        }
    
        return ProductMapper.toProduct(await createProductResponse.json());
    }
    
    public static updateProduct = async (id: string, productRequest: ProductRequest): Promise<Product> => {
        let updateProductResponse: Response;
    
        try {
            updateProductResponse = await fetchWithTokenRefresh(`http://localhost:5000/api/product/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",            
                },
                body: JSON.stringify(productRequest),
                credentials: "include"
            });
        } catch(error) {
            throw new Error(`Update product error ${error}`);
        }
    
        if (updateProductResponse.status !== 201) {
            throw new Error(`Cannot update product`);
        }
    
        return ProductMapper.toProduct(await updateProductResponse.json());
    }
    
    public static deleteProduct = async (id: string): Promise<void> => {
        let deleteProductResponse: Response;
    
        try {
            deleteProductResponse = await fetchWithTokenRefresh(`http://localhost:5000/api/product/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
        } catch(error) {
            throw new Error(`Delete product error ${error}`);
        }
    
        if (deleteProductResponse.status !== 204) {
            throw new Error(`Cannot delete product`);
        }
    }
}