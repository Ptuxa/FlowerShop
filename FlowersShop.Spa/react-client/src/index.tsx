import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Создаем корневой элемент с использованием createRoot API (React 18+)
const rootElement = document.getElementById('root');

// Проверяем, существует ли rootElement
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement as HTMLElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

// Если вы хотите начать измерять производительность приложения, используйте reportWebVitals
reportWebVitals();
