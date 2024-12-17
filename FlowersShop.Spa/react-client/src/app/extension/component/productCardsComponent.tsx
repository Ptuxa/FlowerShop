"use client";

import Card from "antd/es/card/Card"
import { Product } from "../model/entity/product"
import { ProductCardsProps } from "../props/productCardsProps"
import { CardTitleComponent } from "./cardTitleComponent"
import Button from "antd/es/button/button"
import { ImageService } from "../services/impl/imageService";
import { useAuth } from "../context/authContext";
import { GET_ALL_PRODUCTS_BY_CATEGORY } from "../services/graphQl/getAllProductsByCategory";
import { useQuery } from "@apollo/client";

export const ProductCardsComponent = ({ products, handleUpdate, handleDelete, style }: ProductCardsProps & { style?: React.CSSProperties }) => {
    
    
    const { isAuthorized } = useAuth();

    return (
        <div className="cards" style={style}>
            {products.map((product: Product) => (
                <Card
                    key={product.id}
                    title={
                        <CardTitleComponent
                            name={product.name}
                            price={`$${(product.price / 100).toFixed(2)}`}
                            amount={product.amount}
                        />
                    }
                    bordered={false}
                >
                    <div className="card__buttons">
                        {product.imageName && (
                            <img
                                src={ImageService.getImageServerUrlByImageName(product.imageName)}
                                alt="Product image"
                                style={{
                                    maxWidth: "300%",
                                    maxHeight: "200px", // Увеличенный размер
                                    objectFit: "contain",
                                    marginTop: "10px",
                                }}
                            />
                        )}
                        {isAuthorized && (
                            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                <Button onClick={() => handleUpdate(product)} style={{ flex: 1 }}>
                                    Edit
                                </Button>
                                <Button onClick={() => handleDelete(product.id)} danger style={{ flex: 1 }}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                </Card>
            ))}
        </div>
    );
};

