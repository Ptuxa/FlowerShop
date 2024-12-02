import { OperationType } from "../enum/operationType";
import { ProductRequest } from "../model/dto/request/productRequest";
import { Category } from "../model/entity/category";
import { Product } from "../model/entity/product";
import { ProductValues } from "../struct/productValues";


export interface CreateUpdateProductProps {
    isModalOpen: boolean,
    operationType: OperationType;
    product: Product,
    categories: Category[],
    loadAllCategories: () => void, 
    handleCreate: (productRequest: ProductRequest) => void,
    handleUpdate: (productId: string, productRequest: ProductRequest) => void,
    handleCancel: () => void
}