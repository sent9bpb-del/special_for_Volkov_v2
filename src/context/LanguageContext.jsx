import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

const translations = {
  ru: {
    // Navigation
    home: 'Главная',
    learning: 'Обучение',
    labs: 'Лабораторные',
    tests: 'Тесты',
    progress: 'Прогресс',
    profile: 'Профиль',
    settings: 'Настройки',
    help: 'Помощь',
    
    // Home
    welcome: 'Добро пожаловать в',
    startLearning: 'Начать обучение',
    lessonsCompleted: 'Уроков пройдено',
    labsCompleted: 'Лабораторных выполнено',
    testsCompleted: 'Тестов пройдено',
    quickAccess: 'Быстрый доступ',
    studyMaterials: 'Изучайте материалы и отслеживайте прогресс',
    practicalTasks: 'Практические задания и эксперименты',
    checkKnowledge: 'Проверьте свои знания',
    heroSubtitle: 'Современная платформа для эффективного обучения с интерактивными материалами, лабораторными работами и тестами',
    
    // Learning
    learningTitle: 'Обучение',
    learningSubtitle: 'Изучайте материалы и отслеживайте свой прогресс',
    readingProgress: 'Прогресс чтения',
    
    // Labs
    labsTitle: 'Лабораторные работы',
    labsSubtitle: 'Практические задания для закрепления знаний',
    executionProgress: 'Прогресс выполнения',
    startWork: 'Начать работу',
    easy: 'Легкая',
    medium: 'Средняя',
    hard: 'Сложная',
    
    // Tests
    testsTitle: 'Тесты',
    testsSubtitle: 'Проверьте свои знания с помощью интерактивных тестов',
    questions: 'Вопросов',
    time: 'Время',
    difficulty: 'Сложность',
    easyTest: 'Легкий',
    mediumTest: 'Средний',
    hardTest: 'Сложный',
    startTest: 'Начать тест',
    retake: 'Пройти снова',
    result: 'Результат',
    
    // Progress
    progressTitle: 'Прогресс обучения',
    progressSubtitle: 'Отслеживайте свой прогресс и достижения',
    overallProgress: 'Общий прогресс',
    lessons: 'Уроки',
    recentActivity: 'Последняя активность',
    completed: 'завершено',
    
    // Profile
    profileTitle: 'Профиль',
    level: 'Уровень',
    achievements: 'Достижения',
    firstLesson: 'Первый урок',
    allLessons: 'Все уроки',
    firstLab: 'Первая лабораторная',
    firstTest: 'Первый тест',
    
    // Settings
    settingsTitle: 'Настройки',
    appearance: 'Внешний вид',
    theme: 'Тема',
    themeDescription: 'Выберите цветовую схему',
    cyan: 'Cyan',
    violet: 'Violet',
    amber: 'Amber',
    emerald: 'Emerald',
    notifications: 'Уведомления',
    progressNotifications: 'Уведомления о прогрессе',
    notificationsDescription: 'Получайте уведомления о достижениях',
    language: 'Язык',
    languageTitle: 'Язык интерфейса',
    languageDescription: 'Выберите предпочитаемый язык',
    russian: 'Русский',
    english: 'English',
    
    // Help
    helpTitle: 'Помощь',
    helpSubtitle: 'Найдите ответы на часто задаваемые вопросы',
    documentation: 'Документация',
    videoTutorials: 'Видеоуроки',
    support: 'Поддержка',
    detailedGuides: 'Подробные руководства',
    learningVideos: 'Обучающие видео',
    contactUs: 'Свяжитесь с нами',
    faq: 'Часто задаваемые вопросы',
    howToStart: 'Как начать обучение?',
    howToStartAnswer: 'Перейдите во вкладку "Обучение" и выберите интересующий вас урок. Вы можете отслеживать прогресс чтения с помощью ползунка.',
    howToLab: 'Как выполнить лабораторную работу?',
    howToLabAnswer: 'Во вкладке "Лабораторные" выберите нужную работу и нажмите "Начать работу". Следуйте инструкциям и отмечайте прогресс выполнения.',
    howToTest: 'Как пройти тест?',
    howToTestAnswer: 'Выберите тест во вкладке "Тесты" и нажмите "Начать тест". После завершения вы увидите свой результат.',
    whereProgress: 'Где посмотреть свой прогресс?',
    whereProgressAnswer: 'Во вкладке "Прогресс" вы можете увидеть общий прогресс обучения, статистику по урокам, лабораторным и тестам.',
    
    // Common
    loading: 'Контент загружается...',
    logout: 'Выйти',
    cancel: 'Отмена',
    submit: 'Отправить',
    back: 'Назад',
    next: 'Далее',
    finish: 'Завершить',
    question: 'Вопрос',
    of: 'из',
    correctAnswers: 'Правильных ответов',
    testCompleted: 'Тест завершён!',
    wellDone: 'Молодец!',
    dontWorry: 'Не расстраивайся!',
    retakeTest: 'Пройти заново',
    points: 'баллов',
    noActivity: 'Нет активности. Начните обучение, чтобы увидеть прогресс!',
    
    // Auth
    login: 'Вход',
    register: 'Регистрация',
    loginSubtitle: 'Войдите в свой аккаунт',
    registerSubtitle: 'Создайте новый аккаунт',
    username: 'Имя пользователя',
    usernamePlaceholder: 'Введите имя пользователя',
    email: 'Email',
    emailPlaceholder: 'Введите email',
    password: 'Пароль',
    passwordPlaceholder: 'Введите пароль (минимум 6 символов)',
    confirmPassword: 'Подтвердите пароль',
    confirmPasswordPlaceholder: 'Повторите пароль',
    loginButton: 'Войти',
    registerButton: 'Зарегистрироваться',
    hasAccount: 'Уже есть аккаунт?',
    noAccount: 'Нет аккаунта?',
    loginLink: 'Войти',
    registerLink: 'Зарегистрироваться',
    passwordMismatch: 'Пароли не совпадают',
    passwordTooShort: 'Пароль должен содержать минимум 6 символов',
    pleaseLogin: 'Пожалуйста, войдите в систему для просмотра профиля',
    
    // Settings
    chillLeisure: 'Чиловый отдых',
    chillLeisureDescription: 'Включить режим чилового отдыха',
    
    // Tests
    testDifficultyEasy: 'Легкий',
    testDifficultyMedium: 'Средний',
    testDifficultyHard: 'Сложный',
    
    // Labs
    labDifficultyEasy: 'Легкая',
    labDifficultyMedium: 'Средняя',
    labDifficultyHard: 'Сложная',
    labObjective: 'Цель работы',
    labTask: 'Задание',
    labExamples: 'Примеры и референсы',
    labResults: 'Требуемые результаты',
    labUpload: 'Загрузка выполненной работы',
    labUploadFiles: 'Загрузить файлы',
    labUploadFormats: 'Поддерживаемые форматы: .step, .iges, .pdf, .jpg, .png, .doc, .docx',
    labDescription: 'Описание выполненной работы',
    labDescriptionPlaceholder: 'Опишите выполненную работу, использованные инструменты, возникшие трудности и их решения...',
    labSubmit: 'Отправить на проверку',
    labSubmitted: 'Работа отправлена на проверку!',
    labSubmittedNotification: 'Уведомление отправлено преподавателю.',
    labSubmittedNoNotification: 'Работа отправлена на проверку! (Уведомление не отправлено - проверьте настройки EmailJS)',
    labSubmittedError: 'Работа отправлена на проверку! (Ошибка отправки уведомления)',
    
    // Profile
    lesson100: 'Урок на 100%',
    allTests: 'Все тесты',
    
    // Help
    phone: 'Телефон',
    illustration: 'Иллюстрация',
  },
  en: {
    // Navigation
    home: 'Home',
    learning: 'Learning',
    labs: 'Labs',
    tests: 'Tests',
    progress: 'Progress',
    profile: 'Profile',
    settings: 'Settings',
    help: 'Help',
    
    // Home
    welcome: 'Welcome to',
    startLearning: 'Start Learning',
    lessonsCompleted: 'Lessons Completed',
    labsCompleted: 'Labs Completed',
    testsCompleted: 'Tests Completed',
    quickAccess: 'Quick Access',
    studyMaterials: 'Study materials and track progress',
    practicalTasks: 'Practical assignments and experiments',
    checkKnowledge: 'Test your knowledge',
    heroSubtitle: 'Modern platform for effective learning with interactive materials, laboratory works and tests',
    
    // Learning
    learningTitle: 'Learning',
    learningSubtitle: 'Study materials and track your progress',
    readingProgress: 'Reading Progress',
    
    // Labs
    labsTitle: 'Laboratory Works',
    labsSubtitle: 'Practical assignments to reinforce knowledge',
    executionProgress: 'Execution Progress',
    startWork: 'Start Work',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    
    // Tests
    testsTitle: 'Tests',
    testsSubtitle: 'Test your knowledge with interactive quizzes',
    questions: 'Questions',
    time: 'Time',
    difficulty: 'Difficulty',
    easyTest: 'Easy',
    mediumTest: 'Medium',
    hardTest: 'Hard',
    startTest: 'Start Test',
    retake: 'Retake',
    result: 'Result',
    
    // Progress
    progressTitle: 'Learning Progress',
    progressSubtitle: 'Track your progress and achievements',
    overallProgress: 'Overall Progress',
    lessons: 'Lessons',
    recentActivity: 'Recent Activity',
    completed: 'completed',
    
    // Profile
    profileTitle: 'Profile',
    level: 'Level',
    achievements: 'Achievements',
    firstLesson: 'First Lesson',
    allLessons: 'All Lessons',
    firstLab: 'First Lab',
    firstTest: 'First Test',
    
    // Settings
    settingsTitle: 'Settings',
    appearance: 'Appearance',
    theme: 'Theme',
    themeDescription: 'Choose a color scheme',
    cyan: 'Cyan',
    violet: 'Violet',
    amber: 'Amber',
    emerald: 'Emerald',
    notifications: 'Notifications',
    progressNotifications: 'Progress Notifications',
    notificationsDescription: 'Receive notifications about achievements',
    language: 'Language',
    languageTitle: 'Interface Language',
    languageDescription: 'Choose your preferred language',
    russian: 'Русский',
    english: 'English',
    
    // Help
    helpTitle: 'Help',
    helpSubtitle: 'Find answers to frequently asked questions',
    documentation: 'Documentation',
    videoTutorials: 'Video Tutorials',
    support: 'Support',
    detailedGuides: 'Detailed guides',
    learningVideos: 'Learning videos',
    contactUs: 'Contact us',
    faq: 'Frequently Asked Questions',
    howToStart: 'How to start learning?',
    howToStartAnswer: 'Go to the "Learning" tab and select the lesson you are interested in. You can track reading progress using the slider.',
    howToLab: 'How to complete a lab?',
    howToLabAnswer: 'In the "Labs" tab, select the desired work and click "Start Work". Follow the instructions and mark the execution progress.',
    howToTest: 'How to take a test?',
    howToTestAnswer: 'Select a test in the "Tests" tab and click "Start Test". After completion, you will see your result.',
    whereProgress: 'Where to view my progress?',
    whereProgressAnswer: 'In the "Progress" tab, you can see the overall learning progress, statistics on lessons, labs and tests.',
    
    // Common
    loading: 'Content is loading...',
    logout: 'Logout',
    cancel: 'Cancel',
    submit: 'Submit',
    back: 'Back',
    next: 'Next',
    finish: 'Finish',
    question: 'Question',
    of: 'of',
    correctAnswers: 'Correct answers',
    testCompleted: 'Test completed!',
    wellDone: 'Well done!',
    dontWorry: "Don't worry!",
    retakeTest: 'Retake',
    points: 'points',
    noActivity: 'No activity. Start learning to see progress!',
    
    // Auth
    login: 'Login',
    register: 'Register',
    loginSubtitle: 'Sign in to your account',
    registerSubtitle: 'Create a new account',
    username: 'Username',
    usernamePlaceholder: 'Enter username',
    email: 'Email',
    emailPlaceholder: 'Enter email',
    password: 'Password',
    passwordPlaceholder: 'Enter password (minimum 6 characters)',
    confirmPassword: 'Confirm password',
    confirmPasswordPlaceholder: 'Repeat password',
    loginButton: 'Sign in',
    registerButton: 'Register',
    hasAccount: 'Already have an account?',
    noAccount: "Don't have an account?",
    loginLink: 'Sign in',
    registerLink: 'Register',
    passwordMismatch: 'Passwords do not match',
    passwordTooShort: 'Password must contain at least 6 characters',
    pleaseLogin: 'Please sign in to view your profile',
    
    // Settings
    chillLeisure: 'Chill Leisure',
    chillLeisureDescription: 'Enable chill leisure mode',
    
    // Tests
    testDifficultyEasy: 'Easy',
    testDifficultyMedium: 'Medium',
    testDifficultyHard: 'Hard',
    
    // Labs
    labDifficultyEasy: 'Easy',
    labDifficultyMedium: 'Medium',
    labDifficultyHard: 'Hard',
    labObjective: 'Objective',
    labTask: 'Task',
    labExamples: 'Examples and references',
    labResults: 'Required results',
    labUpload: 'Upload completed work',
    labUploadFiles: 'Upload files',
    labUploadFormats: 'Supported formats: .step, .iges, .pdf, .jpg, .png, .doc, .docx',
    labDescription: 'Description of completed work',
    labDescriptionPlaceholder: 'Describe the completed work, tools used, difficulties encountered and their solutions...',
    labSubmit: 'Submit for review',
    labSubmitted: 'Work submitted for review!',
    labSubmittedNotification: 'Notification sent to teacher.',
    labSubmittedNoNotification: 'Work submitted for review! (Notification not sent - check EmailJS settings)',
    labSubmittedError: 'Work submitted for review! (Error sending notification)',
    
    // Profile
    lesson100: 'Lesson 100%',
    allTests: 'All tests',
    
    // Help
    phone: 'Phone',
    illustration: 'Illustration',
  }
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language')
    return savedLanguage || 'ru'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = (key) => {
    return translations[language]?.[key] || key
  }

  const changeLanguage = (lang) => {
    setLanguage(lang)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

