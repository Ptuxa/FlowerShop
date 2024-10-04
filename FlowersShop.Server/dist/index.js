"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Настройка multer для загрузки файлов
const upload = (0, multer_1.default)({ dest: 'uploads/' });
// Список задач (вместо базы данных используем в памяти)
let tasks = [];
// Получить все задачи
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});
// Создать новую задачу
app.post('/api/tasks', (req, res) => {
    const task = Object.assign(Object.assign({}, req.body), { id: Date.now(), status: 'incomplete' });
    tasks.push(task);
    res.status(201).json(task);
});
// Загрузить файл для задачи
app.post('/api/tasks/:id/upload', upload.single('file'), (req, res) => {
    var _a;
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).send('Task not found');
    }
    task.file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    res.json(task);
});
// Обновить статус задачи
app.put('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).send('Task not found');
    }
    task.status = req.body.status;
    task.dueDate = req.body.dueDate;
    res.json(task);
});
// Удалить задачу
app.delete('/api/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    res.status(204).send();
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
