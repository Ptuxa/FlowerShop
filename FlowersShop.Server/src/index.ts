import express, { Request, Response } from "express";
import multer from "multer";
import mongoose, { Model } from "mongoose";
import { v4 as uuid } from "uuid";
import routes from './configuration/routes';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// mongoose.connect("mongodb://localhost:27017/flower_shop");

// const productSchema = new mongoose.Schema({
//     id: { type: String, default: uuid },
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     amount: { type: Number, required: true },
//     pictureName: { type: String, ref: "pictures" },
//     pictureContent: {type}
// });

// const pictureSchema = new mongoose.Schema({
//     id: { type: String, default: uuid },
//     name: { type: String, required: true },
//     content: { type: Buffer, required: true },
// });

// const ProductModel = mongoose.model("products", productSchema);
// const PictureModel = mongoose.model("pictures", pictureSchema);



// // Запуск функции каждые 5 минут
// setInterval(removeUnlinkedPictures, 5 * 60 * 1000); // 5 минут = 5 * 60 * 1000 миллисекунд

// async function removeUnlinkedPictures() {
//     try {
//         console.log("Запуск функции удаления несвязанных изображений");

//         // Шаги для удаления несвязанных изображений
//         const products = await ProductModel.find({}, { pictureId: 1 });
//         const usedPictureIds = products.map((product) => product.pictureId);

//         const result = await PictureModel.deleteMany({
//             id: { $nin: usedPictureIds },
//         });

//         console.log(`Удалено записей: ${result.deletedCount}`);
//     } catch (error) {
//         console.error("Ошибка при удалении несвязанных изображений:", error);
//     }
// }

// //Get products
// app.get("/api/products", async (request: Request, response: Response) => {
//     const products = await ProductModel.find().populate("picture_id");
//     response.status(200).json(products);
// });

// //Get products by id
// app.get("/api/products/:id", async (request: Request, response: Response) => {
//     try {
//         const product = await ProductModel.findById(request.params.id).populate("picture_id");

//         if (!product) {
//             response.status(400).send("product was not found");
//         } else {
//             response.status(200).json(product);
//         }
//     } catch (error) {
//         console.log("Error: cannot get product");
//         response.status(500).send("Server error");
//     }
// });

// //Update product
// app.put("/api/product/:id", async (request: Request, response: Response) => {
//     try {
//         const newPicture = new PictureModel({
//             id: request.body.pictureId,
//             name: request.body.pictureName,
//             content: request.body.pictureContent,
//         });

//         const newProduct = new ProductModel({
//             id: request.params.id,
//             name: request.body.productName,
//             amount: request.body.productAmount,
//             price: request.body.productPrice,
//             picture_id: request.body.pictureId,
//         });

//         const updatedPicture = await ProductModel.findByIdAndUpdate(request.params.id);
//         const updatedProduct = await ProductModel.findByIdAndUpdate(request.params.id);

//         response.status(200).json();
//     } catch (error) {
//         console.error("Error updating product:", error);
//         response.status(500).send("Server error");
//     }
// });

// //Create product
// app.post("/api/products", upload.single("image"), async (request: Request, response: Response) => {
//     try {
//         if (!request.file) {
//             response.status(400).send("No file uploaded");
//         } else {
//             const newPicture = new PictureModel({
//                 id: uuid(),
//                 name: request.file.originalname,
//                 content: request.file.buffer,
//             });

//             await newPicture.save();

//             const newProduct = new ProductModel({
//                 id: uuid(),
//                 name: request.body.name,
//                 price: request.body.price,
//                 amount: request.body.amount,
//                 picture_id: newPicture.id,
//             });

//             await newProduct.save();

//             response.status(201).json(newProduct);
//         }
//     } catch (error) {
//         console.error("Error saving product and image:", error);
//         response.status(500).send("Server error");
//     }
// });

// //Delete product
// app.delete("/api/product/:id", async (request: Request, response: Response) => {
//     try {
//         const deletedProduct = await ProductModel.findByIdAndDelete(request.params.id);

//         if (!deletedProduct) {
//             response.status(400).send("product is not found");
//         } else {
//             response.status(204).send("product has been deleted");
//         }
//     } catch (error) {
//         console.error("Delete product error:", error);
//         response.status(500).send("Server error");
//     }
// });
