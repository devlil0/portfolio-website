import { lazy, Suspense } from 'react'
import { Briefcase, MessageCircle } from 'lucide-react'

const AboutTimeline = lazy(() => import('./AboutTimeline'))

const stats = [
  { value: '5+', label: 'Months in tech' },
  { value: '4+', label: 'Projects delivered' },
  { value: '∞', label: 'Learning journey' },
]

export default function About({ onNavigate }) {
  const handleSectionLink = (event, sectionId, path) => {
    event.preventDefault()
    onNavigate(sectionId, path)
  }

  return (
    <section id="about" className="section-shell">
      <div className="section-inner">
        <div className="hero-cascade-item hero-terminal tech-panel mb-10 md:mb-14">
          <div className="hero-terminal__bar text-[0.68rem] sm:text-xs">
            <div className="hero-terminal__dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span>portfolio/session/backend</span>
          </div>

          <div className="pt-8 md:pt-12">
            <p className="hero-role-label text-sm md:text-base mb-7">
              BACKEND DEVELOPER
            </p>

            <h1 className="hero-title text-[3.7rem] sm:text-[5.8rem] md:text-[7.3rem] mb-8 leading-[0.86]">
              Murillo Oliveira
            </h1>

            <p className="hero-summary text-[1.08rem] md:text-[1.35rem] max-w-3xl mb-9 leading-[1.55]">
              I build robust, scalable backend systems with <span className="hero-floating-word">Java</span> and <span className="hero-floating-word hero-floating-word--delay">Spring Boot</span>, turning
              real operational problems into clean, well-structured solutions.
            </p>

            <p className="hero-footnote text-sm md:text-[0.95rem] mb-10">
              $ developing reliable APIs through best practices
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:max-w-xl">
              <a
                href="/selected-work"
                onClick={(event) => handleSectionLink(event, 'work', '/selected-work')}
                className="hero-action flex items-center justify-center gap-2 px-6 py-3 text-sm"
              >
                <Briefcase size={13} />
                View Work
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=devmurilloliveira@gmail.com&su=Portfolio%20contact&body=Hi%20Murillo%2C%0A%0A"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-action flex items-center justify-center gap-2 px-6 py-3 text-sm"
              >
                <MessageCircle size={13} />
                Connect
              </a>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-stretch">
        <div className="reveal flex justify-center md:justify-start">
          <div className="relative w-full h-full overflow-hidden rounded-lg group">
            <img
              src="/paronama2.png"
              alt="Murillo Oliveira"
              width="3024"
              height="4032"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="w-full h-full grayscale group-hover:grayscale-0 transition-[filter] duration-300 object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />
          </div>
        </div>

        <div className="reveal tech-panel p-6 sm:p-8 lg:p-10" style={{ transitionDelay: '0.12s' }}>
          <p className="section-kicker mb-4">About</p>
          <h2 className="section-title text-4xl md:text-5xl leading-tight">
            Murillo Oliveira
          </h2>
          <h3 className="about-gradient-word text-4xl md:text-5xl font-semibold leading-tight mt-1">
            Backend<br />Developer
          </h3>
          <div className="about-title-rule h-0.5 bg-purple-300/55 mt-6 mb-8" />

          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-10">
            Every line of code tells a story, and mine began with a curiosity about how
            technology works under the hood. As a child, I used to take apart phones and
            computers trying to understand what was beyond the surface, while my interest
            in games, music, and technology kept growing.
            <br /><br />
            Today, that curiosity has turned into purpose: I study Systems Analysis and
            Development and found in backend development with Java and Spring Boot a way to build real
            solutions. That's how I created my first system after noticing, at work, the
            need to organize manual processes, turning an everyday problem into a practical
            application.
            <br /><br />
            I continue to grow with focus, discipline, and a constant desire to learn,
            building my path in backend development.
          </p>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="border border-white/10 bg-white/[0.02] p-3">
                <div className="text-2xl md:text-3xl font-semibold text-white mb-1">{value}</div>
                <div className="text-slate-500 text-xs leading-snug uppercase tracking-[0.12em]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

        <Suspense fallback={null}>
          <AboutTimeline />
        </Suspense>
      </div>
    </section>
  )
}
