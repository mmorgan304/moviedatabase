import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter as Router} from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router>
          <App />
      </Router>
  </StrictMode>,
)
