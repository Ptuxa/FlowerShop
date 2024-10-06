"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
// Подключение к базе данных
mongoose_1.default.connect('mongodb://localhost:27017/flower_shop');
// Модель для хранения задач с картинками в базе данных
const taskSchema = new mongoose_1.default.Schema({
    title: String,
    status: String,
    dueDate: Date,
    image: String
});
const Task = mongoose_1.default.model('flowers', taskSchema);
app.use(express_1.default.json());
// Загрузка файла и сохранение изображения в формате base64 в базу данных
app.post('/api/tasks', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        res.status(400).send('No file uploaded');
    }
    else {
        // Чтение файла и конвертация в base64
        const imageFile = fs_1.default.readFileSync(path_1.default.join(__dirname, req.file.path));
        const imageBase64 = imageFile.toString('base64');
        // Создание новой задачи с картинкой
        const newTask = new Task({
            title: req.body.title,
            status: 'incomplete',
            dueDate: req.body.dueDate,
            image: imageBase64
        });
        yield newTask.save();
        // Возвращаем сохраненную задачу
        res.status(201).json(newTask);
    }
}));
// Получение всех задач с изображениями
app.get('/api/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield Task.find();
    res.json(tasks);
}));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
