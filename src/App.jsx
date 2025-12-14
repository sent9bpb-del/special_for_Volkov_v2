import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import { AuthProvider } from './context/AuthContext'
import { ProgressProvider } from './context/ProgressContext'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import Learning from './pages/Learning/Learning'
import Labs from './pages/Labs/Labs'
import Tests from './pages/Tests/Tests'
import Progress from './pages/Progress/Progress'
import Profile from './pages/Profile/Profile'
import Settings from './pages/Settings/Settings'
import Help from './pages/Help/Help'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import './App.css'

function App() {
  try {
    return (
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <ProgressProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="learning" element={<Learning />} />
                    <Route path="labs" element={<Labs />} />
                    <Route path="tests" element={<Tests />} />
                    <Route path="progress" element={<Progress />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="help" element={<Help />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </ProgressProvider>
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    )
  } catch (error) {
    console.error('App error:', error)
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h1>Ошибка загрузки приложения</h1>
        <p>{error.message}</p>
        <pre>{error.stack}</pre>
      </div>
    )
  }
}

export default App
