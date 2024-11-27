import { OperationType } from "../enum/operationsEnum";
import { ProductRequest } from "../model/dto/request/productRequest";
import { Product } from "../model/entity/product";


export interface CreateUpdateProductProps {
    isModalOpen: boolean,
    operationType: OperationType;
    values: Product,
    handleCancel: () => void,
    handleCreate: (request: ProductRequest) => void,
    handleUpdate: (id: string, request: ProductRequest) => void,
}