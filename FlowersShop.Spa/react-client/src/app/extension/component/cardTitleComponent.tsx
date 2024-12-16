"use client";

export const CardTitleComponent = ({ name, price, amount }: CardTitleProps) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <p className="card__title" style={{ fontWeight: "bold", margin: 0 }}>{name}</p>
                <p className="card__amount" style={{ fontSize: "12px", color: "#555", margin: 0 }}>
                    {amount} items
                </p>
            </div>
            <p className="card__price" style={{ fontWeight: "bold", fontSize: "16px", margin: 0 }}>
                {price}
            </p>
        </div>
    );
};