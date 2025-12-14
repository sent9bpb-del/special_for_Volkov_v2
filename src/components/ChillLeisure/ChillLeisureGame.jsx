import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Music, Play, Pause, Volume2, VolumeX, GripVertical } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import './ChillLeisureGame.css'

const ChillLeisureGame = () => {
  const { currentUser } = useAuth()
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [circles, setCircles] = useState([])
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  
  const gameAreaRef = useRef(null)
  const audioRef = useRef(null)
  const animationFrameRef = useRef(null)
  const beatIntervalRef = useRef(null)
  const lastBeatTimeRef = useRef(0)
  const circlesRef = useRef([]) // Ref для текущих кругов

  // Загружаем состояние видимости из localStorage
  useEffect(() => {
    const checkVisibility = () => {
      if (currentUser) {
        const key = `chillLeisure_${currentUser.id}`
        const saved = localStorage.getItem(key)
        setIsVisible(saved === 'true')
      }
    }
    
    checkVisibility()
    
    // Проверяем изменения каждые 100мс (для синхронизации в той же вкладке)
    const interval = setInterval(checkVisibility, 100)
    
    // Слушаем изменения в localStorage для синхронизации между вкладками
    const handleStorageChange = (e) => {
      if (currentUser && e.key === `chillLeisure_${currentUser.id}`) {
        setIsVisible(e.newValue === 'true')
      }
    }
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [currentUser])

  // Проверка перекрытия кругов (улучшенная версия)
  const circlesOverlap = (x1, y1, size1, x2, y2, size2) => {
    const distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
    // Минимальное расстояние = сумма радиусов + запас
    const radius1 = size1 / 2
    const radius2 = size2 / 2
    const minDistance = radius1 + radius2 + 40 // Увеличенный запас между кругами
    return distance < minDistance
  }

  // Создание круга в случайной позиции без перекрытия
  const createCircle = useCallback(() => {
    if (!gameAreaRef.current) {
      console.warn('Game area ref is not available')
      return
    }
    
    const gameArea = gameAreaRef.current
    const rect = gameArea.getBoundingClientRect()
    const circleSize = 80 // Уменьшено с 100 до 80
    const outerSize = circleSize * 2.5
    const padding = 50 // Уменьшено с 60 до 50
    
    const maxX = rect.width - outerSize - padding * 2
    const maxY = rect.height - outerSize - padding * 2
    
    if (maxX <= 0 || maxY <= 0) {
      console.warn('Game area too small', { width: rect.width, height: rect.height })
      return
    }
    
    // Пытаемся найти позицию без перекрытия (максимум 100 попыток)
    let x, y
    let attempts = 0
    const maxAttempts = 100
    let foundPosition = false
    
    while (attempts < maxAttempts && !foundPosition) {
      x = Math.random() * maxX + padding + outerSize / 2
      y = Math.random() * maxY + padding + outerSize / 2
      attempts++
      
      // Проверяем перекрытие с существующими кругами (используем ref)
      const overlaps = circlesRef.current.some(circle => {
        if (circle.clicked || circle.missed) return false // Игнорируем кликнутые/пропущенные
        
        // Вычисляем текущий размер круга с учетом progress
        const currentOuterSize = circle.size + (circle.outerSize - circle.size) * (1 - circle.progress)
        
        // Проверяем перекрытие с учетом максимального размера (outerSize)
        return circlesOverlap(x, y, outerSize, circle.x, circle.y, currentOuterSize)
      })
      
      if (!overlaps) {
        foundPosition = true
      }
    }
    
    // Если не нашли позицию без перекрытия после всех попыток, не создаем круг
    if (!foundPosition) {
      console.log('Could not find non-overlapping position after', maxAttempts, 'attempts')
      return
    }
    
    const circle = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: circleSize,
      outerSize: outerSize,
      progress: 0,
      clicked: false,
      missed: false,
      zIndex: Date.now() // Уникальный z-index для каждого круга
    }
    
    setCircles(prev => [...prev, circle])
  }, []) // Убираем circles из зависимостей, используем ref

  // Обработка клика по кругу
  const handleCircleClick = (e, circleId) => {
    e.stopPropagation()
    
    setCircles(prev => prev.map(circle => {
      if (circle.id === circleId && !circle.clicked && !circle.missed) {
        // Вычисляем точность: чем ближе progress к 1, тем лучше
        // Идеальное попадание - когда внешний круг почти совпал с внутренним
        const accuracy = Math.abs(1 - circle.progress)
        let points = 0
        let hitType = 'OK'
        
        // Можно кликать в любой момент, но очки зависят от точности
        if (accuracy < 0.1) {
          points = 300
          hitType = 'PERFECT'
        } else if (accuracy < 0.25) {
          points = 100
          hitType = 'GOOD'
        } else if (accuracy < 0.5) {
          points = 50
          hitType = 'OK'
        } else {
          // Слишком рано (progress близок к 0) или слишком поздно (progress > 1.5) - минимальные очки
          points = 10
          hitType = 'OK'
        }
        
        setScore(prev => prev + points)
        setCombo(prev => prev + 1)
        
        // Помечаем как кликнутый, но оставляем на экране для анимации
        return { ...circle, clicked: true, hitType }
      }
      return circle
    }))
  }

  // Обновляем ref при изменении кругов
  useEffect(() => {
    circlesRef.current = circles
  }, [circles])

  // Анимация кругов
  useEffect(() => {
    if (!isVisible || !isPlaying) return

    let lastTime = performance.now()
    
    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTime
      lastTime = currentTime
      
      // Нормализуем скорость анимации (примерно 60 FPS)
      const frameTime = Math.min(deltaTime / 16.67, 2) // Ограничиваем максимальное время между кадрами
      
      setCircles(prev => prev.map(circle => {
        // Если круг кликнут, показываем анимацию попадания
        if (circle.clicked) {
          const newProgress = circle.progress + 0.05 * frameTime
          // Удаляем только после завершения анимации (progress > 1)
          if (newProgress > 1.1) {
            return null
          }
          return { ...circle, progress: newProgress }
        }
        
        // Если круг пропущен, удаляем сразу
        if (circle.missed) {
          return null
        }
        
        // Плавная анимация с нормализованной скоростью
        const newProgress = circle.progress + 0.01 * frameTime
        
        // Круги исчезают ТОЛЬКО когда точно достигнут центр (progress >= 1)
        // Не удаляем раньше времени
        if (newProgress >= 1.0) {
          // Круг пропущен - сбрасываем комбо
          setCombo(0)
          return null // Удаляем только когда точно достигнут центр (progress >= 1.0)
        }
        
        // Ограничиваем progress максимумом 1.0, чтобы не превышать
        return { ...circle, progress: Math.min(newProgress, 1.0) }
      }).filter(circle => circle !== null)) // Фильтруем удаленные круги

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isVisible, isPlaying])

  // Синхронизация с музыкой (120 BPM = 2 удара в секунду)
  useEffect(() => {
    if (!isVisible || !isPlaying || !audioRef.current) {
      if (beatIntervalRef.current) {
        clearInterval(beatIntervalRef.current)
        beatIntervalRef.current = null
      }
      return
    }

    // Упрощенная версия без Web Audio API, чтобы не ломать музыку
    const BPM = 120
    const beatInterval = (60 / BPM) * 1000 // интервал между битами в мс

    // Создаем первый круг сразу
    createCircle()

    beatIntervalRef.current = setInterval(() => {
      if (audioRef.current && !audioRef.current.paused && isPlaying) {
        createCircle()
      }
    }, beatInterval)

    return () => {
      if (beatIntervalRef.current) {
        clearInterval(beatIntervalRef.current)
        beatIntervalRef.current = null
      }
    }
  }, [isVisible, isPlaying, createCircle])

  // Управление паузой/возобновлением
  const togglePlay = async (e) => {
    e?.preventDefault()
    e?.stopPropagation()
    
    if (audioRef.current) {
      if (isPlaying) {
        // Пауза
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        // Возобновление
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          console.error('Error resuming audio:', error)
        }
      }
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Drag and drop
  const containerRef = useRef(null)
  
  const handleMouseDown = (e) => {
    if (e.target.closest('.chill-leisure-header')) {
      setIsDragging(true)
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }
  }

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x
      const newY = e.clientY - dragOffset.y
      
      // Ограничиваем перемещение в пределах экрана
      const maxX = window.innerWidth - 800
      const maxY = window.innerHeight - 700
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      })
    }
  }, [isDragging, dragOffset])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  // Окно закрывается только через настройки, функция handleClose не используется

  // Автоматический запуск при открытии окна
  useEffect(() => {
    if (isVisible && audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.muted = isMuted
      
      // Автоматически запускаем музыку и игру
      const startGame = async () => {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
          console.log('Game started automatically')
        } catch (error) {
          console.error('Auto-play blocked:', error)
          // Если автовоспроизведение заблокировано, просто показываем кнопку
        }
      }
      
      // Небольшая задержка для загрузки аудио
      const timer = setTimeout(startGame, 500)
      
      return () => clearTimeout(timer)
    }
  }, [isVisible, volume, isMuted])

  // Очистка при скрытии
  useEffect(() => {
    if (!isVisible) {
      if (audioRef.current) {
        audioRef.current.pause()
        setIsPlaying(false)
      }
      setCircles([])
      setScore(0)
      setCombo(0)
      if (beatIntervalRef.current) {
        clearInterval(beatIntervalRef.current)
        beatIntervalRef.current = null
      }
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <motion.div
      ref={containerRef}
      className="chill-leisure-container"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <div
        className="chill-leisure-header"
        onMouseDown={handleMouseDown}
      >
        <div className="chill-leisure-header-left">
          <GripVertical size={16} />
          <Music size={20} />
          <span>Chill Leisure</span>
        </div>
      </div>

      <div className="chill-leisure-content">
        <div className="chill-leisure-game-area" ref={gameAreaRef}>
          {circles.length === 0 && !isPlaying && (
            <div className="chill-leisure-welcome">
              <Music size={48} />
              <h3>Игра запустится автоматически</h3>
              <p>Кликай по кругам в ритм музыки</p>
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.7 }}>
                Если музыка не играет, нажми кнопку Play
              </p>
            </div>
          )}
          {circles.map((circle, index) => {
            const currentSize = circle.size + (circle.outerSize - circle.size) * (1 - circle.progress)
            let opacity = 1
            if (circle.clicked) {
              opacity = Math.max(0, 1 - (circle.progress - 1) * 5) // Плавно исчезает после клика
            } else if (circle.missed) {
              opacity = 0.2
            }
            
            // z-index: более новые круги выше, но все кликабельны
            const zIndex = circle.zIndex || (1000 + index)
            
            return (
              <div key={circle.id}>
                <div
                  className={`chill-leisure-circle ${circle.clicked ? 'clicked' : ''} ${circle.missed ? 'missed' : ''} ${circle.hitType ? `hit-${circle.hitType.toLowerCase()}` : ''}`}
                  style={{
                    left: `${circle.x}px`,
                    top: `${circle.y}px`,
                    width: `${currentSize}px`,
                    height: `${currentSize}px`,
                    opacity,
                    transform: 'translate(-50%, -50%)',
                    willChange: 'width, height, opacity',
                    zIndex: circle.clicked ? zIndex - 1000 : zIndex, // Кликнутые круги уходят вниз
                    pointerEvents: circle.clicked ? 'none' : 'auto' // Кликнутые круги не блокируют клики
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCircleClick(e, circle.id)
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <div className="chill-leisure-circle-inner" />
                </div>
                {circle.clicked && circle.hitType && (
                  <div
                    className={`chill-leisure-hit-text hit-${circle.hitType.toLowerCase()}`}
                    style={{
                      left: `${circle.x}px`,
                      top: `${circle.y - 30}px`,
                      zIndex: 2000 + index
                    }}
                  >
                    {circle.hitType}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="chill-leisure-stats">
          <div className="chill-leisure-stat">
            <span className="stat-label">Score:</span>
            <span className="stat-value">{score.toLocaleString()}</span>
          </div>
          <div className="chill-leisure-stat">
            <span className="stat-label">Combo:</span>
            <span className="stat-value">{combo}x</span>
          </div>
        </div>

        <div className="chill-leisure-player">
          <button
            className="chill-leisure-play-btn"
            onClick={togglePlay}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            style={{ pointerEvents: 'auto', zIndex: 1000, position: 'relative' }}
            type="button"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          
          <div className="chill-leisure-volume-control">
            <button
              className="chill-leisure-mute-btn"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="chill-leisure-volume-slider"
            />
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        loop
        preload="auto"
        muted={isMuted}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            audioRef.current.volume = volume
          }
        }}
        onError={(e) => {
          console.error('Audio error:', e)
        }}
        onCanPlay={() => {
          if (audioRef.current) {
            audioRef.current.volume = volume
          }
        }}
      >
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" type="audio/mpeg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </motion.div>
  )
}

export default ChillLeisureGame

