import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Task {
    id: number;
    title: string;
    status: string;
    dueDate?: string;
    file?: string;
}

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
    };

    const createTask = async () => {
        if (newTask) {
            await axios.post('/api/tasks', { title: newTask });
            fetchTasks();
            setNewTask('');
        }
    };
    
    const updateTaskStatus = async (id: number, status: string) => {
        await axios.put(`/api/tasks/${id}`, { status });
        fetchTasks(); 
    };

    const deleteTask = async (id: number) => {
        await axios.delete(`api/tasks/${id}`);
        fetchTasks(); 
    }    

    return (
        <div>
            <h1>Task List</h1>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter new task"
            />
            <button onClick={createTask}>Add Task</button>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title} - {task.status}
                        <button onClick={() => updateTaskStatus(task.id, 'complete')}>Complete</button>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
