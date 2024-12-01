import { CategoryResponse } from "@/app/extension/model/dto/response/categoryResponse";
import { Category } from "@/app/extension/model/entity/category";

export class CategoryMapper {
    public static toCategory(categoryResponse: CategoryResponse): Category {
        return {
            id: categoryResponse.id, 
            name: categoryResponse.name,            
        };
    }

    public static toCategories(categoryResponse: CategoryResponse[]): Category[] {
        return categoryResponse.map((category) => this.toCategory(category));
    }
}