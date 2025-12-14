import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('currentUser')
    }
  }, [currentUser])

  const register = (username, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    // Проверяем, существует ли пользователь
    if (users.find(u => u.username === username || u.email === email)) {
      throw new Error('Пользователь с таким именем или email уже существует')
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password, // В реальном приложении нужно хешировать пароль
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    
    // Создаем прогресс для нового пользователя
    const userProgress = {
      lessons: {},
      labs: {},
      tests: {},
      overall: 0
    }
    localStorage.setItem(`progress_${newUser.id}`, JSON.stringify(userProgress))

    setCurrentUser(newUser)
    return newUser
  }

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.username === username && u.password === password)
    
    if (!user) {
      throw new Error('Неверное имя пользователя или пароль')
    }

    setCurrentUser(user)
    return user
  }

  const logout = () => {
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}


