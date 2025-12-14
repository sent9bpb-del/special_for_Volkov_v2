import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '40px', 
          fontFamily: 'sans-serif',
          color: '#fff',
          background: '#1a1a1a',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1 style={{ color: '#f59e0b', marginBottom: '20px' }}>Ошибка загрузки приложения</h1>
          <p style={{ marginBottom: '20px' }}>{this.state.error?.message || 'Произошла неизвестная ошибка'}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              background: '#06b6d4',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Перезагрузить страницу
          </button>
          {this.state.error?.stack && (
            <details style={{ marginTop: '20px', width: '100%', maxWidth: '800px' }}>
              <summary style={{ cursor: 'pointer', color: '#06b6d4' }}>Детали ошибки</summary>
              <pre style={{ 
                background: '#2a2a2a', 
                padding: '15px', 
                borderRadius: '5px', 
                overflow: 'auto',
                marginTop: '10px',
                fontSize: '12px'
              }}>
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary


