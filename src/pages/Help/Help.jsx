import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, ChevronDown, Book, Video, MessageCircle, Mail, Phone, Play, X } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import ChatBot from '../../components/ChatBot/ChatBot'
import './Help.css'

const Help = () => {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const videoPlayerRef = useRef(null)

  const videos = [
    {
      id: 1,
      title: 'Лира САПР: Как просматривать расчетную модель. Знакомство с интерфейсом.',
      src: '/videos/video1.mp4',
      thumbnail: null
    },
    {
      id: 2,
      title: 'Понятие САПР и их классификация',
      src: '/videos/video2.mp4',
      thumbnail: null
    },
    {
      id: 3,
      title: 'САПР: зачем нужна система автоматизированного проектирования и как выбирать подходящую',
      src: '/videos/video3.mp4',
      thumbnail: null
    }
  ]

  const handleVideoError = (e) => {
    console.error('Ошибка загрузки видео:', e.target.error)
    console.error('Путь к видео:', e.target.src)
    alert(`Не удалось загрузить видео: ${e.target.src}\nПроверьте, что файл существует в папке public/videos/`)
  }

  useEffect(() => {
    if (videoPlayerRef.current && selectedVideo) {
      const video = videoPlayerRef.current
      
      const tryPlay = async () => {
        try {
          // Сначала пробуем запустить без muted
          await video.play()
          console.log('Видео запущено успешно')
          video.muted = false
        } catch (err) {
          console.warn('Автозапуск видео заблокирован, пробуем с muted:', err)
          try {
            // Пробуем запустить с muted
            video.muted = true
            await video.play()
            console.log('Видео запущено с muted')
            // Через секунду убираем muted
            setTimeout(() => {
              video.muted = false
            }, 1000)
          } catch (err2) {
            console.warn('Не удалось запустить видео автоматически:', err2)
            // Показываем сообщение пользователю
            console.log('Пожалуйста, нажмите кнопку Play для запуска видео')
          }
        }
      }

      // Обработчики для запуска когда видео готово
      const onCanPlay = () => {
        console.log('Видео готово к воспроизведению')
        tryPlay()
      }
      
      const onLoadedData = () => {
        console.log('Данные видео загружены')
        tryPlay()
      }

      const onLoadedMetadata = () => {
        console.log('Метаданные видео загружены')
        tryPlay()
      }

      // Добавляем обработчики
      video.addEventListener('canplay', onCanPlay, { once: true })
      video.addEventListener('loadeddata', onLoadedData, { once: true })
      video.addEventListener('loadedmetadata', onLoadedMetadata, { once: true })
      video.addEventListener('error', handleVideoError)
      
      // Сбрасываем и загружаем видео
      video.load()
      
      // Также пробуем запустить через небольшую задержку
      setTimeout(tryPlay, 300)
      
      return () => {
        video.removeEventListener('canplay', onCanPlay)
        video.removeEventListener('loadeddata', onLoadedData)
        video.removeEventListener('loadedmetadata', onLoadedMetadata)
        video.removeEventListener('error', handleVideoError)
      }
    }
  }, [selectedVideo])

  const faqs = [
    {
      question: t('howToStart'),
      answer: t('howToStartAnswer')
    },
    {
      question: t('howToLab'),
      answer: t('howToLabAnswer')
    },
    {
      question: t('howToTest'),
      answer: t('howToTestAnswer')
    },
    {
      question: t('whereProgress'),
      answer: t('whereProgressAnswer')
    },
  ]

  return (
    <div className="help">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="help-header"
      >
        <h1 className="page-title">
          <HelpCircle size={32} />
          {t('helpTitle')}
        </h1>
        <p className="page-subtitle">{t('helpSubtitle')}</p>
      </motion.div>

      <div className="help-content">
        <div className="help-cards">
          {[
            { icon: Book, title: t('documentation'), desc: t('detailedGuides'), onClick: () => window.open('https://www.tstu.ru/r.php?r=obuch.education.courses', '_blank') },
            { icon: Video, title: t('videoTutorials'), desc: t('learningVideos'), onClick: () => setIsVideoModalOpen(true) },
            { icon: MessageCircle, title: t('support'), desc: 'Чат-бот', onClick: () => setIsChatOpen(true) },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              className="help-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={card.onClick || undefined}
              style={{ cursor: card.onClick ? 'pointer' : 'default' }}
            >
              <card.icon size={40} className="help-card-icon" />
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </motion.div>
          ))}
        </div>


        <AnimatePresence>
          {isVideoModalOpen && (
            <motion.div
              className="video-select-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoModalOpen(false)}
            >
              <motion.div
                className="video-select-modal-content"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="video-select-header">
                  <h2 className="video-select-title">{t('videoTutorials')}</h2>
                  <motion.button
                    className="video-select-close-btn"
                    onClick={() => setIsVideoModalOpen(false)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={24} />
                  </motion.button>
                </div>
                <div className="video-select-grid">
                  {videos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      className="video-select-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      onClick={() => {
                        setSelectedVideo(video.id)
                        setIsVideoModalOpen(false)
                      }}
                    >
                      <div className="video-select-thumbnail">
                        <video
                          src={video.src}
                          preload="metadata"
                          className="video-select-preview"
                        />
                        <div className="video-select-play-overlay">
                          <Play size={48} className="video-select-play-icon" />
                        </div>
                      </div>
                      <h3 className="video-select-card-title">{video.title}</h3>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedVideo && typeof selectedVideo === 'number' && selectedVideo > 0 && (
            <motion.div
              className="video-player-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                className="video-player-modal-content"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="video-player-modal-close"
                  onClick={() => setSelectedVideo(null)}
                >
                  <X size={24} />
                </button>
                <video
                  ref={videoPlayerRef}
                  key={selectedVideo}
                  src={videos.find(v => v.id === selectedVideo)?.src}
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  className="video-player"
                  onError={handleVideoError}
                  onLoadedData={(e) => {
                    console.log('onLoadedData вызван')
                    e.target.play().catch(() => {
                      console.log('Пробуем запустить с muted')
                      e.target.muted = true
                      e.target.play().then(() => {
                        setTimeout(() => {
                          e.target.muted = false
                        }, 500)
                      }).catch(() => {
                        console.log('Не удалось запустить видео')
                      })
                    })
                  }}
                />
                <h3 className="video-player-modal-title">
                  {videos.find(v => v.id === selectedVideo)?.title}
                </h3>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="contact-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="contact-title">{t('contactUs')}</h2>
          <div className="contact-cards">
            <motion.a
              href="mailto:dead.inside212@mail.ru"
              className="contact-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="contact-icon-wrapper">
                <Mail size={28} className="contact-icon" />
              </div>
              <h3 className="contact-label">Email</h3>
              <p className="contact-value">dead.inside212@mail.ru</p>
            </motion.a>

            <motion.a
              href="tel:+79622390039"
              className="contact-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="contact-icon-wrapper">
                <Phone size={28} className="contact-icon" />
              </div>
              <h3 className="contact-label">{t('phone')}</h3>
              <p className="contact-value">+7 (962) 239-00-39</p>
            </motion.a>
          </div>
        </motion.div>

        <div className="faq-section">
          <h2>{t('faq')}</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="faq-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <button
                  className="faq-question"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}

export default Help

