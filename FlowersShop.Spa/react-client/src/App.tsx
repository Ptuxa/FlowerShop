import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Task {
    id: string;
    title: string;
    status: string;
    dueDate?: string;
    image?: string; 
}

const TaskUploader: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
    };

    // Обработка загрузки файла
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    // Обработка формы создания задачи
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', taskTitle);
        formData.append('dueDate', dueDate);
        if (file) {
            formData.append('image', file);
        }

        try {
            await axios.post('/api/tasks', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchTasks(); // обновляем список задач
        } catch (error) {
            console.error('Error uploading task:', error);
        }
    };

    return (
        <div>
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="Task title"
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Create Task</button>
            </form>

            <h2>Task List</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <h3>{task.title}</h3>
                        <p>Status: {task.status}</p>
                        {task.dueDate && <p>Due Date: {task.dueDate}</p>}
                        {task.image && (
                            <img
                                src={`data:image/jpeg;base64,${task.image}`}
                                alt="Task image"
                                style={{ width: '200px', height: 'auto' }}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskUploader;
