import { Product } from "../model/entity/product";

export interface ProductCardsProps {
    products: Product[];
    handleUpdate: (product: Product) => void;
    handleDelete: (productId: string) => void;
}