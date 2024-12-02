import { ProductsByCategoryIdsRequest } from "@/app/extension/model/dto/request/productsByCategoryIdsRequest";
import { ProductResponse } from "@/app/extension/model/dto/response/productResponse";
import { Category } from "@/app/extension/model/entity/category";
import { Product } from "@/app/extension/model/entity/product";
import { ProductRequest } from "../../model/dto/request/productRequest";

export class ProductMapper {
    public static toProductsByCategoryIdsRequest(categories: Category[]): ProductsByCategoryIdsRequest {
        const productsByCategoryIdsRequest: ProductsByCategoryIdsRequest = {
            categoryIds: categories.map((category) => {return category.id})
        } 

        return productsByCategoryIdsRequest;
    }

    public static toProductRequest(product: Product): ProductRequest {
        return {
            name: product.name,
            price: product.price,
            amount: product.amount,
            imageName: product.imageName,
            categoryId: product.categoryId
        };
    }

    public static toProduct(productResponse: ProductResponse): Product {
        return {
            id: productResponse.id,
            name: productResponse.name,
            price: productResponse.price,
            amount: productResponse.amount,
            imageName: productResponse.imageName,
            categoryId: productResponse.categoryId
        };
    }

    public static toProducts(categoryResponse: ProductResponse[]): Product[] {
        return categoryResponse.map((category) => this.toProduct(category));
    }
}