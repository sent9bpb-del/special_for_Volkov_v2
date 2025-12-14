import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FlaskConical, CheckCircle, Circle, Play, X, Upload, FileText, Image as ImageIcon } from 'lucide-react'
import { useProgress } from '../../context/ProgressContext'
import { useLanguage } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'
import { labsData } from '../../data/labsData'
import { sendLabSubmissionEmail, getRecipientEmail } from '../../utils/emailService'
import './Labs.css'

const Labs = () => {
  const { progress, updateLabProgress } = useProgress()
  const { t } = useLanguage()
  const { currentUser } = useAuth()
  const [labProgress, setLabProgress] = useState({})
  const [activeLab, setActiveLab] = useState(null)
  const [submittedFiles, setSubmittedFiles] = useState({})
  const [workDescription, setWorkDescription] = useState({})

  const handleProgressChange = (labId, value) => {
    setLabProgress(prev => ({ ...prev, [labId]: value }))
    updateLabProgress(labId, value)
  }

  const handleStartLab = (labId) => {
    setActiveLab(labId)
  }

  const handleCloseLab = () => {
    setActiveLab(null)
  }

  const handleFileUpload = (labId, file) => {
    setSubmittedFiles(prev => ({
      ...prev,
      [labId]: [...(prev[labId] || []), file]
    }))
  }

  const handleRemoveFile = (labId, index) => {
    setSubmittedFiles(prev => ({
      ...prev,
      [labId]: prev[labId].filter((_, i) => i !== index)
    }))
  }

  const handleSubmitLab = async (labId) => {
    const lab = labsData.find(l => l.id === labId)
    const files = submittedFiles[labId] || []
    const description = workDescription[labId] || ''

    // Отправляем уведомление на email
    try {
      const recipientEmail = getRecipientEmail()
      const result = await sendLabSubmissionEmail({
        labTitle: lab?.title || `Лабораторная работа ${labId}`,
        studentName: currentUser?.username || 'Гость',
        studentEmail: currentUser?.email || 'Не указан',
        files: files,
        description: description
      }, recipientEmail)

      if (result.success) {
        alert(t('labSubmitted') + ' ' + t('labSubmittedNotification'))
      } else {
        alert(t('labSubmittedNoNotification'))
      }
    } catch (error) {
      console.error('Ошибка отправки уведомления:', error)
      alert(t('labSubmittedError'))
    }

    updateLabProgress(labId, 100)
    handleCloseLab()
  }

  const getDifficultyColor = (difficulty) => {
    const difficultyLower = difficulty.toLowerCase()
    if (difficultyLower.includes('easy') || difficultyLower.includes('легк')) return '#10b981'
    if (difficultyLower.includes('medium') || difficultyLower.includes('средн')) return '#f59e0b'
    if (difficultyLower.includes('hard') || difficultyLower.includes('сложн')) return '#ef4444'
    return '#6366f1'
  }
  
  const getDifficultyTranslation = (difficulty, t) => {
    const difficultyLower = difficulty.toLowerCase()
    if (difficultyLower.includes('easy') || difficultyLower.includes('легк')) return t('labDifficultyEasy')
    if (difficultyLower.includes('medium') || difficultyLower.includes('средн')) return t('labDifficultyMedium')
    if (difficultyLower.includes('hard') || difficultyLower.includes('сложн')) return t('labDifficultyHard')
    return difficulty
  }

  return (
    <div className="labs">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="labs-header"
      >
        <h1 className="page-title">
          <FlaskConical size={32} />
          {t('labsTitle')}
        </h1>
        <p className="page-subtitle">{t('labsSubtitle')}</p>
      </motion.div>

      <div className="labs-grid">
        {labsData.map((lab, index) => {
          const labProgressValue = progress.labs[lab.id] || labProgress[lab.id] || 0
          const isCompleted = labProgressValue === 100

          return (
            <motion.div
              key={lab.id}
              className="lab-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="lab-header">
                <div className="lab-icon">
                  <FlaskConical size={24} />
                </div>
                <div className="lab-status">
                  {isCompleted ? (
                    <CheckCircle size={20} className="completed" />
                  ) : (
                    <Circle size={20} />
                  )}
                </div>
              </div>

              <h3 className="lab-title">{lab.title}</h3>
              <p className="lab-description">{lab.description}</p>

              <div className="lab-meta">
                <span
                  className="lab-difficulty"
                  style={{ color: getDifficultyColor(lab.difficulty) }}
                >
                  {getDifficultyTranslation(lab.difficulty, t)}
                </span>
                <span className="lab-time">{lab.estimatedTime}</span>
              </div>

              <div className="lab-progress-section">
                <div className="lab-progress-header">
                  <span>{t('executionProgress')}</span>
                  <span className="progress-percentage">{labProgressValue}%</span>
                </div>
                <div className="progress-bar-container">
                  <motion.div
                    className="progress-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${labProgressValue}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={labProgressValue}
                  onChange={(e) => handleProgressChange(lab.id, parseInt(e.target.value))}
                  className="progress-slider"
                />
              </div>

              <motion.button
                className="lab-start-btn"
                onClick={() => handleStartLab(lab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={18} />
                {t('startWork')}
              </motion.button>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {activeLab && (
          <LabModal
            lab={labsData.find(l => l.id === activeLab)}
            onClose={handleCloseLab}
            onFileUpload={handleFileUpload}
            onRemoveFile={handleRemoveFile}
            onSubmit={handleSubmitLab}
            submittedFiles={submittedFiles[activeLab] || []}
            workDescription={workDescription[activeLab] || ''}
            onDescriptionChange={(text) => setWorkDescription(prev => ({ ...prev, [activeLab]: text }))}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const LabModal = ({ lab, onClose, onFileUpload, onRemoveFile, onSubmit, submittedFiles, workDescription, onDescriptionChange }) => {
  const { t } = useLanguage()
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    files.forEach(file => onFileUpload(lab.id, file))
    e.target.value = ''
  }

  const getDifficultyColor = (difficulty) => {
    const difficultyLower = difficulty.toLowerCase()
    if (difficultyLower.includes('easy') || difficultyLower.includes('легк')) return '#10b981'
    if (difficultyLower.includes('medium') || difficultyLower.includes('средн')) return '#f59e0b'
    if (difficultyLower.includes('hard') || difficultyLower.includes('сложн')) return '#ef4444'
    return '#6366f1'
  }
  
  const getDifficultyTranslation = (difficulty, t) => {
    const difficultyLower = difficulty.toLowerCase()
    if (difficultyLower.includes('easy') || difficultyLower.includes('легк')) return t('labDifficultyEasy')
    if (difficultyLower.includes('medium') || difficultyLower.includes('средн')) return t('labDifficultyMedium')
    if (difficultyLower.includes('hard') || difficultyLower.includes('сложн')) return t('labDifficultyHard')
    return difficulty
  }

  return (
    <motion.div
      className="lab-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="lab-modal-content"
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lab-modal-header">
          <div>
            <h2 className="lab-modal-title">{lab.title}</h2>
            <div className="lab-modal-meta">
              <span className="lab-modal-difficulty" style={{ color: getDifficultyColor(lab.difficulty) }}>
                {getDifficultyTranslation(lab.difficulty, t)}
              </span>
              <span className="lab-modal-time">{lab.estimatedTime}</span>
            </div>
          </div>
          <motion.button
            className="lab-modal-close"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={24} />
          </motion.button>
        </div>

        <div className="lab-modal-body">
          <div className="lab-section">
            <h3 className="lab-section-title">
              <FileText size={20} />
              {t('labObjective')}
            </h3>
            <p className="lab-section-content">{lab.objective}</p>
          </div>

          <div className="lab-section">
            <h3 className="lab-section-title">
              <FileText size={20} />
              {t('labTask')}
            </h3>
            <div className="lab-task-content">
              {lab.task.split('\n').map((line, idx) => (
                <p key={idx} className="lab-task-line">{line}</p>
              ))}
            </div>
          </div>

          {lab.referenceImages && lab.referenceImages.length > 0 && (
            <div className="lab-section">
            <h3 className="lab-section-title">
              <ImageIcon size={20} />
              {t('labExamples')}
            </h3>
              <div className="lab-reference-gallery">
                {lab.referenceImages.map((img, idx) => (
                  <motion.div
                    key={idx}
                    className="lab-reference-image-wrapper"
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <img
                      src={img}
                      alt={`${t('labExamples')} ${idx + 1}`}
                      className="lab-reference-image"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="lab-section">
            <h3 className="lab-section-title">
              <FileText size={20} />
              {t('labResults')}
            </h3>
            <ul className="lab-deliverables-list">
              {lab.deliverables.map((item, idx) => (
                <li key={idx} className="lab-deliverable-item">
                  <CheckCircle size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lab-section">
            <h3 className="lab-section-title">
              <Upload size={20} />
              {t('labUpload')}
            </h3>
            <div className="lab-upload-area">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                className="lab-file-input"
                accept=".step,.iges,.stp,.pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
              <motion.button
                className="lab-upload-button"
                onClick={() => fileInputRef.current?.click()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Upload size={18} />
                {t('labUploadFiles')}
              </motion.button>
              <p className="lab-upload-hint">
                {t('labUploadFormats')}
              </p>
            </div>

            {submittedFiles.length > 0 && (
              <div className="lab-files-list">
                {submittedFiles.map((file, idx) => (
                  <motion.div
                    key={idx}
                    className="lab-file-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <FileText size={16} />
                    <span className="lab-file-name">{file.name}</span>
                    <span className="lab-file-size">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                    <motion.button
                      className="lab-file-remove"
                      onClick={() => onRemoveFile(lab.id, idx)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={16} />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="lab-section">
            <h3 className="lab-section-title">
              <FileText size={20} />
              {t('labDescription')}
            </h3>
            <textarea
              className="lab-description-textarea"
              placeholder={t('labDescriptionPlaceholder')}
              value={workDescription}
              onChange={(e) => onDescriptionChange(e.target.value)}
              rows={6}
            />
          </div>
        </div>

        <div className="lab-modal-footer">
          <motion.button
            className="lab-modal-cancel"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('cancel')}
          </motion.button>
          <motion.button
            className="lab-modal-submit"
            onClick={() => onSubmit(lab.id)}
            disabled={submittedFiles.length === 0 && !workDescription.trim()}
            whileHover={{ scale: submittedFiles.length > 0 || workDescription.trim() ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
          >
            <CheckCircle size={18} />
            {t('labSubmit')}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Labs

