import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { sendChatMessageEmail, getRecipientEmail } from '../../utils/emailService'
import './ChatBot.css'

const ChatBot = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth()
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Привет! Я чат-бот поддержки. Чем могу помочь?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const botResponses = [
    'Спасибо за ваш вопрос! Я передам его нашей команде поддержки.',
    'Хороший вопрос! Давайте разберёмся вместе.',
    'Понял вас. Могу помочь с этим.',
    'Отличный вопрос! Сейчас помогу.',
    'Спасибо за обращение. Обрабатываю ваш запрос.',
  ]

  const handleSend = async (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const messageText = inputValue.trim()
    setInputValue('')

    // Отправляем уведомление на email
    try {
      const recipientEmail = getRecipientEmail()
      await sendChatMessageEmail({
        message: messageText,
        studentName: currentUser?.username || 'Гость',
        studentEmail: currentUser?.email || 'Не указан'
      }, recipientEmail)
    } catch (error) {
      console.error('Ошибка отправки уведомления:', error)
    }

    // Имитация ответа бота
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="chat-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="chat-bot"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="chat-header">
              <div className="chat-header-content">
                <Bot size={24} className="chat-bot-icon" />
                <div>
                  <h3 className="chat-title">Чат-бот поддержки</h3>
                  <p className="chat-subtitle">Онлайн</p>
                </div>
              </div>
              <motion.button
                className="chat-close-btn"
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>
            </div>

            <div className="chat-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`chat-message ${message.sender}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="message-avatar">
                    {message.sender === 'bot' ? (
                      <Bot size={20} />
                    ) : (
                      <User size={20} />
                    )}
                  </div>
                  <div className="message-content">
                    <p className="message-text">{message.text}</p>
                    <span className="message-time">
                      {message.timestamp.toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-form" onSubmit={handleSend}>
              <input
                ref={inputRef}
                type="text"
                className="chat-input"
                placeholder="Напишите сообщение..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <motion.button
                type="submit"
                className="chat-send-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={!inputValue.trim()}
              >
                <Send size={20} />
              </motion.button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ChatBot

