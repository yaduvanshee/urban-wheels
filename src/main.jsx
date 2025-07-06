import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <NotificationProvider>
    <AuthProvider>
        <App />
    </AuthProvider>
      </NotificationProvider>
  </BrowserRouter>
)