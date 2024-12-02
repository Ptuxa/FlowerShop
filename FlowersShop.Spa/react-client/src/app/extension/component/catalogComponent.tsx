"use client";

import { Button, Checkbox, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { CategoryService } from "../services/impl/categoryService";
import { Category } from "../model/entity/category";
import { Product } from "../model/entity/product";
import { ProductService } from "../services/impl/productService";
import { ProductMapper } from "../services/mapper/productMapper";
import { OperationType } from "../enum/operationType";
import { CreateUpdateProductModal } from "./createUpdateProductModal";
import { ProductRequest } from "../model/dto/request/productRequest";
import { ProductCardsComponent } from "./productCardsComponent";
import { useAuth } from "../context/authContext";

const { Title } = Typography;



export const CatalogComponent = () => {
    const defaultProduct: Product = {
        id: "",
        name: "",
        price: 0,
        amount: 0,
        categoryId: null,
        imageName: null
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [operationType, setOperationType] = useState(OperationType.Create);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
    const [loadingProducts, setLoadingProducts] = useState<boolean>(true);

    const [modalProduct, setModalProduct] = useState<Product>(defaultProduct);

    const { isAuthorized, setIsAuthorized } = useAuth();

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

    const loadAllProducts = async () => {
        let products: Product[];
        setLoadingProducts(true);

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

    const handleCloseModal = async () => {
        setIsModalOpen(false);
    }

    const handleCreateProduct = async (productRequest: ProductRequest) => {
        let product: Product;

        try {
            product = await ProductService.createProduct(productRequest);
        } catch (error) {
            throw error;
        }

        products.push(product)
        setProducts(products)

        await handleCloseModal();
    }

    const handleUpdateProduct = async (productId: string, productRequest: ProductRequest) => {
        let updatedProduct: Product;

        try {
            updatedProduct = await ProductService.updateProduct(productId, productRequest);
        } catch (error) {
            throw error;
        }

        const updatedProducts = products.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
        );

        setProducts(updatedProducts);

        await handleCloseModal();
    }

    const handleButtonAddProductClick = async () => {
        setModalProduct(defaultProduct);
        setOperationType(OperationType.Create);
        setIsModalOpen(true);
    }

    const handleButtonUpdateProductClick = async (product: Product) => {
        setModalProduct(product);
        setOperationType(OperationType.Update);
        setIsModalOpen(true);
    }

    const handleButtonDeleteProductClick = async (productId: string) => {
        try {
            await ProductService.deleteProduct(productId);
        } catch (error) {
            throw error;
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
                    {
                        isAuthorized &&
                        <>
                            <Button
                                type="primary"
                                style={{ marginTop: '30px' }}
                                size="large"
                                onClick={() => handleButtonAddProductClick()}
                            >
                                Add product
                            </Button>

                            <CreateUpdateProductModal
                                isModalOpen={isModalOpen}
                                operationType={operationType}
                                product={modalProduct}
                                categories={categories}
                                loadAllCategories={() => loadAllCategories()}
                                handleCreate={(product) => handleCreateProduct(product)}
                                handleUpdate={(productId, product) => handleUpdateProduct(productId, product)}
                                handleCancel={() => handleCloseModal()}
                            />
                        </>
                    }

                    {
                        loadingProducts ?
                            <Title>Loading...</Title> :
                            <ProductCardsComponent
                                products={products}
                                handleUpdate={(product) => handleButtonUpdateProductClick(product)}
                                handleDelete={(productId) => handleButtonDeleteProductClick(productId)}>
                            </ProductCardsComponent>
                    }
                </div>
            </div>
        </>
    );
};