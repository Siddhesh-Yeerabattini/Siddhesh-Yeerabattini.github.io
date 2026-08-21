import { motion } from 'framer-motion'
import RobotAvatar from './RobotAvatar'

interface ChatMessageProps {
  role: 'user' | 'bot'
  text: string
}

export default function ChatMessage({ role, text }: ChatMessageProps) {
  const isUser = role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex items-end gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-grayBlue text-xs text-white shadow-sm">
          <RobotAvatar scale={0.5} floating={false} />
        </div>
      )}
      <div
        className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
          isUser
            ? 'rounded-br-none bg-brandOrange text-white'
            : 'rounded-bl-none border border-gray-100 bg-white text-gray-600'
        }`}
        // Bot replies come from Gemini, constrained by the system prompt to
        // a small set of formatting tags (<b>, <br>, <ul>/<li>) — same
        // rendering approach the original static site used.
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </motion.div>
  )
}
