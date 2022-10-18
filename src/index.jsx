import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import Main from './pages/main';
import React from 'react';
import App from './App';
import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import './styles/style.css'
import './styles/hardcss.css'
import LoadPage from './pages/LoadPage';
import Test from './pages/Test';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}>
        <Route path='Home' element={<Main/>}/>
        <Route path='/LoadPage' element={<LoadPage/>}/>
        <Route path='/Test' element={<Test/>}/>
      </Route>
      
    </Routes>
  </BrowserRouter>
);

