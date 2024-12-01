"use client";

export const CardTitleComponent = ({ name, price, amount}: CardTitleProps) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <div style={{ display: "flex", flexDirection: "column" }}>
                <p className="card__title">{name}</p>
                <p className="card__amount">{amount} шт.</p>
            </div>
            <p className="card__price">{price}</p>  
        </div>
    );
}