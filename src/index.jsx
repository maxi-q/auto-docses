import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ReactDOM from 'react-dom/client';

import React from 'react';
import 'normalize.css'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

// import './styles/style.css'
// import './styles/hardcss.css'

import { Pages } from './pages';
import { Main } from './pages';
import { LoadPage } from './pages';
import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}>
        <Route path='/Home' element={<Main/>}/>
        <Route path='/LoadPage' element={<LoadPage/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
  </>
);

// Из pages взять index с роутами