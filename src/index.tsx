import ReactDOM from 'react-dom/client';
import React from 'react'
import App from '@/app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement)

root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
);
