"use client";

import { Button, Checkbox, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { CategoryService } from "../services/impl/categoryService";
import { Category } from "../model/entity/category";
import { Product } from "../model/entity/product";
import { ProductService } from "../services/impl/productService";
import { ProductMapper } from "../services/mapper/productMapper";
import { ProductCardsComponent } from "./productCardsComponent";
import { OperationType } from "../enum/operationType";
import { CreateUpdateProductModal } from "./createUpdateProductModal";

const { Title } = Typography;



export const CatalogComponent = () => {  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [operationType, setOperationType] = useState<OperationType>(OperationType.Create);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [loadingProducts, setLoadingProducts] = useState<boolean>(true);

    const loadAllCategories = async () => {
        let categories: Category[];

        try {
            categories = await CategoryService.getAllCategories();
        } catch (error) {
            throw error;
        } finally {
            setLoadingCategories(false);
        }

        setCategories(categories);
    };

    const loadAllProducts = async () => {
        let products: Product[];

        try {
            products = await ProductService.getAllProducts();
        } catch (error) {
            throw error;
        } finally {
            setLoadingProducts(false);
        }

        setProducts(products);
    };

    const filterProductsByCategory = async (filterCategories: Category[]) => {
        setLoadingProducts(true);

        let products: Product[];

        try {
            products = await ProductService.getAllProductsByCategoryIds(ProductMapper.toProductsByCategoryIdsRequest(filterCategories));
        } catch (error) {
            throw error;
        } finally {
            setLoadingProducts(false);
        }

        setProducts(products);
    };

    useEffect(() => {
        loadAllCategories();
        loadAllProducts();
    }, []);

    const handleCloseCreateUpdateProduct = async () => {
        setIsModalOpen(false);
    }

    const handleCreateProduct = async () => {
        setOperationType(OperationType.Create);
        setIsModalOpen(true);
    }

    const handleUpdateProduct = async (product: Product) => {
        setOperationType(OperationType.Edit);
        setIsModalOpen(true);
    }

    const handleDeleteProduct = async (productId: string) => {
        setLoadingProducts(true);

        try {
            await ProductService.deleteProduct(productId);
        } catch (error) {
            throw error;
        } finally {
            setLoadingProducts(false);
        }

        setProducts(products.filter(product => product.id !== productId));
    }

    return (
        <>
            <div style={{ display: 'flex', marginBottom: '30px' }}>
                <div style={{ marginRight: '20px' }}>
                    <Title level={4}>Categories</Title>
                    <Checkbox.Group>
                        <Space direction="vertical">
                            {
                                loadingCategories ?
                                    <Title>Loading...</Title> :
                                    <div>
                                        {categories.map((category) => (
                                            <Checkbox key={category.id} value={category.name}>
                                                {category.name}
                                            </Checkbox>
                                        ))}
                                    </div>
                            }
                        </Space>
                    </Checkbox.Group>
                    <Button type="primary" style={{ marginTop: '20px' }} onClick={() => filterProductsByCategory(categories)}>
                        Apply
                    </Button>
                </div>
                <div>
                    <Button
                        type="primary"
                        style={{ marginTop: '30px' }}
                        size="large"
                        onClick={() => handleCreateProduct}
                    >
                        Add product
                    </Button>

                    <CreateUpdateProductModal
                        operationType={operationType}
                        isModalOpen={isModalOpen}
                        categories={categories}
                        handleCancel={handleCloseCreateUpdateProduct}
                        handleCreate={handleCreateProduct}
                        handleUpdate={handleUpdateProduct}
                    />

                    {
                        loadingProducts ?
                            <Title>Loading...</Title> :
                            <ProductCardsComponent products={products} handleUpdate={handleUpdateProduct} handleDelete={handleDeleteProduct}></ProductCardsComponent>
                    }
                </div>
            </div>
        </>
    );

    // const openCreateModal = () => {
    //     setMode('create');
    //     setIsModalOpen(true);
    // };

    // const openEditModal = (book: any) => {
    //     setMode('update');
    //     setValues(book);
    //     setIsModalOpen(true);
    // };

    // const closeModal = () => {
    //     setIsModalOpen(false);
    // };

    // const handleCreateBook = (newBook: any) => {
    //     // Логика создания книги
    //     setBooks([...books, newBook]);
    //     closeModal();
    // };

    // const handleUpdateBook = (updatedBook: any) => {
    //     // Логика обновления книги
    //     const updatedBooks = books.map((book) =>
    //         book.id === updatedBook.id ? updatedBook : book
    //     );
    //     setBooks(updatedBooks);
    //     closeModal();
    // };

    // const handleDeleteBook = (bookId: string) => {
    //     setBooks(books.filter((book) => book.id !== bookId));
    // };

    // const handleFilterChange = (checkedValues: any) => {
    //     setFilters(checkedValues);
    // };

    // const handleApplyFilters = () => {

    // };
};