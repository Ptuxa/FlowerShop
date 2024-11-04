import { CategoryRequest } from "../../model/dto/request/categoryRequest";
import { CategoryResponse } from "../../model/dto/response/categoryResponse";
import { Category } from "../../model/entity/category";
import { v4 as uuid } from "uuid";

export class CategoryMapper {
    constructor() {
        
    }

    public toCategory(categoryRequest: CategoryRequest): Category {
        return {
            id: uuid(), 
            name: categoryRequest.name,            
        };
    }

    public toCategoryResponse(category: Category): CategoryResponse {
        return {
            id: category.id,
            name: category.name,
        };
    }

    public toCategoryResponseList(categories: Category[]): CategoryResponse[] {
        return categories.map((category) => this.toCategoryResponse(category));
    }

    public partialUpdate(categoryRequest: CategoryRequest, category: Category): CategoryResponse {
        return {
            id: category.id,
            name: categoryRequest.name
        }
    }
}
