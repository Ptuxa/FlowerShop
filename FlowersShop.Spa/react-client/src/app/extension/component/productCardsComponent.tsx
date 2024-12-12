"use client";

import Card from "antd/es/card/Card"
import { Product } from "../model/entity/product"
import { ProductCardsProps } from "../props/productCardsProps"
import { CardTitleComponent } from "./cardTitleComponent"
import Button from "antd/es/button/button"
import { ImageService } from "../services/impl/imageService";
import { useAuth } from "../context/authContext";

export const ProductCardsComponent = ({ products, handleUpdate, handleDelete }: ProductCardsProps) => {
    const { isAuthorized, setIsAuthorized } = useAuth();

    return (
        <div className="cards">
            {
                products.map((product: Product) => (
                    <Card
                        key={product.id}
                        title={<CardTitleComponent name={product.name} price={(product.price / 100).toFixed(2)} amount={product.amount} />}
                        bordered={false}
                    >
                        <div className="card__buttons">
                            {product.imageName && (
                                <img
                                    src={ImageService.getImageServerUrlByImageName(product.imageName)}
                                    alt="Product image"
                                    style={{ maxWidth: "100%", marginTop: "10px" }}
                                />
                            )}
                            {
                                isAuthorized &&
                                <>
                                    <Button onClick={() => handleUpdate(product)} style={{ flex: 1 }}>Edit</Button>
                                    <Button onClick={() => handleDelete(product.id)} danger style={{ flex: 1 }}>Delete</Button>
                                </>
                            }
                        </div>
                    </Card>
                ))
            }
        </div>
    )
}