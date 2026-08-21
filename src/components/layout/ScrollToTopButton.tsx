import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3, ease: [0.175, 0.885, 0.32, 1.275] }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover-trigger fixed bottom-8 right-28 md:right-32 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-none bg-brandOrange text-milk shadow-lg outline-none hover:bg-grayBlue"
          aria-label="Scroll to top"
        >
          <i className="fas fa-arrow-up text-lg" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
