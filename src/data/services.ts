export type ServiceAccent = 'brandOrange' | 'grayBlue'

export interface Service {
  id: string
  icon: string
  title: string
  description: string
  bullets: [string, string]
  accentColor?: ServiceAccent
}

export const services: Service[] = [
  {
    id: 'ai-webapps',
    icon: 'fas fa-brain',
    title: 'AI Webapps',
    description: 'Next-gen apps integrated with LLMs for smart automation.',
    bullets: ['Predictive Analytics', 'Content Gen'],
    accentColor: 'brandOrange',
  },
  {
    id: 'ai-chatbots',
    icon: 'fas fa-robot',
    title: 'AI Chatbots',
    description: 'Intelligent agents for 24/7 customer support.',
    bullets: ['WhatsApp Bots', 'Sales Agents'],
    accentColor: 'grayBlue',
  },
  {
    id: 'custom-apps',
    icon: 'fas fa-layer-group',
    title: 'Custom Apps',
    description: 'Tailored software: CRM, ERP-lite, Inventory Control.',
    bullets: ['Billing Systems', 'Dashboards'],
  },
  {
    id: 'ecommerce',
    icon: 'fas fa-shopping-bag',
    title: 'E-Commerce',
    description: 'Full online stores with carts and payment gateways.',
    bullets: ['Marketplaces', 'Admin Panels'],
  },
  {
    id: 'business-sites',
    icon: 'fas fa-briefcase',
    title: 'Business Sites',
    description: 'Professional, fast, and SEO-optimized sites.',
    bullets: ['Corporate', 'Landing Pages'],
  },
  {
    id: 'api-dev',
    icon: 'fas fa-network-wired',
    title: 'API Dev',
    description: 'Secure RESTful backend systems for apps.',
    bullets: ['Mobile Backends', 'Auth Systems'],
  },
  {
    id: 'deployment',
    icon: 'fas fa-cloud-upload-alt',
    title: 'Deployment',
    description: 'AWS Lambda setup, Domain setup, Server optimization.',
    bullets: ['CI/CD Pipelines', 'Maintenance'],
  },
  {
    id: 'fixing',
    icon: 'fas fa-bug',
    title: 'Fixing',
    description: 'Expert troubleshooting for bugs and API errors.',
    bullets: ['Speed Ops', 'Critical Fixes'],
  },
  {
    id: 'ui-ux',
    icon: 'fas fa-paint-brush',
    title: 'UI/UX',
    description: 'Modern, clean interfaces with React & Tailwind.',
    bullets: ['Mobile First', 'Figma to Code'],
  },
  {
    id: 'portfolios',
    icon: 'fas fa-id-card',
    title: 'Portfolios',
    description: 'Stand out with a personal branding website.',
    bullets: ['Resumes', 'Galleries'],
  },
]
