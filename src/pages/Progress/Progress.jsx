import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, BookOpen, FlaskConical, FileQuestion } from 'lucide-react'
import { useProgress } from '../../context/ProgressContext'
import { useLanguage } from '../../context/LanguageContext'
import { lessonsData } from '../../data/lessonsData.jsx'
import './Progress.css'

const Progress = () => {
  const { progress } = useProgress()
  const { t } = useLanguage()

  // Подсчитываем количество прочитанных глав и общее количество глав
  const calculateChapters = () => {
    let totalChapters = 0
    let readChapters = 0

    lessonsData.forEach(lesson => {
      const lessonSections = lesson.sections?.length || 0
      totalChapters += lessonSections
      
      const lessonProgress = progress.lessons[lesson.id] || 0
      if (lessonProgress > 0) {
        // Если урок начат, считаем прочитанные главы пропорционально прогрессу
        const readInLesson = Math.ceil((lessonSections * lessonProgress) / 100)
        readChapters += readInLesson
      }
    })

    return { readChapters, totalChapters }
  }

  const { readChapters, totalChapters } = calculateChapters()

  // Подсчитываем прогресс по лабораторным работам
  const calculateLabsProgress = () => {
    const totalLabs = 4
    const completedLabs = Object.values(progress.labs).filter(val => val === 100).length
    const avgProgress = Object.values(progress.labs).length > 0
      ? Object.values(progress.labs).reduce((sum, val) => sum + val, 0) / Object.values(progress.labs).length
      : 0
    return { completed: completedLabs, total: totalLabs, progress: avgProgress }
  }

  // Подсчитываем прогресс по тестам
  const calculateTestsProgress = () => {
    const totalTests = 3
    const completedTests = Object.keys(progress.tests).length
    const avgScore = Object.values(progress.tests).length > 0
      ? Object.values(progress.tests).reduce((sum, val) => sum + val, 0) / Object.values(progress.tests).length
      : 0
    return { completed: completedTests, total: totalTests, progress: avgScore }
  }

  const labsProgress = calculateLabsProgress()
  const testsProgress = calculateTestsProgress()

  // Подсчитываем средний прогресс по урокам
  const lessonsAvgProgress = Object.values(progress.lessons).length > 0
    ? Object.values(progress.lessons).reduce((sum, val) => sum + val, 0) / Object.values(progress.lessons).length
    : 0

  const stats = [
    {
      label: t('lessons'),
      value: readChapters,
      total: totalChapters,
      progress: lessonsAvgProgress,
      icon: BookOpen,
      color: '#6366f1'
    },
    {
      label: t('labs'),
      value: labsProgress.completed,
      total: labsProgress.total,
      progress: labsProgress.progress,
      icon: FlaskConical,
      color: '#10b981'
    },
    {
      label: t('tests'),
      value: testsProgress.completed,
      total: testsProgress.total,
      progress: testsProgress.progress,
      icon: FileQuestion,
      color: '#f59e0b'
    },
  ]

  return (
    <div className="progress-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="progress-header"
      >
        <h1 className="page-title">
          <BarChart3 size={32} />
          {t('progressTitle')}
        </h1>
        <p className="page-subtitle">{t('progressSubtitle')}</p>
      </motion.div>

      <div className="overall-progress-card">
        <motion.div
          className="overall-progress"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="progress-circle-container">
            <svg className="progress-circle" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="var(--bg-progress)"
                strokeWidth="12"
              />
              <motion.circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="12"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress.overall / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                transform="rotate(-90 100 100)"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="progress-value">
              <span className="progress-number">{progress.overall}%</span>
            </div>
          </div>
        </motion.div>
        <div className="overall-progress-label">
          {t('overallProgress')}
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="stat-header">
              <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                <stat.icon size={24} />
              </div>
              <div className="stat-info">
                <h3 className="stat-label">{stat.label}</h3>
                <p className="stat-count">{stat.value} / {stat.total}</p>
              </div>
            </div>
            <div className="stat-progress">
              <div className="progress-bar-container">
                <motion.div
                  className="progress-bar"
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  style={{ background: stat.color }}
                />
              </div>
              <span className="progress-percentage">{Math.round(stat.progress)}%</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="recent-activity">
        <h2 className="section-title">{t('recentActivity')}</h2>
        <div className="activity-list">
          {[
            ...Object.entries(progress.lessons).map(([id, value]) => ({
              type: 'lesson',
              id,
              value,
              label: `${t('lessons')} ${id}`,
              icon: BookOpen
            })),
            ...Object.entries(progress.labs).map(([id, value]) => ({
              type: 'lab',
              id,
              value,
              label: `Лабораторная работа ${id}`,
              icon: FlaskConical
            })),
            ...Object.entries(progress.tests).map(([id, value]) => ({
              type: 'test',
              id,
              value,
              label: `Тест ${id}`,
              icon: FileQuestion
            }))
          ]
            .sort((a, b) => b.value - a.value)
            .slice(0, 6)
            .map((activity, index) => (
              <motion.div
                key={`${activity.type}-${activity.id}`}
                className="activity-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <activity.icon size={20} />
                <div className="activity-content">
                  <p>{activity.label}</p>
                  <span>{activity.value}% {activity.type === 'test' ? t('points') : t('completed')}</span>
                </div>
              </motion.div>
            ))}
          {Object.keys(progress.lessons).length === 0 && 
           Object.keys(progress.labs).length === 0 && 
           Object.keys(progress.tests).length === 0 && (
            <div className="activity-empty">
              <p>{t('noActivity')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Progress

