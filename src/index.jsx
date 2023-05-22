import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PostsProvider } from './contexts/PostsContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <PostsProvider>
     
    <App />

    </PostsProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

