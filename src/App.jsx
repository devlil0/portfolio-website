import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import About from './components/About'

const Projects = lazy(() => import('./components/Projects'))
const Skills = lazy(() => import('./components/Skills'))
const Contact = lazy(() => import('./components/Contact'))

const SECTION_PATHS = {
  about: '/',
  work: '/work',
  skills: '/skills',
  contact: '/contact',
}

const PATH_TO_SECTION = Object.fromEntries(
  Object.entries(SECTION_PATHS).map(([id, path]) => [path, id])
)

PATH_TO_SECTION['/about'] = 'about'

const INTRO_MINIMUM_MS = 1900
const INTRO_IMAGE_URL = '/paronama2.png'

function isChromeBrowser() {
  const brands = window.navigator.userAgentData?.brands || []
  if (brands.some((brand) => brand.brand === 'Google Chrome')) return true

  const userAgent = window.navigator.userAgent
  return /Chrome|CriOS/i.test(userAgent) && !/Edg|OPR|Opera|SamsungBrowser/i.test(userAgent)
}

function preloadImage(url) {
  return new Promise((resolve) => {
    const image = new Image()
    image.loading = 'eager'
    image.decoding = 'sync'
    image.fetchPriority = 'high'

    image.onload = async () => {
      try {
        if (image.decode) await image.decode()
      } catch {
        // The image is already loaded; decoding can fail on some browsers.
      }

      resolve()
    }

    image.onerror = resolve
    image.src = url
  })
}

const portraitImagePreload = preloadImage(INTRO_IMAGE_URL)

export default function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [activeSection, setActiveSection] = useState(() => PATH_TO_SECTION[window.location.pathname] || 'about')
  const [useChromeLiteMode] = useState(() => isChromeBrowser())

  const navigateToSection = useCallback((sectionId, path) => {
    setActiveSection(sectionId)
    window.history.pushState(null, '', path)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }

    setActiveSection(PATH_TO_SECTION[window.location.pathname] || 'about')
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    const startedAt = window.performance.now()
    let cancelled = false
    let introFinished = false

    const finishIntro = () => {
      if (cancelled || introFinished) return
      introFinished = true

      const elapsed = window.performance.now() - startedAt
      const remaining = Math.max(INTRO_MINIMUM_MS - elapsed, 0)

      window.setTimeout(() => {
        if (!cancelled) setShowIntro(false)
      }, remaining)
    }

    portraitImagePreload.then(() => {
      finishIntro()
    })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const preloadSections = () => {
      import('./components/Projects')
      import('./components/Skills')
      import('./components/Contact')
      import('./components/AboutTimeline')
    }

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(preloadSections, { timeout: 3000 })
      return () => window.cancelIdleCallback(idleId)
    }

    const timer = window.setTimeout(preloadSections, 2500)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (showIntro) return undefined

    const root = document.querySelector('main')
    if (!root) return undefined

    if (!('IntersectionObserver' in window)) {
      root.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))
      return undefined
    }

    const observedElements = new WeakSet()

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

    const observeRevealElements = (container = root) => {
      container.querySelectorAll('.reveal').forEach((el) => {
        if (observedElements.has(el) || el.classList.contains('is-visible')) return
        observedElements.add(el)
        observer.observe(el)
      })
    }

    observeRevealElements()

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return

          if (node.matches('.reveal') && !observedElements.has(node) && !node.classList.contains('is-visible')) {
            observedElements.add(node)
            observer.observe(node)
          }

          observeRevealElements(node)
        })
      })
    })

    mutationObserver.observe(root, { childList: true, subtree: true })

    return () => {
      mutationObserver.disconnect()
      observer.disconnect()
    }
  }, [activeSection, showIntro])

  useEffect(() => {
    const handlePopState = () => {
      setActiveSection(PATH_TO_SECTION[window.location.pathname] || 'about')
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'about':
        return <About onNavigate={navigateToSection} />
      case 'work':
        return <Projects />
      case 'skills':
        return <Skills />
      case 'contact':
        return <Contact />
      default:
        return <About onNavigate={navigateToSection} />
    }
  }

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
      <div className={`site-frame min-h-screen ${showIntro ? 'site-frame--intro-active' : 'site-frame--ready'} ${useChromeLiteMode ? 'site-frame--chrome-lite' : ''}`}>
        <div className="molecule-field" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <Navbar activeSection={activeSection} onNavigate={navigateToSection} />
        <main>
          <Suspense fallback={<div className="section-shell section-inner text-slate-500">Loading...</div>}>
            {renderActiveSection()}
          </Suspense>
        </main>
      </div>
    </>
  )
}
