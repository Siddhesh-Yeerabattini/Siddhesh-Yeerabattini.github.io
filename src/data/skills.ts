export type SkillIconBg = 'grayBlue' | 'brandOrange'

export interface SkillCategory {
  id: string
  icon: string
  title: string
  iconBg: SkillIconBg
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    icon: 'fas fa-code',
    title: 'Frontend',
    iconBg: 'grayBlue',
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'JavaScript (ES6+)', 'Framer Motion'],
  },
  {
    id: 'backend',
    icon: 'fas fa-server',
    title: 'Backend',
    iconBg: 'brandOrange',
    skills: ['Python', 'Django / DRF', 'Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'tools-cloud',
    icon: 'fas fa-rocket',
    title: 'Tools & Cloud',
    iconBg: 'grayBlue',
    skills: ['AWS (EC2, S3)', 'Docker', 'Git / GitHub', 'LLM Integration', 'Nginx'],
  },
]
