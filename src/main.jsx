import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx'

try {
  const rootElement = document.getElementById('root')
  if (!rootElement) {
    throw new Error('Root element not found')
  }

  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  )
} catch (error) {
  console.error('Failed to render app:', error)
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif; background: #1a1a1a; color: #fff; min-height: 100vh;">
      <h1 style="color: #f59e0b;">Ошибка загрузки</h1>
      <p>${error.message}</p>
      <pre style="background: #2a2a2a; padding: 10px; border-radius: 5px; overflow: auto; color: #fff;">${error.stack}</pre>
      <button onclick="window.location.reload()" style="padding: 10px 20px; background: #06b6d4; color: #fff; border: none; border-radius: 5px; cursor: pointer; margin-top: 20px;">
        Перезагрузить страницу
      </button>
    </div>
  `
}
