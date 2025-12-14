// Сервис для отправки email уведомлений через EmailJS
// Для настройки: https://www.emailjs.com/
// Получите Public Key, Service ID и Template ID после регистрации

import emailjs from '@emailjs/browser'

// Конфигурация EmailJS
const EMAILJS_CONFIG = {
  PUBLIC_KEY: '39mEHRbJW6toOrUgW',
  SERVICE_ID: 'service_it7bqwr',
  TEMPLATE_ID_LAB: 'template_8v184fr', // Template для лабораторных работ
  TEMPLATE_ID_CHAT: 'template_n4tooxx' // Template для сообщений чата
}

// Инициализация EmailJS (только если настроен)
let emailjsInitialized = false
if (EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
  try {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
    emailjsInitialized = true
  } catch (error) {
    console.warn('Ошибка инициализации EmailJS:', error)
  }
}

/**
 * Отправка уведомления о загрузке лабораторной работы
 * @param {Object} data - Данные лабораторной работы
 * @param {string} data.labTitle - Название лабораторной работы
 * @param {string} data.studentName - Имя студента
 * @param {string} data.studentEmail - Email студента
 * @param {Array} data.files - Массив файлов
 * @param {string} data.description - Описание работы
 * @param {string} recipientEmail - Email получателя (преподавателя)
 */
export const sendLabSubmissionEmail = async (data, recipientEmail) => {
  // Если EmailJS не настроен, просто логируем
  if (!emailjsInitialized || EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
    console.warn('EmailJS не настроен. Данные лабораторной работы:', data)
    console.warn('Получатель:', recipientEmail)
    console.warn('Для настройки EmailJS см. файл EMAILJS_SETUP.md')
    return { success: false, message: 'EmailJS не настроен' }
  }

  try {
    // Преобразуем файлы в список для email
    const fileList = data.files.map(file => 
      `- ${file.name} (${(file.size / 1024).toFixed(1)} KB, ${file.type || 'неизвестный тип'})`
    ).join('\n')

    const templateParams = {
      to_email: recipientEmail,
      lab_title: data.labTitle,
      student_name: data.studentName || 'Студент',
      student_email: data.studentEmail || 'Не указан',
      files_count: data.files.length,
      files_list: fileList,
      description: data.description || 'Описание не предоставлено',
      submission_date: new Date().toLocaleString('ru-RU')
    }

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_LAB,
      templateParams
    )

    return { success: true, message: 'Email отправлен успешно', response }
  } catch (error) {
    console.error('Ошибка отправки email:', error)
    return { success: false, message: error.text || 'Ошибка отправки email', error }
  }
}

/**
 * Отправка уведомления о сообщении в чат-бот
 * @param {Object} data - Данные сообщения
 * @param {string} data.message - Текст сообщения
 * @param {string} data.studentName - Имя студента
 * @param {string} data.studentEmail - Email студента
 * @param {string} recipientEmail - Email получателя (преподавателя)
 */
export const sendChatMessageEmail = async (data, recipientEmail) => {
  // Если EmailJS не настроен, просто логируем
  if (!emailjsInitialized || EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
    console.warn('EmailJS не настроен. Сообщение чата:', data)
    console.warn('Получатель:', recipientEmail)
    console.warn('Для настройки EmailJS см. файл EMAILJS_SETUP.md')
    return { success: false, message: 'EmailJS не настроен' }
  }

  try {
    const templateParams = {
      to_email: recipientEmail,
      student_name: data.studentName || 'Студент',
      student_email: data.studentEmail || 'Не указан',
      message: data.message,
      message_date: new Date().toLocaleString('ru-RU')
    }

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_CHAT,
      templateParams
    )

    return { success: true, message: 'Email отправлен успешно', response }
  } catch (error) {
    console.error('Ошибка отправки email:', error)
    return { success: false, message: error.text || 'Ошибка отправки email', error }
  }
}

/**
 * Получение email получателя из настроек
 */
export const getRecipientEmail = () => {
  // Можно получить из localStorage или настроек
  const savedEmail = localStorage.getItem('notificationEmail')
  return savedEmail || 'dead.inside212@mail.ru' // Email по умолчанию
}

/**
 * Сохранение email получателя в настройках
 */
export const setRecipientEmail = (email) => {
  localStorage.setItem('notificationEmail', email)
}

