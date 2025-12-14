import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import { useProgress } from '../../context/ProgressContext'
import { useLanguage } from '../../context/LanguageContext'
import { lessonsData } from '../../data/lessonsData.jsx'
import './Learning.css'

const Learning = () => {
  const { progress, updateLessonProgress } = useProgress()
  const { t, language } = useLanguage()
  const contentRef = useRef(null)
  const [overallProgress, setOverallProgress] = useState(0)

  // Получаем переведенные данные урока
  const getTranslatedLesson = () => {
    const baseLesson = lessonsData[0]
    if (!baseLesson) return null
    
    const lang = language || 'ru'
    
    // Если язык английский и есть переводы, используем их
    if (lang === 'en' && baseLesson.title_en) {
      return {
        ...baseLesson,
        title: baseLesson.title_en,
        sections: baseLesson.sections?.map(section => ({
          ...section,
          title: section.title_en || section.title,
          content: section.content_en || section.content
        })) || []
      }
    }
    
    return baseLesson
  }
  
  const lesson = getTranslatedLesson()

  // Загружаем сохраненный прогресс
  useEffect(() => {
    if (lesson) {
      const savedProgress = progress.lessons[lesson.id] || 0
      setOverallProgress(savedProgress)
    }
  }, [progress, lesson])

  // Отслеживание прокрутки для автоматического обновления прогресса
  useEffect(() => {
    if (!contentRef.current || !lesson) return

    const handleScroll = () => {
      const container = contentRef.current
      if (!container) return

      const scrollTop = container.scrollTop
      const scrollHeight = container.scrollHeight - container.clientHeight
      const scrollPercentage = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100))

      if (lesson) {
        setOverallProgress(Math.round(scrollPercentage))
        updateLessonProgress(lesson.id, Math.round(scrollPercentage))
      }
    }

    const container = contentRef.current
    container.addEventListener('scroll', handleScroll)
    
    // Инициализируем прогресс при первой загрузке
    handleScroll()
    
    return () => container.removeEventListener('scroll', handleScroll)
  }, [updateLessonProgress, lesson])

  if (!lesson) {
    return (
      <div className="learning">
        <div className="learning-header">
          <h1 className="page-title">
            <BookOpen size={32} />
            {t('learningTitle')}
          </h1>
          <p className="page-subtitle">{t('loading')}</p>
        </div>
      </div>
    )
  }

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="learning">
      <motion.div
        className="learning-header"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="page-title"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <BookOpen size={32} />
          </motion.span>
          {lesson.title}
        </motion.h1>
        <motion.div 
          className="lesson-progress-header"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <span>{t('readingProgress')}: {overallProgress}%</span>
          <div className="progress-bar-container-large">
            <motion.div
              className="progress-bar"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut"
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="lesson-content-container" 
        ref={contentRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {lesson.sections?.map((section, index) => (
          <motion.div
            key={section.id}
            className="lesson-section"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.5,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.01,
              transition: { duration: 0.2 }
            }}
          >
            <motion.h2 
              className="section-title-large"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {section.title}
            </motion.h2>
            <motion.div 
              className="section-content-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {section.content.split('\n').map((paragraph, idx) => (
                paragraph.trim() && (
                  <motion.p 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + idx * 0.02 }}
                  >
                    {paragraph.trim()}
                  </motion.p>
                )
              ))}
            </motion.div>

            {Array.isArray(section.images) && section.images.length > 0 && (
              <motion.div
                className="lesson-gallery"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.35 }}
              >
                {section.images.map((img, imgIdx) => (
                  <motion.figure
                    key={`${section.id}-img-${imgIdx}`}
                    className="lesson-figure"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.35 + imgIdx * 0.04 }}
                    whileHover={{ y: -4, scale: 1.01 }}
                  >
                    <img
                      className="lesson-image"
                      src={img.src}
                      alt={img.alt || t('illustration')}
                      loading="lazy"
                    />
                    {img.caption && <figcaption className="lesson-caption">{img.caption}</figcaption>}
                  </motion.figure>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Learning
