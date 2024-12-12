"use client";

import { useEffect, useState } from "react";
import { Category } from "../model/entity/category"
import { OperationType } from "../enum/operationType";
import { CategoryService } from "../services/impl/categoryService";
import { Button } from "antd";
import { CreateUpdateCategoryModal } from "./createUpdateCategoryModal";
import { CategoryRequest } from "../model/dto/request/categoryRequest";
import Title from "antd/es/typography/Title";
import { CategoryCardsComponent } from "./categoryCardsComponent";

export const CategoriesComponent = () => {
    const defaultCategory: Category = {
        id: "",
        name: ""
    }

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [operationType, setOperationType] = useState<OperationType>(OperationType.Create);
    const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
    const [modalCategory, setModalCategory] = useState<Category>(defaultCategory)
    const [categories, setCategories] = useState<Category[]>([]);

    const loadAllCategories = async () => {
        let categories: Category[];
        setLoadingCategories(true);

        try {
            categories = await CategoryService.getAllCategories();
        } catch (error) {
            throw error;
        } finally {
            setLoadingCategories(false);
        }

        setCategories(categories);
    };

    useEffect(() => {
        loadAllCategories();
    }, []);

    const handleButotnAddCategoryClick = async () => {
        setModalCategory(defaultCategory);
        setOperationType(OperationType.Create);
        setIsModalOpen(true);
    }

    const handleCloseModal = async () => {
        setIsModalOpen(false);
    }

    const handleCreateCategory = async (categoryRequest: CategoryRequest) => {
        let category: Category;

        try {
            category = await CategoryService.createCategory(categoryRequest);
        } catch (error) {
            throw error;
        }

        categories.push(category);
        setCategories(categories);

        await handleCloseModal();
    }

    const handleUpdateCategory = async (categoryId: string, categoryRequest: CategoryRequest) => {
        let updatedCategory: Category;

        try {
            updatedCategory = await CategoryService.updateCategory(categoryId, categoryRequest);
        } catch (error) {
            throw error;
        }

        const updatedCategories = categories.map((category) =>
            category.id === updatedCategory.id ? updatedCategory : category
        );

        setCategories(updatedCategories);

        await handleCloseModal();
    }

    const handleButtonUpdateCategoryClick = async (category: Category) => {
        setModalCategory(category);
        setOperationType(OperationType.Update);
        setIsModalOpen(true);
    }

    const handleButtonDeleteCategoryClick = async (categoryId: string) => {
        try {
            await CategoryService.deleteCategory(categoryId);
        } catch (error) {
            throw error;
        }

        setCategories(categories.filter(category => category.id !== categoryId));
    }

    return (
        <>
            <div style={{ display: 'flex', marginBottom: '30px' }}>
                <Button
                    type="primary"
                    style={{ marginTop: '30px' }}
                    size="large"
                    onClick={() => handleButotnAddCategoryClick()}
                >
                    Add category
                </Button>

                <CreateUpdateCategoryModal
                    isModalOpen={isModalOpen}
                    operationType={operationType}
                    category={modalCategory}
                    handleCreate={(category) => handleCreateCategory(category)}
                    handleUpdate={(productId, product) => handleUpdateCategory(productId, product)}
                    handleCancel={() => handleCloseModal()}
                />
                {
                    loadingCategories ?
                        <Title>Loading...</Title> :
                        <CategoryCardsComponent
                            categories={categories}
                            handleUpdate={(category) => handleButtonUpdateCategoryClick(category)}
                            handleDelete={(categoryId) => handleButtonDeleteCategoryClick(categoryId)}>
                        </CategoryCardsComponent>
                }
            </div>
        </>
    )
}