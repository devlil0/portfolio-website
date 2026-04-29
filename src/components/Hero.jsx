import { useState } from 'react'
import { Briefcase, MessageCircle, ChevronDown } from 'lucide-react'

export default function Hero() {
  const [isExploreOpen, setIsExploreOpen] = useState(false)

  return (
    <section id="home" className="hero-shell min-h-screen flex flex-col items-center justify-center text-center px-6 sm:px-8 pt-10 md:pt-0 pb-32 md:pb-48">
      <p className="hero-cascade-item hero-role-label text-[0.72rem] md:text-[0.92rem] uppercase mb-8 md:mb-10">
        BACKEND DEVELOPER
      </p>

      <h1 className="hero-cascade-item hero-title text-[4.5rem] sm:text-[6.3rem] md:text-[8.8rem] mb-8 md:mb-12 leading-[0.9]">
        Murillo Oliveira
      </h1>

      <p className="hero-cascade-item hero-summary text-[1.18rem] md:text-[1.5rem] max-w-5xl mb-12 md:mb-20 leading-[1.5]">
        I build robust, scalable backend systems with <span className="hero-floating-word">Java</span> and <span className="hero-floating-word hero-floating-word--delay">Spring Boot</span>, turning
        real operational problems into clean, well-structured solutions.
      </p>

      <p className="hero-cascade-item hero-footnote text-lg md:text-[1.02rem] mb-20 md:mb-24">
        Developing reliable APIs through best practices.
      </p>

      <div className="hero-cascade-item hero-explore-tab">
        <button
          type="button"
          className="hero-explore-toggle"
          onClick={() => setIsExploreOpen((open) => !open)}
          aria-expanded={isExploreOpen}
          aria-controls="hero-explore-panel"
        >
          <span className="hero-explore flex items-center gap-2 text-xs uppercase">
            <span>Explore</span>
            <ChevronDown size={11} className={`hero-explore-icon ${isExploreOpen ? 'hero-explore-icon--open' : ''}`} />
          </span>
        </button>

        <div
          id="hero-explore-panel"
          className={`hero-explore-panel ${isExploreOpen ? 'hero-explore-panel--open' : ''}`}
        >
          <div className="hero-explore-panel__inner">
            <a
              href="#work"
              className="hero-action flex items-center justify-center gap-2 px-6 py-3 text-sm w-full"
            >
              <Briefcase size={13} />
              View Work
            </a>
            <a
              href="#contact"
              className="hero-action flex items-center justify-center gap-2 px-6 py-3 text-sm w-full"
            >
              <MessageCircle size={13} />
              Connect
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
