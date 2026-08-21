import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/layout/Nav'
import ScrollToTopButton from './components/layout/ScrollToTopButton'
import CustomCursor from './components/layout/CustomCursor'
import ChatbotWidget from './components/chatbot/ChatbotWidget'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'

/** Scrolls to the #hash target once its section has rendered (handles both
 * in-app route changes and a fresh full-page load landing on a hash URL).
 * With no hash, resets to the top — React Router doesn't do this on its own,
 * so a route change would otherwise leave the new page at the old scroll offset. */
function useScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 })
      return
    }
    const id = hash.slice(1)
    const raf = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    })
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])
}

function App() {
  useScrollToHash()

  return (
    <>
      <CustomCursor />
      <ScrollToTopButton />
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <ChatbotWidget />
    </>
  )
}

export default App
