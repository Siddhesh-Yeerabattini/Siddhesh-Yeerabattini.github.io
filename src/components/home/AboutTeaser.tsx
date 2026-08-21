import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from '../layout/Reveal'

export default function AboutTeaser() {
  return (
    <section
      id="about"
      className="section dark-trigger relative -mt-12 overflow-hidden bg-grayBlue px-6 py-32"
    >
      {/* Giant Faint Background Text */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 select-none text-center opacity-[0.03]">
        <h2 className="text-[25vw] font-black leading-none text-white">ABOUT</h2>
      </div>

      <div className="container relative z-10 mx-auto">
        <div className="grid items-center gap-16 md:grid-cols-2">
          {/* Left: Text Content */}
          <Reveal className="text-center md:text-left">
            <h2 className="mb-8 text-4xl font-black text-white md:text-6xl">
              About <span className="text-brandOrange">Me</span>
            </h2>
            <p className="mb-10 text-lg font-light leading-relaxed text-gray-300 md:text-xl">
              I'm a <span className="font-medium text-white">full‑stack developer</span> specializing in building
              scalable applications with strong backends, modern web applications, e‑commerce systems, custom
              dashboards, and API development.
              <br />
              <br />
              I build fast, scalable, and beautiful digital products that live on the web.
            </p>

            <Link
              to="/about"
              className="hover-trigger group inline-flex items-center gap-3 rounded-full border-2 border-brandOrange px-8 py-3 font-bold text-brandOrange transition-all hover:bg-brandOrange hover:text-white"
            >
              <span>Know More</span>
              <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          {/* Right: Visual Code Block */}
          <Reveal delay={0.1} className="hidden md:block">
            <div className="relative mx-auto w-full max-w-md [perspective:1000px]">
              {/* Abstract Background Decoration */}
              <motion.div
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brandOrange/20 blur-2xl"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-blue-500/20 blur-2xl"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              />

              {/* Code Window */}
              <div className="code-window hover-trigger dark-trigger overflow-hidden rounded-xl border border-gray-700 bg-[#1e293b] shadow-2xl">
                {/* Window Header */}
                <div className="flex items-center gap-2 border-b border-gray-700 bg-[#0f172a] px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <div className="ml-4 font-mono text-xs text-gray-500">developer.py</div>
                </div>

                {/* Window Content */}
                <div className="space-y-3 p-6">
                  <div className="flex gap-3">
                    <div className="font-mono text-sm text-brandOrange">class</div>
                    <div className="font-mono text-sm text-yellow-400">Developer:</div>
                  </div>
                  <div className="space-y-2 pl-6">
                    <div className="flex gap-2">
                      <div className="font-mono text-sm text-purple-400">def</div>
                      <div className="font-mono text-sm text-blue-400">__init__(self):</div>
                    </div>
                    <div className="flex gap-2 pl-6">
                      <div className="font-mono text-sm text-gray-400">self.name =</div>
                      <div className="font-mono text-sm text-green-400">"Siddhesh"</div>
                    </div>
                    <div className="flex gap-2 pl-6">
                      <div className="font-mono text-sm text-gray-400">self.stack =</div>
                      <div className="font-mono text-sm text-gray-300">["React", "Django", "AWS"]</div>
                    </div>
                    <br />
                    <div className="flex gap-2">
                      <div className="font-mono text-sm text-purple-400">def</div>
                      <div className="font-mono text-sm text-blue-400">build_future(self):</div>
                    </div>
                    <div className="pl-6 font-mono text-sm text-gray-400">return "Scalable Solutions"</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
