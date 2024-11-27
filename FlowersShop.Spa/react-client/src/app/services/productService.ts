import { ProductRequest } from "../model/dto/request/productRequest";
import { ProductResponse } from "../model/dto/response/productResponse";
import { fetchWithTokenRefresh } from "../utils/serviceUtils";


export const getProductById = async (id: string): Promise<ProductResponse> => {
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

    return getProductByIdResponse.json();
}

export const getAllProducts = async (): Promise<ProductResponse[]> => {
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

    return getAllProductsResponse.json();
}

export const createProduct = async (productRequset: ProductRequest): Promise<ProductResponse> => {
    let createProductResponse: Response;

    try {
        createProductResponse = await fetchWithTokenRefresh("http://localhost:5000/api/product/", {
            method: "POST",
            headers: {
                "content-type": "application/json",            
            },
            body: JSON.stringify(productRequset),
            credentials: "include"
        });
    } catch(error) {
        throw new Error(`Create product error ${error}`);
    }

    if (createProductResponse.status !== 201) {
        throw new Error(`Cannot create product`);
    }

    return createProductResponse.json();
}

export const updateProduct = async (id: string, productRequset: ProductRequest): Promise<ProductResponse> => {
    let updateProductResponse: Response;

    try {
        updateProductResponse = await fetchWithTokenRefresh(`http://localhost:5000/api/product/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",            
            },
            body: JSON.stringify(productRequset),
            credentials: "include"
        });
    } catch(error) {
        throw new Error(`Update product error ${error}`);
    }

    if (updateProductResponse.status !== 201) {
        throw new Error(`Cannot update product`);
    }

    return updateProductResponse.json();
}

export const deleteProduct = async (id: string): Promise<void> => {
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