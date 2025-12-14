import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, FlaskConical, FileQuestion } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'
import { useLanguage } from '../../context/LanguageContext'
import './Home.css'

const Home = () => {
  const { progress } = useProgress()
  const { t } = useLanguage()

  const stats = [
    { label: t('lessonsCompleted'), value: Object.keys(progress.lessons).length, icon: BookOpen, color: '#6366f1' },
    { label: t('labsCompleted'), value: Object.keys(progress.labs).length, icon: FlaskConical, color: '#10b981' },
    { label: t('testsCompleted'), value: Object.keys(progress.tests).length, icon: FileQuestion, color: '#f59e0b' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="home">
      <motion.div
        className="home-hero"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="hero-title" 
          variants={itemVariants}
          animate={{ 
            backgroundPosition: ['0%', '100%', '0%'],
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {t('welcome')}
          <motion.span 
            className="gradient-text"
            animate={{
              backgroundPosition: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {' '}SAPR Technology
          </motion.span>
        </motion.h1>
        <motion.p 
          className="hero-subtitle" 
          variants={itemVariants}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {t('heroSubtitle')}
        </motion.p>

        <motion.div className="hero-actions" variants={itemVariants}>
          <Link to="/learning">
            <motion.button
              className="btn-primary"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 40px rgba(99, 102, 241, 0.5)",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 4px 20px rgba(99, 102, 241, 0.3)",
                  "0 8px 30px rgba(99, 102, 241, 0.5)",
                  "0 4px 20px rgba(99, 102, 241, 0.3)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {t('startLearning')}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={20} />
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="stats-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="stat-card"
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
              <stat.icon size={32} />
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="quick-links"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="section-title">{t('quickAccess')}</h2>
        <div className="links-grid">
          {[
            { to: '/learning', title: t('learning'), desc: t('studyMaterials'), icon: BookOpen },
            { to: '/labs', title: t('labs'), desc: t('practicalTasks'), icon: FlaskConical },
            { to: '/tests', title: t('tests'), desc: t('checkKnowledge'), icon: FileQuestion },
          ].map((link, index) => (
            <motion.div
              key={link.to}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Link to={link.to} className="quick-link-card">
                <link.icon size={40} className="link-icon" />
                <h3>{link.title}</h3>
                <p>{link.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Home

