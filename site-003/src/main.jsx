import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx'

//Intouito desse arquivo é prover o contexto de navegção da aplicação

import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// manter meu cliente em cache
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* garante que a aplicação do query CLiente funcione em qualquer lugar */}
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
