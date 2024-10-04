import express, { Request, Response } from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

const app = express();
const upload = multer({ dest: '../uploads/' });

// Подключение к базе данных
mongoose.connect('mongodb://localhost:27017/flower_shop');

// Модель для хранения задач с картинками в базе данных
const taskSchema = new mongoose.Schema({
    title: String,
    status: String,
    dueDate: Date,
    image: String 
});

const Task = mongoose.model('flowers', taskSchema);

app.use(express.json());

// Загрузка файла и сохранение изображения в формате base64 в базу данных
app.post('/api/tasks', upload.single('image'), async (req: Request, res: Response) => {
    if (!req.file) {
        res.status(400).send('No file uploaded');
    }
    else {
        // Чтение файла и конвертация в base64
        const imageFile = fs.readFileSync(path.join(__dirname, req.file.path));
        const imageBase64 = imageFile.toString('base64');

        // Создание новой задачи с картинкой
        const newTask = new Task({
            title: req.body.title,
            status: 'incomplete',
            dueDate: req.body.dueDate,
            image: imageBase64
        });

        await newTask.save();

        // Возвращаем сохраненную задачу
        res.status(201).json(newTask);
    }    
});

// Получение всех задач с изображениями
app.get('/api/tasks', async (req: Request, res: Response) => {
    const tasks = await Task.find();
    res.json(tasks);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});