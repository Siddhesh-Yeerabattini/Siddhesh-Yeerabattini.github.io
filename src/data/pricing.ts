export interface PricingItem {
  label: string
  price: string
  highlight?: boolean
}

export interface PricingCategory {
  id: string
  title: string
  borderColor: 'grayBlue' | 'brandOrange'
  items: PricingItem[]
}

// Ground-truth rates — must stay in sync with ESTIMATOR_RATES in src/lib/gemini.ts
export const pricingCategories: PricingCategory[] = [
  {
    id: 'development',
    title: 'Development',
    borderColor: 'grayBlue',
    items: [
      { label: 'Basic Website (Static)', price: '₹12k – 18k' },
      { label: 'Standard Website (Django)', price: '₹25k – 40k' },
      { label: 'E-Commerce Website', price: '₹45k+', highlight: true },
    ],
  },
  {
    id: 'apps-api',
    title: 'Apps & API',
    borderColor: 'brandOrange',
    items: [
      { label: 'Custom Web Application', price: '₹60k+' },
      { label: 'API Development (per endpoint)', price: '₹2k+' },
      { label: 'Maintenance & Support', price: '₹1,000/hr', highlight: true },
    ],
  },
]
