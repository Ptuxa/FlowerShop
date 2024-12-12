import { OperationType } from "../enum/operationType";
import { CategoryRequest } from "../model/dto/request/categoryRequest";
import { Category } from "../model/entity/category";

export interface CreateUpdateCategoryProps {
    isModalOpen: boolean,
    operationType: OperationType;
    category: Category,
    handleCreate: (categoryRequest: CategoryRequest) => void,
    handleUpdate: (categoryId: string, categoryRequest: CategoryRequest) => void,
    handleCancel: () => void
}