import { Button, Card } from "antd";
import { Category } from "../model/entity/category";
import { CategoryCardsProps } from "../props/categoryCardsProps";

export const CategoryCardsComponent = ({ categories, handleUpdate, handleDelete, style }: CategoryCardsProps & { style?: React.CSSProperties }) => {
    return (
        <div className="cards" style={style}>
            {categories.map((category: Category) => (
                <Card
                    key={category.id}
                    title={
                        <p style={{ fontWeight: "bold", fontSize: "16px", margin: 0 }}>
                            {category.name}
                        </p>
                    }
                    bordered={false}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                    }}
                >
                    <div className="card__buttons" style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                        <Button onClick={() => handleUpdate(category)} style={{ flex: 1 }}>
                            Edit
                        </Button>
                        <Button onClick={() => handleDelete(category.id)} danger style={{ flex: 1 }}>
                            Delete
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    );
};
