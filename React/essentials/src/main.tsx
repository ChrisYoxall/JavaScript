import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Essentials from "./Essentials";
import './index.css'

// eslint-disable-next-line
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Essentials />
  </React.StrictMode>,
)
