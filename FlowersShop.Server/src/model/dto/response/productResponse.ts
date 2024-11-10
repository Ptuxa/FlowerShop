export interface ProductResponse {
    id: string;
    categoryId: string | null;
    name: string;
    amount: number;
    price: number;
    imageId: string | null
}