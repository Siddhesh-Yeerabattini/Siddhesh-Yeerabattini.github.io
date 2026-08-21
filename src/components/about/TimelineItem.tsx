import type { TimelineAccent } from '../../data/timeline'

interface TimelineItemProps {
  date: string
  title: string
  company: string
  description: string
  accent: TimelineAccent
}

export default function TimelineItem({ date, title, company, description, accent }: TimelineItemProps) {
  const dotColor = accent === 'brandOrange' ? 'bg-brandOrange' : 'bg-grayBlue'
  const dateColor = accent === 'brandOrange' ? 'text-brandOrange' : 'text-gray-400'

  return (
    <div className="hover-trigger relative">
      <div className={`absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white shadow-md ${dotColor}`} />
      <span className={`mb-1 block text-xs font-bold tracking-widest ${dateColor}`}>{date}</span>
      <h3 className="text-xl font-bold text-grayBlue">{title}</h3>
      <h4 className="mb-2 text-sm font-bold text-gray-400">{company}</h4>
      <p className="mt-2 text-sm font-light text-gray-500">{description}</p>
    </div>
  )
}
