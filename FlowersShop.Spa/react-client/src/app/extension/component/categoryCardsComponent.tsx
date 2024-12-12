import { Button, Card } from "antd";
import { Category } from "../model/entity/category";
import { CategoryCardsProps } from "../props/categoryCardsProps";

export const CategoryCardsComponent = ({ categories, handleUpdate, handleDelete }: CategoryCardsProps) => {
    return (
        <div className="cards">
            {
                categories.map((category: Category) => (
                    <Card
                        key={category.id}
                        title={category.name}
                        bordered={false}
                    >
                        <div className="card__buttons">
                            <Button onClick={() => handleUpdate(category)} style={{ flex: 1 }}>Edit</Button>
                            <Button onClick={() => handleDelete(category.id)} danger style={{ flex: 1 }}>Delete</Button>
                        </div>
                    </Card>
                ))
            }
        </div>
    )
}