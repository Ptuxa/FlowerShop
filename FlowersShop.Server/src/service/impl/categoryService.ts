import { CategoryRequest } from "../../model/dto/request/categoryRequest";
import { CategoryResponse } from "../../model/dto/response/categoryResponse";
import { Category } from "../../model/entity/category";
import { CategoryRepository } from "../../repository/categoryRepository";
import { CategoryMapper } from "../mapper/categoryMapper";

export class CategoryService {
    private categoryRepository: CategoryRepository;
    private categoryMapper: CategoryMapper;

    constructor(categoryRepository: CategoryRepository, categoryMapper: CategoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }
    
    public async getCategoryById(id: string): Promise<CategoryResponse> {
        let category: Category | null;
    
        try {
            category = await this.categoryRepository.getCategoryById(id);
        } catch (error) {
            throw new Error("Error in CategoryService getCategoryById: " + error);
        }
    
        return this.categoryMapper.toCategoryResponse(category);
    }
    
    public async getAllCategories(): Promise<CategoryResponse[]> {  
        let categories: Category[] | null;
    
        try {
            categories = await this.categoryRepository.getAll();
        } catch (error) {
            throw new Error("Error in CategoryService getAllCategories: " + error);
        }

        return this.categoryMapper.toCategoryResponseList(categories);
    }

    public async createCategory(categoryRequest: CategoryRequest): Promise<CategoryResponse> {
        let category: Category | null;

        try {
            category = await this.categoryRepository.save(this.categoryMapper.toCategory(categoryRequest));
        } catch (error) {
            throw new Error("Error in CategoryService saveCategory: " + error);
        }

        return this.categoryMapper.toCategoryResponse(category);
    }
    
    public async updateCategory(id: string, categoryRequest: CategoryRequest): Promise<CategoryResponse> {
        let category: Category | null;
        
        try {
            category = await this.categoryRepository.save(this.categoryMapper.partialUpdate(categoryRequest, 
                await this.categoryRepository.getCategoryById(id))
            );
        } catch (error) {
            throw new Error("Error in CategoryService saveCategory: " + error);
        }

        return this.categoryMapper.toCategoryResponse(category);
    }

    public async deleteCategory(id: string): Promise<void> {
        try {
            await this.categoryRepository.deleteById(id);
        } catch (error) {
            throw new Error("Error in CategoryService deleteCategory: " + error);
        }
    }
}