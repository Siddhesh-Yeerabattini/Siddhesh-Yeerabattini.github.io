import { motion } from 'framer-motion'
import Reveal from '../layout/Reveal'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop'

/** Continuous decorative float loop, replacing the old animate-float / animate-float-delayed CSS keyframes. */
function FloatingBadge({
  className,
  delay = 0,
  dotColor,
  label,
  value,
}: {
  className: string
  delay?: number
  dotColor: string
  label: string
  value: string
}) {
  return (
    <motion.div
      className={`absolute rounded-lg border border-grayBlue/10 bg-white/80 p-3 shadow-xl backdrop-blur md:p-4 ${className}`}
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <div className="mb-1 flex items-center gap-3">
        <div className={`h-2 w-2 rounded-full ${dotColor}`} />
        <span className="text-[10px] font-bold uppercase tracking-wide text-grayBlue md:text-xs">{label}</span>
      </div>
      <p className="text-[10px] font-medium text-gray-500 md:text-xs">{value}</p>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section id="home" className="section relative flex min-h-screen items-center overflow-hidden pt-32 md:pt-24">
      {/* Big Background Text */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center opacity-[0.03]">
        <h1 className="text-[15vw] font-black leading-none text-grayBlue">DEVELOPER</h1>
      </div>

      <div className="container relative z-10 mx-auto grid h-full grid-cols-1 items-center gap-12 px-6 md:grid-cols-12 md:gap-0">
        {/* Left Content */}
        <div className="order-2 flex flex-col justify-center text-center md:order-1 md:col-span-5 md:text-left">
          <Reveal className="mb-8 flex items-center justify-center gap-3 md:justify-start">
            <span className="h-[1px] w-16 bg-brandOrange" />
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-brandOrange">
              Based in India 🇮🇳
            </span>
          </Reveal>

          <Reveal delay={0.1} className="mx-auto w-fit md:mx-0">
            <h1 className="hover-trigger mb-6 text-5xl font-black leading-[1.1] text-grayBlue md:text-7xl md:leading-[0.95]">
              Siddhesh
              <br /> Yeerabattini
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mx-auto mb-10 max-w-md font-sans text-base leading-relaxed text-gray-500 md:mx-0 md:text-lg">
              <span className="font-bold text-grayBlue">Full Stack Developer</span>
              <br />
              I build scalable systems that run chaos-free.
              <br /> <span className="font-bold text-grayBlue">Backend Logic. Frontend Elegance. AI Solutions.</span>
            </p>
          </Reveal>

          <Reveal delay={0.3} className="flex justify-center gap-6 md:justify-start">
            <a href="#services" className="hover-trigger group flex items-center gap-3 font-bold text-grayBlue">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-grayBlue transition-all group-hover:bg-grayBlue group-hover:text-white">
                <i className="fas fa-arrow-down group-hover:animate-bounce" />
              </span>
              View Services
            </a>
          </Reveal>
        </div>

        {/* Right Visual */}
        <div className="order-1 flex items-center justify-center md:order-2 md:col-span-7 md:justify-end">
          <div className="hover-trigger dark-trigger group relative h-[450px] w-full max-w-[320px] md:h-[550px] md:max-w-[400px]">
            {/* Image */}
            <div className="hero-mask absolute inset-0 overflow-hidden rounded-lg bg-gray-200 grayscale transition-all duration-700 ease-out group-hover:grayscale-0">
              <img src={HERO_IMAGE} className="h-full w-full object-cover" alt="Siddhesh Yeerabattini" />
            </div>

            <FloatingBadge
              className="-left-4 top-8 md:-left-12 md:top-12"
              dotColor="bg-brandOrange"
              label="Intelligence"
              value="AI / Python"
            />

            <FloatingBadge
              className="-right-4 bottom-16 md:-right-8 md:bottom-20"
              delay={2}
              dotColor="bg-grayBlue"
              label="Development"
              value="Django / React"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
