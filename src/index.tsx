import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'

if (process.env.NODE_ENV == 'development') {
  require('./mocks/browser')
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
