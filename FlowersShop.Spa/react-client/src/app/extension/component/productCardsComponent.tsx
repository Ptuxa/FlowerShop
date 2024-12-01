"use client";

import Card from "antd/es/card/Card"
import { Product } from "../model/entity/product"
import { ProductCardsProps } from "../props/productCardsProps"
import { CardTitleComponent } from "./cardTitleComponent"
import Button from "antd/es/button/button"

export const ProductCardsComponent = ({ products, handleUpdate, handleDelete }: ProductCardsProps) => {
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
                            {/* <img
                                alt="image"
                                src={url}
                            /> */}
                            <Button onClick={() => handleUpdate(product)} style={{ flex: 1 }}>Edit</Button>
                            <Button onClick={() => handleDelete(product.id)} danger style={{ flex: 1 }}>Delete</Button>
                        </div>
                    </Card>
                ))
            }
        </div>
    )
}