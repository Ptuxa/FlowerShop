import { OperationType } from "../enum/operationType";
import { Category } from "../model/entity/category";
import { Product } from "../model/entity/product";
import { ProductValues } from "../model/struct/productValues";


export interface CreateUpdateProductProps {
    isModalOpen: boolean,
    operationType: OperationType;
    categories: Category[],
    handleCreate: () => void,
    handleUpdate: (product: Product) => void,
    handleCancel: () => void,
}