import Reveal from '../layout/Reveal'
import PricingCard from './PricingCard'
import EstimatorModal from './EstimatorModal'
import { pricingCategories } from '../../data/pricing'

export default function PricingSection() {
  return (
    <section id="pricing" className="section relative bg-gray-50 py-20 md:py-32">
      <div className="container mx-auto max-w-4xl px-6">
        <Reveal>
          <h2 className="mb-12 text-center text-3xl font-black text-grayBlue md:text-4xl">
            Rate <span className="text-brandOrange">Card</span>
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          {pricingCategories.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.1}>
              <PricingCard category={category} />
            </Reveal>
          ))}
        </div>

        <EstimatorModal />
      </div>
    </section>
  )
}
