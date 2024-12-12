import { useEffect, useState } from "react";
import { CreateUpdateCategoryProps } from "../props/createUpdateCategoryProps";
import { OperationType } from "../enum/operationType";
import { CategoryRequest } from "../model/dto/request/categoryRequest";
import { Input, Modal } from "antd";

export const CreateUpdateCategoryModal = ({
    isModalOpen,
    operationType,
    category,
    handleCreate,
    handleUpdate,
    handleCancel
}: CreateUpdateCategoryProps) => {

    const [name, setName] = useState<string>("");

    useEffect(() => {
        if (isModalOpen) {
            setName(category.name);
        }
    }, [isModalOpen]);

    const defineTitleModal = (operationType: OperationType): string => {
        if (operationType === OperationType.Create) {
            return "Add category";
        } else if (operationType === OperationType.Update) {
            return "Edit category";
        }

        throw Error("Call modal with unexpected type of operation");
    }

    const handleOnOk = async () => {
        const categoryRequest: CategoryRequest = {
            name: name
        }

        operationType == OperationType.Create
            ? handleCreate(categoryRequest)
            : handleUpdate(category.id, categoryRequest);
    }

    return (
        <Modal
            title={defineTitleModal(operationType)}
            open={isModalOpen}
            onOk={handleOnOk}
            onCancel={handleCancel}
        >
            <div className="product__modal">
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Category name"
                    style={{ marginBottom: "10px" }}
                />                
            </div>
        </Modal>
    );
};