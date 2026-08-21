import type { PricingCategory } from '../../data/pricing'

const BORDER_CLASSES: Record<'grayBlue' | 'brandOrange', string> = {
  grayBlue: 'border-grayBlue',
  brandOrange: 'border-brandOrange',
}

interface PricingCardProps {
  category: PricingCategory
}

export default function PricingCard({ category }: PricingCardProps) {
  return (
    <div className={`hover-trigger border-t-4 bg-white p-8 shadow-lg ${BORDER_CLASSES[category.borderColor]}`}>
      <h3 className="mb-6 text-2xl font-bold text-grayBlue">{category.title}</h3>
      <ul className="space-y-4">
        {category.items.map((item, index) => (
          <li
            key={item.label}
            className={`flex items-center justify-between pb-3 ${
              index < category.items.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <span className="text-sm font-medium text-gray-500">{item.label}</span>
            <span className={`font-bold ${item.highlight ? 'text-brandOrange' : 'text-grayBlue'}`}>
              {item.price}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
