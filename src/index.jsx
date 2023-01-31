import ReactDOM from 'react-dom/client';
import React from 'react';

import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <App />
);

// Из pages взять index с роутами