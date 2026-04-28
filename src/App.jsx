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
    const introDuration = reducedMotion ? 300 : 3000

    const timer = window.setTimeout(() => {
      setShowIntro(false)
    }, introDuration)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className={`site-frame bg-[#040913] min-h-screen ${showIntro ? 'site-frame--intro-active' : 'site-frame--ready'}`}>
      {showIntro && (
        <div className="intro-screen" aria-hidden="true">
          <div className="intro-screen__glow" />
          <div className="intro-screen__text">
            <span className="intro-screen__typing">devlil0</span>
            <span className="intro-screen__cursor">_</span>
          </div>
        </div>
      )}
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
  )
}
