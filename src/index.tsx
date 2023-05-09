import ReactDOM from 'react-dom/client'

// Импортируйте наш пользовательский CSS
import './scss/styles.scss'
import './scss/styles.css'

// Импортируйте весь JS Bootstrap
// import * as bootstrap from 'bootstrap'

import { App } from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as Element)

root.render(
  <App />
)

const devMode = process.env.NODE_ENV === 'development'
if(devMode && module && module.hot) {
  module.hot.accept()
}