import Reveal from '../layout/Reveal'

export default function MyStory() {
  return (
    <section id="my-story" className="section relative py-20">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-16 md:grid-cols-2">
          {/* Image/Visual */}
          <Reveal className="group relative">
            <div className="absolute -left-4 top-4 h-full w-full rounded-lg border-2 border-brandOrange" />
            <div className="dark-trigger hover-trigger relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop"
                alt="Working"
                className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
              />
            </div>
          </Reveal>

          {/* Narrative */}
          <Reveal delay={0.1}>
            <h2 className="mb-6 text-3xl font-black text-grayBlue">
              From Mumbai to the <span className="text-brandOrange">Cloud</span>
            </h2>
            <div className="space-y-6 font-light leading-relaxed text-gray-600">
              <p>
                Born and raised in the bustling streets of{' '}
                <strong className="text-grayBlue">Mumbai, India 🇮🇳</strong>, I learned early on that chaos needs
                structure. That philosophy became the foundation of my coding career.
              </p>
              <p>
                My journey wasn't linear. It started with simple HTML pages, tweaking CSS until it broke, and
                fixing it again. Today, I architect scalable microservices on AWS and build reactive interfaces
                that feel alive.
              </p>
              <p>
                I don't just "build websites." I solve business problems. Whether it's optimizing a slow database
                query or designing an AI-driven chatbot, I look for the most efficient, scalable solution.
              </p>

              <div className="pt-4">
                <h3 className="mb-2 font-bold text-grayBlue">My Philosophy</h3>
                <blockquote className="border-l-4 border-brandOrange pl-4 italic text-gray-500">
                  "Technology should be invisible. The user shouldn't notice the code; they should only
                  experience the solution."
                </blockquote>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
