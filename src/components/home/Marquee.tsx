const MARQUEE_TEXT = 'Python • Django • React • AWS • Microservices • Full Stack • UI/UX • AI Solutions •'

export default function Marquee() {
  return (
    <div className="dark-trigger relative z-20 rotate-1 scale-105 border-y-4 border-brandOrange bg-grayBlue py-4">
      <div className="marquee-container">
        <div className="marquee-content text-xl font-bold uppercase tracking-widest text-milk md:text-2xl">
          {MARQUEE_TEXT} {MARQUEE_TEXT}
        </div>
      </div>
    </div>
  )
}
