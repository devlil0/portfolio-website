import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Journey from './components/Journey'
import Contact from './components/Contact'

export default function App() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const introDuration = reducedMotion ? 1000 : 3000

    const timer = window.setTimeout(() => {
      setShowIntro(false)
    }, introDuration)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal')

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
    )

    revealElements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {showIntro && (
        <div className="intro-screen" aria-hidden="true">
          <div className="intro-screen__glow" />
          <div className="intro-screen__text">
            <span className="intro-screen__typing">devlil0</span>
            <span className="intro-screen__cursor">_</span>
          </div>
        </div>
      )}
      <div className={`site-frame bg-[#040913] min-h-screen ${showIntro ? 'site-frame--intro-active' : 'site-frame--ready'}`}>
        <Navbar />
        <main className="mt-14 md:mt-28">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Journey />
          <Contact />
        </main>
      </div>
    </>
  )
}
