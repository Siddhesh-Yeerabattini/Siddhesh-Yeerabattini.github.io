import type { Service } from '../../data/services'

const ACCENT_BAR_CLASSES: Record<'brandOrange' | 'grayBlue', string> = {
  brandOrange: 'bg-brandOrange',
  grayBlue: 'bg-grayBlue',
}

const ACCENT_ICON_CLASSES: Record<'brandOrange' | 'grayBlue', string> = {
  brandOrange: 'text-brandOrange',
  grayBlue: 'text-grayBlue',
}

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const iconColorClass = service.accentColor
    ? ACCENT_ICON_CLASSES[service.accentColor]
    : 'text-grayBlue transition-colors group-hover:text-brandOrange'

  return (
    <div className="clean-card hover-trigger group relative overflow-hidden rounded-lg p-6">
      {service.accentColor && (
        <div className={`absolute left-0 top-0 h-full w-1.5 ${ACCENT_BAR_CLASSES[service.accentColor]}`} />
      )}
      <i className={`${service.icon} mb-4 text-2xl ${iconColorClass}`} />
      <h3 className="mb-2 text-lg font-bold text-grayBlue">{service.title}</h3>
      <p className="mb-4 text-xs leading-relaxed text-gray-500">{service.description}</p>
      <ul className="space-y-1 text-[11px] font-medium text-gray-400">
        {service.bullets.map((bullet) => (
          <li key={bullet}>+ {bullet}</li>
        ))}
      </ul>
    </div>
  )
}
