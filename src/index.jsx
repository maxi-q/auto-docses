import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App';
import './styles/style.css'
import 'normalize.css'
import Main from './pages/main';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}>
        <Route path='main' element={<Main/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
);