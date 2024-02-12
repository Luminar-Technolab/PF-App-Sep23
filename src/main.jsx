import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './bootstrap.min.css'
import {BrowserRouter } from 'react-router-dom'
import ContextShare from './Context API/ContextShare.jsx'
import TokenAuth from './Context API/TokenAuth.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <TokenAuth>
     <ContextShare>
        <BrowserRouter> 
        <App /> 
        </BrowserRouter>
     </ContextShare>
   </TokenAuth>
  </React.StrictMode>,
)
