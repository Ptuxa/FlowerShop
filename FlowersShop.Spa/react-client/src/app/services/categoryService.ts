import { CategoryRequest } from "../model/dto/request/categoryRequest";
import { CategoryResponse } from "../model/dto/response/categoryResponse";
import { fetchWithTokenRefresh } from "../utils/serviceUtils";

export const getCategoryById = async (id: string): Promise<CategoryResponse> => {
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

    return getCategoryByIdResponse.json();
}

export const getAllCategories = async (): Promise<CategoryResponse[]> => {
    let getCategoryByIdResponse: Response;
    
    try {
        getCategoryByIdResponse = await fetch("http://localhost:5000/api/category/", {
            method: "GET"
        });
    } catch(error) {
        throw new Error(`Get all categories error ${error}`);
    }

    if (getCategoryByIdResponse.status !== 200) {
        throw new Error(`Cannot get all categories`);
    }

    return getCategoryByIdResponse.json();
}

export const createCategory = async (categoryRequset: CategoryRequest): Promise<CategoryResponse> => {
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

    return createCategoryResponse.json();
}

export const updateCategory = async (id: string, categoryRequset: CategoryRequest): Promise<CategoryRequest> => {
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

    return updateCategoryResponse.json();
}

export const deleteCategory = async (id: string): Promise<void> => {
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