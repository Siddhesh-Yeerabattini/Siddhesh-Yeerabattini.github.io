import Reveal from '../layout/Reveal'
import TimelineItem from './TimelineItem'
import { timeline } from '../../data/timeline'

export default function Timeline() {
  return (
    <section id="timeline" className="section border-y border-gray-200 bg-gray-50 py-20">
      <div className="container mx-auto max-w-4xl px-6">
        <Reveal className="mb-16 text-center">
          <h2 className="text-4xl font-black text-grayBlue">
            The <span className="text-brandOrange">Timeline</span>
          </h2>
        </Reveal>

        <div className="relative ml-4 space-y-12 border-l border-gray-300 pl-8 md:ml-0">
          {timeline.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.1}>
              <TimelineItem
                date={item.date}
                title={item.title}
                company={item.company}
                description={item.description}
                accent={item.accent}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
