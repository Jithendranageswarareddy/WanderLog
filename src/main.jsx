import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { BucketListProvider } from './context/BucketListContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <BucketListProvider>
          <App />
        </BucketListProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
