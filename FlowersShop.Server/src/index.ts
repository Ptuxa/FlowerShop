import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Настройка multer для загрузки файлов
const upload = multer({ dest: 'uploads/' });

// Список задач (вместо базы данных используем в памяти)
let tasks: any[] = [];

// Получить все задачи
app.get('/api/tasks', (req: Request, res: Response) => {
    res.json(tasks);
});

// Создать новую задачу
app.post('/api/tasks', (req: Request, res: Response) => {
    const task = { ...req.body, id: Date.now(), status: 'incomplete' };
    tasks.push(task);
    res.status(201).json(task);
});

app.post('/api/tasks/:id/upload', upload.single('file'), (req: Request, res: Response) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).send('Task not found'); // Убираем return, так как отправка ответа уже завершает выполнение
    } else if (!req.file) {
        res.status(400).send('No file uploaded');
    } else {
        task.file = req.file.path;
        res.json(task);  // Здесь также убираем return
    }
});

// Обновить статус задачи
app.put('/api/tasks/:id', (req: Request, res: Response) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).send('Task not found');
    }
    else {
        task.status = req.body.status;
        task.dueDate = req.body.dueDate;
        res.json(task);
    }
});

// Удалить задачу
app.delete('/api/tasks/:id', (req: Request, res: Response) => {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
