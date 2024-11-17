import { ProductRequest } from "../../model/dto/request/productRequest";
import { ProductResponse } from "../../model/dto/response/productResponse";
import { Product } from "../../model/entity/product";
import { v4 as uuid } from "uuid";

export class ProductMapper {
    public toProduct(productRequest: ProductRequest): Product {
        return {            
            id: uuid(), 
            categoryId: productRequest.categoryId,
            name: productRequest.name,
            amount: productRequest.amount,            
            price: productRequest.price,            
            imageName: productRequest.imageName
        };
    }

    public toProductResponse(product: Product): ProductResponse {
        return {
            id: product.id,
            categoryId: product.categoryId,
            name: product.name,
            amount: product.amount,            
            price: product.price,            
            imageName: product.imageName,
        };
    }

    public toProductResponseList(categories: Product[]): ProductResponse[] {
        return categories.map((product) => this.toProductResponse(product));
    }

    public partialUpdate(productRequest: ProductRequest, product: Product): ProductResponse {
        return {
            id: product.id,
            categoryId: productRequest.categoryId,
            name: productRequest.name,
            amount: productRequest.amount,
            price: productRequest.price,
            imageName: productRequest.imageName
        }
    }
}