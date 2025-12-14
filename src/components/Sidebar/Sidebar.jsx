import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  FlaskConical,
  FileQuestion,
  BarChart3,
  User,
  Settings,
  HelpCircle,
  Home,
  Menu,
  ArrowLeft
} from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import './Sidebar.css'

const navItems = [
  { path: '/', icon: Home, key: 'home' },
  { path: '/learning', icon: BookOpen, key: 'learning' },
  { path: '/labs', icon: FlaskConical, key: 'labs' },
  { path: '/tests', icon: FileQuestion, key: 'tests' },
  { path: '/progress', icon: BarChart3, key: 'progress' },
  { path: '/profile', icon: User, key: 'profile' },
  { path: '/settings', icon: Settings, key: 'settings' },
  { path: '/help', icon: HelpCircle, key: 'help' },
]

const Sidebar = () => {
  const { t } = useLanguage()
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed))
  }, [isCollapsed])

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <motion.aside
      className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="sidebar-header">
        <motion.button
          className="burger-button"
          onClick={toggleSidebar}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          aria-label="Toggle sidebar"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isCollapsed ? (
              <motion.span
                key="menu"
                initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                transition={{ 
                  duration: 0.4, 
                  ease: [0.4, 0, 0.2, 1],
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.35 }
                }}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 0 }}
              >
                <Menu size={24} />
              </motion.span>
            ) : (
              <motion.span
                key="collapse"
                initial={{ opacity: 0, rotate: 180, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -180, scale: 0.5 }}
                transition={{ 
                  duration: 0.4, 
                  ease: [0.4, 0, 0.2, 1],
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.35 }
                }}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 0 }}
              >
                <ArrowLeft size={24} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
                title={isCollapsed ? t(item.key) : ''}
              >
                {({ isActive }) => (
                  <>
                    <motion.div
                      className="nav-icon"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon size={20} />
                    </motion.div>
                    <span className="nav-label">{t(item.key)}</span>
                    {isActive && (
                      <motion.div
                        className="active-indicator"
                        layoutId="activeIndicator"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    {isCollapsed && (
                      <div className="nav-tooltip">{t(item.key)}</div>
                    )}
                  </>
                )}
              </NavLink>
            </motion.div>
          )
        })}
      </nav>
    </motion.aside>
  )
}

export default Sidebar
