import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import AnimatedBackground from '../AnimatedBackground/AnimatedBackground'
import ChillLeisureGame from '../ChillLeisure/ChillLeisureGame'
import './Layout.css'

const Layout = () => {
  const location = useLocation()
  const mainRef = useRef(null)

  useEffect(() => {
    // Smoothly reset scroll for new route inside our scroll container
    const el = mainRef.current
    if (!el) return
    el.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="layout">
      <AnimatedBackground />
      <Header />
      <div className="layout-content">
        <Sidebar />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            ref={mainRef}
            className="main-content"
            style={{ pointerEvents: 'auto' }}
            initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(8px)' }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              filter: 'blur(0px)',
              transition: { 
                duration: 0.6, 
                ease: [0.4, 0, 0.2, 1],
                opacity: { duration: 0.5 },
                filter: { duration: 0.5 },
                scale: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
              }
            }}
            exit={{ 
              opacity: 0, 
              y: -15, 
              scale: 0.98, 
              filter: 'blur(8px)',
              transition: { 
                duration: 0.4, 
                ease: [0.4, 0, 1, 1]
              }
            }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </div>
      <ChillLeisureGame />
    </div>
  )
}

export default Layout


