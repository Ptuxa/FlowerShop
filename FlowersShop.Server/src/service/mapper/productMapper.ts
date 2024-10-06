import { ProductRequest } from "../../model/dto/request/productRequest";
import { ProductResponse } from "../../model/dto/response/productResponse";
import { Product } from "../../model/entity/product";
import { v4 as uuid } from "uuid";

export class ProductMapper {
    public static toProduct(productRequest: ProductRequest): Product {
        return {            
            id: uuid(), 
            categoryId: productRequest.categoryId,
            name: productRequest.name,
            amount: productRequest.amount,            
            price: productRequest.price,            
            picturePath: productRequest.picturePath,            
        };
    }

    public static toProductResponse(product: Product): ProductResponse {
        return {
            id: product.id,
            categoryId: product.categoryId,
            name: product.name,
            amount: product.amount,            
            price: product.price,            
            picturePath: product.picturePath,
        };
    }

    public static toProductResponseList(categories: Product[]): ProductResponse[] {
        return categories.map((product) => this.toProductResponse(product));
    }
}