import { motion } from 'framer-motion'

interface SkillBarProps {
  label: string
  percent: number
}

/** Animated stat bar for the Technical Arsenal section — fills in on scroll instead of the original's static inline width. */
export default function SkillBar({ label, percent }: SkillBarProps) {
  return (
    <div className="group">
      <div className="mb-2 flex justify-between">
        <h3 className="text-sm font-bold text-grayBlue md:text-base">{label}</h3>
        <span className="font-medium text-brandOrange">{percent}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
        <motion.div
          className="h-full rounded-full bg-grayBlue transition-colors duration-500 group-hover:bg-brandOrange"
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.5, 0, 0, 1] }}
        />
      </div>
    </div>
  )
}
