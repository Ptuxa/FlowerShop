export interface ProductRequest {
    categoryId: string | null;
    name: string;
    amount: number;
    price: number;
    imageName: string | null;
}