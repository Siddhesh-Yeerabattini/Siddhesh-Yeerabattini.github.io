import Reveal from '../layout/Reveal'
import { skillCategories } from '../../data/skills'

export default function SkillsGrid() {
  return (
    <section id="skills" className="section relative py-20">
      <div className="container mx-auto px-6">
        <Reveal className="mb-16 text-center">
          <h2 className="text-4xl font-black text-grayBlue">
            What I <span className="text-brandOrange">Speak</span>
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {skillCategories.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.1}>
              <div className="clean-card hover-trigger rounded-xl p-8">
                <div
                  className={`mb-6 flex h-12 w-12 items-center justify-center rounded-full text-xl text-white ${
                    category.iconBg === 'brandOrange' ? 'bg-brandOrange' : 'bg-grayBlue'
                  }`}
                >
                  <i className={category.icon} />
                </div>
                <h3 className="mb-6 text-xl font-bold text-grayBlue">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
