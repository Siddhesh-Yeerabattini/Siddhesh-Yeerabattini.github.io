import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const variants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

/** Framer Motion replacement for the old .reveal IntersectionObserver class. */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.5, 0, 0, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
