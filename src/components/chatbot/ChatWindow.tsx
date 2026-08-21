import { useEffect, useRef, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import RobotAvatar from './RobotAvatar'
import ChatMessage from './ChatMessage'
import { fetchChatResponse, isChatConfigured } from '../../lib/gemini'

interface Message {
  id: string
  role: 'user' | 'bot'
  text: string
}

const WELCOME: Message = {
  id: 'welcome',
  role: 'bot',
  text: "Hi there! 👋 I'm Siddhesh's virtual assistant.<br><br>I can tell you about his <b>projects</b>, <b>tech stack</b>, or <b>experience</b>. What would you like to know?",
}

interface ChatWindowProps {
  onClose: () => void
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const messagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight })
  }, [messages, sending])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || sending) return

    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'user', text }])
    setInput('')
    setSending(true)

    try {
      if (!isChatConfigured()) throw new Error("I'm offline right now — check back soon!")
      const reply = await fetchChatResponse(text)
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'bot', text: reply }])
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong.'
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'bot', text: message }])
    } finally {
      setSending(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      style={{ transformOrigin: 'bottom right' }}
      className="mb-4 flex h-[500px] w-80 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:w-96"
    >
      <div className="z-10 flex items-center justify-between bg-grayBlue p-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10">
            <RobotAvatar scale={0.7} floating={false} />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-wide text-white">Siddhesh AI</h3>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
              <span className="text-xs font-medium text-gray-300">Online</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-gray-300 transition-all hover:bg-white/10 hover:text-white"
          aria-label="Close chat"
        >
          <i className="fas fa-times text-sm" />
        </button>
      </div>

      <div ref={messagesRef} className="flex-1 space-y-4 overflow-y-auto bg-milk p-4 scroll-smooth">
        <div className="text-center">
          <span className="rounded-full bg-gray-100 px-2 py-1 text-[10px] font-medium uppercase tracking-widest text-gray-400">
            Today
          </span>
        </div>
        {messages.map((m) => (
          <ChatMessage key={m.id} role={m.role} text={m.text} />
        ))}
        {sending && (
          <div className="flex items-end justify-start gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-grayBlue text-xs text-white shadow-sm">
              <RobotAvatar scale={0.5} floating={false} />
            </div>
            <div className="flex h-12 items-center gap-1 rounded-2xl rounded-bl-none border border-gray-100 bg-white p-4 shadow-sm">
              <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
              <div
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"
                style={{ animationDelay: '0.1s' }}
              />
              <div
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"
                style={{ animationDelay: '0.2s' }}
              />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-gray-100 bg-white p-4">
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me something..."
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-5 pr-12 text-sm text-gray-700 placeholder:text-gray-400 focus:border-brandOrange focus:outline-none focus:ring-1 focus:ring-brandOrange"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-brandOrange text-white shadow-md transition-all hover:scale-105 hover:bg-grayBlue"
            aria-label="Send message"
          >
            <i className="fas fa-arrow-up text-xs" />
          </button>
        </div>
      </form>
    </motion.div>
  )
}
