import { motion } from 'framer-motion'
import { LogIn } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'
import './Header.css'

const Header = () => {
  const { t } = useLanguage()
  const { currentUser } = useAuth()

  return (
    <motion.header
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="header-content">
        <div className="header-left">
          <Link to="/">
            <motion.div
              className="logo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h1>SAPR Technology</h1>
            </motion.div>
          </Link>
        </div>

        <div className="header-right">
          {!currentUser && (
            <Link to="/login">
              <motion.button
                className="login-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogIn size={18} />
                <span>Войти</span>
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  )
}

export default Header

