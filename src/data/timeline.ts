export type TimelineAccent = 'brandOrange' | 'grayBlue'

export interface TimelineEntry {
  id: string
  date: string
  title: string
  company: string
  description: string
  accent: TimelineAccent
}

export const timeline: TimelineEntry[] = [
  {
    id: 'nine-a-business-connect',
    date: '2024 - PRESENT',
    title: 'Python Developer',
    company: 'Nine A Business Connect',
    description:
      'Spearheading development for Bizpulse and IDP platforms. Building full-stack solutions with React and Django, creating REST APIs, and implementing skin tone analysis models.',
    accent: 'brandOrange',
  },
  {
    id: 'lstms-technologies',
    date: '2022 - 2024',
    title: 'Python Developer',
    company: 'LSTMS Technologies',
    description:
      'Architected REST APIs for Byme Admin and BrainyBits. Managed serverless deployments on AWS Lambda and handled migration from dev to production environments.',
    accent: 'grayBlue',
  },
  {
    id: 'itvedant-education',
    date: '2022',
    title: "Master's in Full Stack",
    company: 'Itvedant Education',
    description:
      'Completed intensive training in Java, Python, and Web Development frameworks, transitioning from a Mass Media background to software engineering.',
    accent: 'grayBlue',
  },
]
