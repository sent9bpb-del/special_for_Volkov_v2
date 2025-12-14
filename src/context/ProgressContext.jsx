import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const ProgressContext = createContext()

export const useProgress = () => {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider')
  }
  return context
}

export const ProgressProvider = ({ children }) => {
  const { currentUser } = useAuth()
  
  const getStorageKey = () => {
    return currentUser ? `progress_${currentUser.id}` : 'learningProgress'
  }

  const [progress, setProgress] = useState(() => {
    const key = currentUser ? `progress_${currentUser.id}` : 'learningProgress'
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : {
      lessons: {},
      labs: {},
      tests: {},
      overall: 0
    }
  })

  // Обновляем прогресс при смене пользователя
  useEffect(() => {
    const key = getStorageKey()
    const saved = localStorage.getItem(key)
    if (saved) {
      const loadedProgress = JSON.parse(saved)
      // Пересчитываем overall прогресс при загрузке
      loadedProgress.overall = calculateOverallProgress(loadedProgress)
      setProgress(loadedProgress)
    } else {
      setProgress({
        lessons: {},
        labs: {},
        tests: {},
        overall: 0
      })
    }
  }, [currentUser])

  const calculateOverallProgress = (progressData) => {
    const lessonValues = Object.values(progressData.lessons || {})
    const labValues = Object.values(progressData.labs || {})
    const testValues = Object.values(progressData.tests || {})
    
    const totalItems = lessonValues.length + labValues.length + testValues.length
    if (totalItems === 0) return 0
    
    const totalProgress = 
      [...lessonValues, ...labValues, ...testValues].reduce((sum, val) => sum + val, 0)
    
    return Math.round(totalProgress / totalItems)
  }

  useEffect(() => {
    const key = getStorageKey()
    localStorage.setItem(key, JSON.stringify(progress))
  }, [progress, currentUser])

  const updateLessonProgress = (lessonId, percentage) => {
    setProgress(prev => {
      const updated = {
        ...prev,
        lessons: {
          ...prev.lessons,
          [lessonId]: percentage
        }
      }
      updated.overall = calculateOverallProgress(updated)
      return updated
    })
  }

  const updateLabProgress = (labId, percentage) => {
    setProgress(prev => {
      const updated = {
        ...prev,
        labs: {
          ...prev.labs,
          [labId]: percentage
        }
      }
      updated.overall = calculateOverallProgress(updated)
      return updated
    })
  }

  const updateTestProgress = (testId, score) => {
    setProgress(prev => {
      const updated = {
        ...prev,
        tests: {
          ...prev.tests,
          [testId]: score
        }
      }
      updated.overall = calculateOverallProgress(updated)
      return updated
    })
  }

  return (
    <ProgressContext.Provider value={{ progress, updateLessonProgress, updateLabProgress, updateTestProgress }}>
      {children}
    </ProgressContext.Provider>
  )
}


