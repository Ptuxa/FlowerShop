"use client";

import { useEffect, useState } from "react";
import { CreateUpdateProductProps } from "../props/createUpdateProductProps";
import { Button, Input, Modal, Select, Upload } from "antd";
import { OperationType } from "../enum/operationType";
import TextArea from "antd/es/input/TextArea";
import { ImageService } from "../services/impl/imageService";

export const CreateUpdateProductModal = ({
    operationType,
    isModalOpen,
    categories,
    handleCreate,
    handleUpdate,
    handleCancel
}: CreateUpdateProductProps) => {

    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [categoryId, setCategoryId] = useState<string | null>(null);

    useEffect(() => {
        
    }, []);

    const defineTitleModal = (operationType: OperationType): string => {
        if (operationType === OperationType.Create) {
            return "Add product";
        } else if (operationType === OperationType.Edit) {
            return "Edit product";
        }

        throw Error("Call modal with unexpected type of operation");
    }

    const handleFileUpload = async (file: File) => {
        let fileName: string;

        try {
            fileName = await ImageService.sendImage(file);
        } catch (error) {
            throw error;
        }
    };
    
    const handleOnOk = async () => {
        console.log("OK")

        // const productRequest: ProductRequest = {
        //     name: name,
        //     price: price,
        //     amount: amount,
        //     categoryId: categoryId,
        //     imageName: imageName
        // };

        // operationType == OperationType.Create
        //     ? handleCreate(productRequest)
        //     : handleUpdate(productId, productRequest);
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
                    placeholder="Product name"
                    style={{ marginBottom: "10px" }}
                />
                <TextArea
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Amount"
                    style={{ marginBottom: "10px" }}
                />
                <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="Price"
                    style={{ marginBottom: "10px" }}
                />
                <Select
                    value={categoryId}
                    onChange={(value) => setCategoryId(value)}
                    placeholder="Choose category"
                    style={{ width: "100%", marginBottom: "10px" }}
                >
                    {categories.map((category) => (
                        <Select.Option key={category.id} value={category.id}>
                            {category.name}
                        </Select.Option>
                    ))}
                </Select>
                <Upload
                    beforeUpload={(file) => {
                        handleFileUpload(file);
                        return false;
                    }}
                    maxCount={1}
                >
                    <Button>Load image:</Button>
                </Upload>
            </div>
        </Modal>
    );
};