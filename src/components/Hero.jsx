import { useState } from 'react'
import { Briefcase, MessageCircle, ChevronDown } from 'lucide-react'

export default function Hero() {
  const [isExploreOpen, setIsExploreOpen] = useState(false)

  return (
    <section id="home" className="hero-shell min-h-screen flex items-center justify-center px-5 sm:px-8 pt-24 md:pt-28 pb-24">
      <div className="hero-grid">
        <div className="hero-cascade-item hero-terminal tech-panel">
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

            <div className="hero-explore-tab">
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
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=devmurilloliveira@gmail.com&su=Portfolio%20contact&body=Hi%20Murillo%2C%0A%0A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-action flex items-center justify-center gap-2 px-6 py-3 text-sm w-full"
                  >
                    <MessageCircle size={13} />
                    Connect
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
