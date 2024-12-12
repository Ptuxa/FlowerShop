import { Category } from "../model/entity/category";

export interface CategoryCardsProps {
    categories: Category[];
    handleUpdate: (category: Category) => void;
    handleDelete: (categoryId: string) => void;
}