import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Settings as SettingsIcon, Palette, Gamepad2, Globe } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'
import './Settings.css'

const Settings = () => {
  const { colorTheme, changeColorTheme, colorThemes } = useTheme()
  const { language, changeLanguage, t } = useLanguage()
  const { currentUser } = useAuth()
  
  // Получаем ключ для сохранения настроек чилового отдыха
  const getChillLeisureKey = () => {
    return currentUser ? `chillLeisure_${currentUser.id}` : 'chillLeisure'
  }
  
  // Загружаем состояние чилового отдыха из localStorage (по умолчанию выключен)
  const [chillLeisure, setChillLeisure] = useState(() => {
    const key = currentUser ? `chillLeisure_${currentUser.id}` : 'chillLeisure'
    const saved = localStorage.getItem(key)
    return saved === 'true' // По умолчанию false (выключен)
  })
  
  // Обновляем состояние при смене пользователя
  useEffect(() => {
    const key = currentUser ? `chillLeisure_${currentUser.id}` : 'chillLeisure'
    const saved = localStorage.getItem(key)
    setChillLeisure(saved === 'true')
  }, [currentUser])
  
  // Сохраняем состояние в localStorage
  useEffect(() => {
    const key = currentUser ? `chillLeisure_${currentUser.id}` : 'chillLeisure'
    localStorage.setItem(key, chillLeisure.toString())
  }, [chillLeisure, currentUser])
  
  const handleChillLeisureChange = (e) => {
    setChillLeisure(e.target.checked)
  }

  const themeOptions = [
    { value: 'cyan', label: t('cyan') },
    { value: 'violet', label: t('violet') },
    { value: 'amber', label: t('amber') },
    { value: 'emerald', label: t('emerald') },
  ]

  return (
    <div className="settings">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="settings-header"
      >
        <h1 className="page-title">
          <SettingsIcon size={32} />
          {t('settingsTitle')}
        </h1>
      </motion.div>

      <div className="settings-content">
        <motion.div
          className="settings-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2>{t('appearance')}</h2>
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-icon">
                <Palette size={20} />
              </div>
              <div>
                <h3>{t('theme')}</h3>
                <p>{t('themeDescription')}</p>
              </div>
            </div>
            <select
              className="theme-select"
              value={colorTheme}
              onChange={(e) => changeColorTheme(e.target.value)}
            >
              {themeOptions.map((theme) => (
                <option key={theme.value} value={theme.value}>
                  {theme.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        <motion.div
          className="settings-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2>{t('chillLeisure')}</h2>
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-icon">
                <Gamepad2 size={20} />
              </div>
              <div>
                <h3>{t('chillLeisure')}</h3>
                <p>{t('chillLeisureDescription')}</p>
              </div>
            </div>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={chillLeisure}
                onChange={handleChillLeisureChange}
              />
              <span className="slider"></span>
            </label>
          </div>
        </motion.div>

        <motion.div
          className="settings-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2>{t('language')}</h2>
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-icon">
                <Globe size={20} />
              </div>
              <div>
                <h3>{t('languageTitle')}</h3>
                <p>{t('languageDescription')}</p>
              </div>
            </div>
            <select 
              className="language-select"
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <option value="ru">{t('russian')}</option>
              <option value="en">{t('english')}</option>
            </select>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Settings
