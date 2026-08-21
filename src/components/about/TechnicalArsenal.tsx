import Reveal from '../layout/Reveal'
import SkillBar from './SkillBar'

export default function TechnicalArsenal() {
  return (
    <section id="technical-arsenal" className="section relative py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <h2 className="mb-8 text-4xl font-black text-grayBlue md:text-5xl">
              Technical <br />
              <span className="text-brandOrange">Arsenal</span>
            </h2>
            <p className="mb-8 text-base font-light leading-relaxed text-gray-600 md:text-lg">
              I don't just write code; I engineer solutions. My stack is built for speed, security, and
              scalability. From crafting intuitive frontends to deploying production-ready backend systems on
              AWS.
            </p>
            <a
              href="#"
              className="hover-trigger border-b-2 border-brandOrange pb-1 font-bold text-brandOrange transition-colors hover:border-grayBlue hover:text-grayBlue"
            >
              Download Resume
            </a>
          </Reveal>

          <Reveal delay={0.1} className="space-y-8">
            <SkillBar label="Backend Architecture" percent={95} />
            <SkillBar label="Frontend Development" percent={85} />
            <SkillBar label="Cloud & DevOps" percent={80} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
