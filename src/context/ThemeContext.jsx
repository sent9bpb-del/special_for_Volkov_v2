import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

const hexToRgb = (hex) => {
  if (!hex || typeof hex !== 'string') return { r: 0, g: 0, b: 0 }
  let value = hex.trim().replace('#', '')
  if (value.length === 3) value = value.split('').map((c) => c + c).join('')
  if (value.length !== 6) return { r: 0, g: 0, b: 0 }

  const num = parseInt(value, 16)
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  }
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

const colorThemes = {
  cyan: {
    mode: 'dark',
    primary: '#06b6d4',
    secondary: '#22d3ee',
    name: 'cyan'
  },
  violet: {
    mode: 'dark',
    primary: '#8b5cf6',
    secondary: '#a78bfa',
    name: 'violet'
  },
  amber: {
    mode: 'dark',
    primary: '#f59e0b',
    secondary: '#fbbf24',
    name: 'amber'
  },
  emerald: {
    mode: 'dark',
    primary: '#10b981',
    secondary: '#34d399',
    name: 'emerald'
  }
}

export const ThemeProvider = ({ children }) => {
  const [colorTheme, setColorTheme] = useState(() => {
    const saved = localStorage.getItem('colorTheme')
    return saved || 'cyan'
  })

  useEffect(() => {
    const validTheme = colorThemes[colorTheme] ? colorTheme : 'cyan'
    if (validTheme !== colorTheme) {
      setColorTheme(validTheme)
      localStorage.setItem('colorTheme', validTheme)
    } else {
      localStorage.setItem('colorTheme', colorTheme)
    }
    
    const theme = colorThemes[validTheme]
    if (!theme) return
    
    document.documentElement.setAttribute('data-theme', theme.mode)
    document.documentElement.setAttribute('data-color-theme', theme.name)
    
    // Устанавливаем CSS переменные для цветов
    const root = document.documentElement
    root.style.setProperty('--accent-primary', theme.primary)
    root.style.setProperty('--accent-secondary', theme.secondary)
    const primaryRgb = hexToRgb(theme.primary)
    const secondaryRgb = hexToRgb(theme.secondary)
    root.style.setProperty('--accent-primary-rgb', `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`)
    root.style.setProperty('--accent-secondary-rgb', `${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}`)
    root.style.setProperty('--gradient-primary', `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`)
  }, [colorTheme])

  const changeColorTheme = (themeName) => {
    setColorTheme(themeName)
  }

  return (
    <ThemeContext.Provider value={{ colorTheme, changeColorTheme, colorThemes }}>
      {children}
    </ThemeContext.Provider>
  )
}
