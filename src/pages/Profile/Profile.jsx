import { motion } from 'framer-motion'
import { User, Mail, Award, BookOpen, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'
import { useLanguage } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'
import './Profile.css'

const Profile = () => {
  const { progress } = useProgress()
  const { t } = useLanguage()
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!currentUser) {
    return (
      <div className="profile">
        <div className="profile-header">
          <h1 className="page-title">
            <User size={32} />
            {t('profileTitle')}
          </h1>
        </div>
        <div className="profile-content">
          <p>{t('pleaseLogin')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="profile">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="profile-header"
      >
        <h1 className="page-title">
          <User size={32} />
          {t('profileTitle')}
        </h1>
      </motion.div>

      <div className="profile-content">
        <motion.div
          className="profile-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="profile-avatar">
            <User size={60} />
          </div>
          <h2 className="profile-name">{currentUser.username}</h2>
          <p className="profile-email">
            <Mail size={16} />
            {currentUser.email}
          </p>
          <div className="profile-stats">
            <div className="stat-item">
              <Award size={20} />
              <span>{t('level')}: {Math.floor(progress.overall / 20) + 1}</span>
            </div>
            <div className="stat-item">
              <BookOpen size={20} />
              <span>{t('progress')}: {progress.overall}%</span>
            </div>
          </div>
          <motion.button
            className="profile-logout-button"
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={20} />
            <span>{t('logout')}</span>
          </motion.button>
        </motion.div>

        <motion.div
          className="achievements-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3>{t('achievements')}</h3>
          <div className="achievements-grid">
            {[
              { name: t('firstLesson'), earned: progress.lessons[1] > 0 },
              { name: t('allLessons'), earned: Object.keys(progress.lessons).length === 4 },
              { name: t('firstLab'), earned: progress.labs[1] > 0 },
              { name: t('firstTest'), earned: progress.tests[1] > 0 },
            ].map((achievement, index) => (
              <motion.div
                key={achievement.name}
                className={`achievement ${achievement.earned ? 'earned' : ''}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Award size={24} />
                <span>{achievement.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile

