import { Category } from "@/app/extension/model/entity/category";
import { CategoryRequest } from "../../model/dto/request/categoryRequest";
import { CategoryResponse } from "../../model/dto/response/categoryResponse";
import { fetchWithTokenRefresh } from "../../utils/serviceUtils";
import { CategoryMapper } from "../mapper/categoryMapper";
import { io, Socket } from "socket.io-client";

export class CategoryService {
    static readonly socket = io("http://localhost:5000");

    public static getCategoryById = async (id: string): Promise<Category> => {
        let getCategoryByIdResponse: Response;
        
        try {
            getCategoryByIdResponse = await fetch(`http://localhost:5000/api/category/${id}`, {
                method: "GET"
            });
        } catch(error) {
            throw new Error(`Get category by id error ${error}`);
        }

        if (getCategoryByIdResponse.status !== 200) {
            throw new Error(`Get category by id error`);
        }

        return CategoryMapper.toCategory(await getCategoryByIdResponse.json());
    }

    public static getAllCategories = async (): Promise<Category[]> => {
        let getCategoryAllResponse: Response;
        
        try {
            getCategoryAllResponse = await fetch("http://localhost:5000/api/category/", {
                method: "GET"
            });
        } catch(error) {
            throw new Error(`Get all categories error ${error}`);
        }

        if (getCategoryAllResponse.status !== 200) {
            throw new Error(`Cannot get all categories`);
        }

        return CategoryMapper.toCategories(await getCategoryAllResponse.json());
    }

    public static getAllCategoriesSocket = async (): Promise<Category[]> => {
        return new Promise((resolve, reject) => {
            this.socket.emit("getAllCategoriesSocket");

            const handleResponse = (getCategoryAllResponse: any) => {
                const categories = CategoryMapper.toCategories(getCategoryAllResponse);
                cleanup();
                resolve(categories);
            };

            const handleError = (error: any) => {
                cleanup();
                reject(new Error(`Get all categories error: ${error.message}`));
            };

            const cleanup = () => {
                this.socket.off("categoriesResponse", handleResponse);
                this.socket.off("error", handleError);
            };

            this.socket.on("categoriesResponse", handleResponse);
            this.socket.on("error", handleError);
        });
    };

    public static createCategory = async (categoryRequset: CategoryRequest): Promise<Category> => {
        let createCategoryResponse: Response;

        try {
            createCategoryResponse = await fetchWithTokenRefresh("http://localhost:5000/api/category/", {
                method: "POST",
                headers: {
                    "content-type": "application/json",            
                },
                body: JSON.stringify(categoryRequset),
                credentials: "include"
            });
        } catch(error) {
            throw new Error(`Create category error ${error}`);
        }

        if (createCategoryResponse.status !== 201) {
            throw new Error(`Cannot create category`);
        }

        return CategoryMapper.toCategory(await createCategoryResponse.json());
    }

    public static updateCategory = async (id: string, categoryRequset: CategoryRequest): Promise<Category> => {
        let updateCategoryResponse: Response;

        try {
            updateCategoryResponse = await fetchWithTokenRefresh(`http://localhost:5000/api/category/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",            
                },
                body: JSON.stringify(categoryRequset),
                credentials: "include"
            });
        } catch(error) {
            throw new Error(`Update category error ${error}`);
        }

        if (updateCategoryResponse.status !== 200) {
            throw new Error(`Cannot update category`);
        }

        return CategoryMapper.toCategory(await updateCategoryResponse.json());
    }

    public static deleteCategory = async (id: string): Promise<void> => {
        let deleteCategoryResponse: Response;

        try {
            deleteCategoryResponse = await fetchWithTokenRefresh(`http://localhost:5000/api/category/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
        } catch(error) {
            throw new Error(`Delete category error ${error}`);
        }

        if (deleteCategoryResponse.status !== 204) {
            throw new Error(`Cannot delete category`);
        }    
    }
}