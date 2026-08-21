import Reveal from '../layout/Reveal'

export default function AboutHero() {
  return (
    <section id="hero" className="section relative overflow-hidden px-6 pb-20 pt-40">
      <div className="container mx-auto">
        <Reveal className="mx-auto max-w-4xl text-center">
          <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-brandOrange">
            The Person Behind The Code
          </span>
          <h1 className="dark-trigger hover-trigger mb-8 text-5xl font-black leading-tight text-grayBlue md:text-7xl">
            More Than Just <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px var(--color-grayBlue)' }}>
              Syntax
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-gray-500 md:text-xl">
            I believe that code is poetry written for machines to perform miracles. My mission is to bridge the
            gap between complex backend logic and seamless frontend experiences.
          </p>
        </Reveal>
      </div>

      {/* Decorative bg text */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center opacity-[0.02]">
        <h1 className="text-[20vw] font-black leading-none text-grayBlue">STORY</h1>
      </div>
    </section>
  )
}
