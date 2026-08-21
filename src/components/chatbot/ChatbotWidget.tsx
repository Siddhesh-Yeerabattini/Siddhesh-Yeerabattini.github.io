import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import RobotAvatar from './RobotAvatar'
import ChatWindow from './ChatWindow'

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasNotification, setHasNotification] = useState(true)

  const toggle = () => {
    setIsOpen((v) => !v)
    setHasNotification(false)
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end font-sans">
      <AnimatePresence>{isOpen && <ChatWindow onClose={toggle} />}</AnimatePresence>

      <button
        onClick={toggle}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-white/50 bg-grayBlue shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-brandOrange"
        aria-label="Toggle AI assistant"
      >
        <RobotAvatar />
        {hasNotification && (
          <span className="absolute right-0 top-0 h-4 w-4 animate-bounce rounded-full border-2 border-white bg-brandOrange" />
        )}
      </button>
    </div>
  )
}
