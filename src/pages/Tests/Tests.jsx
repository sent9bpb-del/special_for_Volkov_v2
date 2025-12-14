import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileQuestion, Circle, Play, Award, X, CheckCircle2, Clock } from 'lucide-react'
import { useProgress } from '../../context/ProgressContext'
import { useLanguage } from '../../context/LanguageContext'
import { testsData } from '../../data/testsData.jsx'
import './Tests.css'

const getDifficultyTranslation = (difficulty, t) => {
  const map = {
    'Легкий': t('testDifficultyEasy'),
    'Средний': t('testDifficultyMedium'),
    'Сложный': t('testDifficultyHard')
  }
  return map[difficulty] || difficulty
}

const Tests = () => {
  const { progress, updateTestProgress } = useProgress()
  const { t, language } = useLanguage()
  const [activeTest, setActiveTest] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [testResults, setTestResults] = useState(null)
  const [timeLeft, setTimeLeft] = useState(null)
  const timerRef = useRef(null)

  // Получаем переведенные данные тестов
  const getTranslatedTests = () => {
    const lang = language || 'ru'
    return testsData.map(test => ({
      ...test,
      title: lang === 'en' && test.title_en ? test.title_en : test.title,
      description: lang === 'en' && test.description_en ? test.description_en : test.description,
      timeLimit: lang === 'en' && test.timeLimit_en ? test.timeLimit_en : test.timeLimit,
      questions: test.questions.map(q => ({
        ...q,
        question: lang === 'en' && q.question_en ? q.question_en : q.question,
        options: lang === 'en' && q.options_en ? q.options_en : q.options
      }))
    }))
  }

  const translatedTests = getTranslatedTests()

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981'
    if (score >= 60) return '#f59e0b'
    return '#ef4444'
  }

  const getDifficultyColor = (difficulty) => {
    const difficultyLower = difficulty.toLowerCase()
    if (difficultyLower.includes('easy') || difficultyLower.includes('легк')) return '#10b981'
    if (difficultyLower.includes('medium') || difficultyLower.includes('средн')) return '#f59e0b'
    if (difficultyLower.includes('hard') || difficultyLower.includes('сложн')) return '#ef4444'
    return '#6366f1'
  }

  const parseTimeLimit = (timeLimit) => {
    // Парсим "15 мин" или "15 min" в секунды
    const match = timeLimit.match(/(\d+)/)
    if (match) {
      return parseInt(match[1]) * 60 // конвертируем минуты в секунды
    }
    return 900 // дефолт 15 минут
  }

  const startTest = (testId) => {
    setActiveTest(testId)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setTestResults(null)
    
    // Запускаем таймер
    const test = translatedTests.find(t => t.id === testId)
    const timeInSeconds = parseTimeLimit(test.timeLimit)
    setTimeLeft(timeInSeconds)
  }

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const handleNextQuestion = () => {
    const test = translatedTests.find(t => t.id === activeTest)
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      finishTest()
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const finishTest = useCallback(() => {
    if (!activeTest) return
    
    const test = translatedTests.find(t => t.id === activeTest)
    if (!test) return
    
    let correct = 0
    
    test.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) {
        correct++
      }
    })

    const score = Math.round((correct / test.questions.length) * 100)
    setTestResults({ correct, total: test.questions.length, score })
    updateTestProgress(activeTest, score)
    
    // Останавливаем таймер
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [activeTest, selectedAnswers, updateTestProgress, translatedTests])

  const closeTest = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setActiveTest(null)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setTestResults(null)
    setTimeLeft(null)
  }

  // Таймер для теста
  useEffect(() => {
    if (activeTest && timeLeft !== null && timeLeft > 0 && !testResults) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Время вышло - принудительно завершаем тест
            finishTest()
            if (timerRef.current) {
              clearInterval(timerRef.current)
              timerRef.current = null
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null
        }
      }
    }
  }, [activeTest, timeLeft, testResults, finishTest])

  // Очистка таймера при завершении теста
  useEffect(() => {
    if (testResults && timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [testResults])

  return (
    <div className="tests">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="tests-header"
      >
        <h1 className="page-title">
          <FileQuestion size={32} />
          {t('testsTitle')}
        </h1>
        <p className="page-subtitle">{t('testsSubtitle')}</p>
      </motion.div>

      <div className="tests-grid">
        {translatedTests.map((test, index) => {
          const testScore = progress.tests[test.id] || 0
          const isCompleted = testScore > 0

          return (
            <motion.div
              key={test.id}
              className="test-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="test-header">
                <div className="test-icon">
                  <FileQuestion size={24} />
                </div>
                <div className="test-status">
                  {isCompleted ? (
                    <Award size={20} className="completed" style={{ color: getScoreColor(testScore) }} />
                  ) : (
                    <Circle size={20} />
                  )}
                </div>
              </div>

              <h3 className="test-title">{test.title}</h3>
              <p className="test-description">{test.description}</p>

              <div className="test-info">
                <div className="info-item">
                  <span className="info-label">{t('questions')}:</span>
                  <span className="info-value">{test.questions.length}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t('time')}:</span>
                  <span className="info-value">{test.timeLimit}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t('difficulty')}:</span>
                  <span
                    className="info-value difficulty"
                    style={{ color: getDifficultyColor(test.difficulty) }}
                  >
                    {getDifficultyTranslation(test.difficulty, t)}
                  </span>
                </div>
              </div>

              {isCompleted && (
                <motion.div
                  className="test-score"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{ borderColor: getScoreColor(testScore) }}
                >
                  <div className="score-circle" style={{ borderColor: getScoreColor(testScore) }}>
                    <span style={{ color: getScoreColor(testScore) }}>{testScore}%</span>
                  </div>
                  <p className="score-label">{t('result')}</p>
                </motion.div>
              )}

              <motion.button
                className="test-start-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => startTest(test.id)}
              >
                <Play size={18} />
                {isCompleted ? t('retake') : t('startTest')}
              </motion.button>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {activeTest && (
          <motion.div
            className="test-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeTest}
          >
            <motion.div
              className="test-modal-content"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {testResults ? (
                <div className="test-results">
                  <motion.button
                    className="test-close-btn"
                    onClick={closeTest}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={24} />
                  </motion.button>
                  <motion.div
                    className="results-content"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <Award size={64} className="results-icon" style={{ color: getScoreColor(testResults.score) }} />
                    <h2 className="results-title">{t('testCompleted')}</h2>
                    <div className="results-score" style={{ color: getScoreColor(testResults.score) }}>
                      {testResults.score}%
                    </div>
                    <p className="results-message" style={{ 
                      color: testResults.score >= 50 ? '#10b981' : '#ef4444',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      marginTop: '1rem',
                      marginBottom: '0.5rem'
                    }}>
                      {testResults.score >= 50 ? t('wellDone') : t('dontWorry')}
                    </p>
                    <p className="results-text">
                      {t('correctAnswers')}: {testResults.correct} {t('of')} {testResults.total}
                    </p>
                    <motion.button
                      className="test-restart-btn"
                      onClick={() => startTest(activeTest)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('retakeTest')}
                    </motion.button>
                  </motion.div>
                </div>
              ) : (
                <>
                  <div className="test-modal-header">
                    <h2 className="test-modal-title">
                      {testsData.find(t => t.id === activeTest)?.title}
                    </h2>
                    <motion.button
                      className="test-close-btn"
                      onClick={closeTest}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={24} />
                    </motion.button>
                  </div>

                  <div className="test-progress-container">
                    <div className="test-progress-bar">
                      <motion.div
                        className="test-progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestion + 1) / testsData.find(t => t.id === activeTest).questions.length) * 100}%` }}
                      />
                      <span className="test-progress-text">
                        {t('question')} {currentQuestion + 1} {t('of')} {translatedTests.find(t => t.id === activeTest).questions.length}
                      </span>
                    </div>
                    {timeLeft !== null && (
                      <div className="test-timer" style={{ 
                        color: timeLeft <= 60 ? '#ef4444' : timeLeft <= 180 ? '#f59e0b' : 'var(--text-primary)',
                        fontWeight: 600
                      }}>
                        <Clock size={20} />
                        <span>
                          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="test-question-container">
                    {(() => {
                      const test = translatedTests.find(t => t.id === activeTest)
                      const question = test.questions[currentQuestion]
                      
                      return (
                        <>
                          <h3 className="test-question-text">{question.question}</h3>
                          <div className="test-options">
                            {question.options.map((option, index) => (
                              <motion.button
                                key={index}
                                className={`test-option ${selectedAnswers[question.id] === index ? 'selected' : ''}`}
                                onClick={() => handleAnswerSelect(question.id, index)}
                                whileHover={{ scale: 1.02, x: 5 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="option-indicator">
                                  {selectedAnswers[question.id] === index ? (
                                    <CheckCircle2 size={20} />
                                  ) : (
                                    <Circle size={20} />
                                  )}
                                </div>
                                <span>{option}</span>
                              </motion.button>
                            ))}
                          </div>
                        </>
                      )
                    })()}
                  </div>

                  <div className="test-navigation">
                    <motion.button
                      className="test-nav-btn"
                      onClick={handlePrevQuestion}
                      disabled={currentQuestion === 0}
                      whileHover={{ scale: currentQuestion > 0 ? 1.05 : 1 }}
                      whileTap={{ scale: currentQuestion > 0 ? 0.95 : 1 }}
                    >
                      {t('back')}
                    </motion.button>
                    <motion.button
                      className="test-nav-btn primary"
                      onClick={handleNextQuestion}
                      disabled={selectedAnswers[translatedTests.find(t => t.id === activeTest).questions[currentQuestion].id] === undefined}
                      whileHover={{ scale: selectedAnswers[translatedTests.find(t => t.id === activeTest).questions[currentQuestion].id] !== undefined ? 1.05 : 1 }}
                      whileTap={{ scale: selectedAnswers[translatedTests.find(t => t.id === activeTest).questions[currentQuestion].id] !== undefined ? 0.95 : 1 }}
                    >
                      {currentQuestion === translatedTests.find(t => t.id === activeTest).questions.length - 1 ? t('finish') : t('next')}
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Tests

