import { Button } from "antd";

export default function CatalogPage() {
    return (
        <div>
            <Button
                type="primary"
                style={{marginTop: "30px"}}
                size="large" 
                // onClick={openCreateModal}
            >Добавить книгу</Button>

            <CreateUpdateBook 
                mode={mode}
                values={values}
                isModalOpen={isModalOpen}
                handleCancel={closeModal}
                handleCreate={handleCreateBook}
                handleUpdate={handleUpdateBook}
            ></CreateUpdateBook>
            
            {loading ? <Title>Loading...</Title> : <Books books={books} handleOpen={openEditModal} handleDelete={handleDeleteBook}/>}
        </div>
    )
}