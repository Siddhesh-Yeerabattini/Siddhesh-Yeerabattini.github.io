import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '../layout/Reveal'
import ServiceCard from './ServiceCard'
import { services } from '../../data/services'

const VISIBLE_COUNT = 4

export default function ServicesGrid() {
  const [expanded, setExpanded] = useState(false)

  const visibleServices = services.slice(0, VISIBLE_COUNT)
  const moreServices = services.slice(VISIBLE_COUNT)

  const handleToggle = () => {
    if (expanded) {
      setExpanded(false)
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      setExpanded(true)
    }
  }

  return (
    <section id="services" className="section border-y border-gray-200 bg-gray-50 py-20 md:py-32">
      <div className="container mx-auto px-6">
        <Reveal className="mb-12 flex flex-col justify-between md:mb-16 md:flex-row md:items-end">
          <div>
            <h2 className="mb-2 text-3xl font-black text-grayBlue md:text-4xl">
              Services <span className="text-brandOrange">.</span>
            </h2>
            <p className="font-light text-gray-500">Comprehensive Digital & AI Solutions</p>
          </div>
          <div className="hidden h-[2px] w-32 bg-gray-300 md:block" />
        </Reveal>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {visibleServices.map((service) => (
            <Reveal key={service.id}>
              <ServiceCard service={service} />
            </Reveal>
          ))}

          <AnimatePresence>
            {expanded &&
              moreServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <ServiceCard service={service} />
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        <Reveal className="mt-16 text-center">
          <button
            onClick={handleToggle}
            className="hover-trigger group mx-auto flex items-center justify-center gap-3 font-bold text-grayBlue"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-grayBlue transition-all group-hover:bg-grayBlue group-hover:text-white">
              <i
                className={`fas transition-transform group-hover:translate-y-1 ${
                  expanded ? 'fa-chevron-up' : 'fa-chevron-down'
                }`}
              />
            </span>
            <span>{expanded ? 'View Less' : 'View More Services'}</span>
          </button>
        </Reveal>
      </div>
    </section>
  )
}
