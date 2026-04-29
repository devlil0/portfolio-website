
import { useRef, useState } from 'react'
import { Home, Briefcase, User, Code2, Mail, Github, Linkedin, Menu, X } from 'lucide-react'

const navLinks = [
  { icon: Home,      label: 'Home',    href: '#home' },
  { icon: User,      label: 'About',   href: '#about' },
  { icon: Briefcase, label: 'Work',    href: '#work' },
  { icon: Code2,     label: 'Skills',  href: '#skills' },
  { icon: Mail,      label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { icon: Github,   label: 'GitHub',   href: 'https://github.com/devlil0' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/murilloliveira999' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isDraggingNav, setIsDraggingNav] = useState(false)
  const navRef = useRef(null)
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0 })
  const pendingOffsetRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef(null)
  const didDragRef = useRef(false)

  const closeMenu = () => setOpen(false)

  const applyNavOffset = () => {
    animationFrameRef.current = null

    if (!navRef.current) return

    const { x, y } = pendingOffsetRef.current
    navRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  const handleDesktopNavMouseDown = (event) => {
    if (event.button !== 0) return

    dragStartRef.current = {
      mouseX: event.clientX,
      mouseY: event.clientY,
    }
    didDragRef.current = false
    setIsDraggingNav(true)

    if (navRef.current) {
      navRef.current.style.transition = 'none'
    }

    const handleMouseMove = (moveEvent) => {
      const nextOffset = {
        x: moveEvent.clientX - dragStartRef.current.mouseX,
        y: moveEvent.clientY - dragStartRef.current.mouseY,
      }

      if (Math.abs(nextOffset.x) > 4 || Math.abs(nextOffset.y) > 4) {
        didDragRef.current = true
      }

      pendingOffsetRef.current = nextOffset

      if (animationFrameRef.current === null) {
        animationFrameRef.current = window.requestAnimationFrame(applyNavOffset)
      }
    }

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }

      pendingOffsetRef.current = { x: 0, y: 0 }
      if (navRef.current) {
        navRef.current.style.transition = 'transform 620ms cubic-bezier(0.16, 1, 0.3, 1)'
        navRef.current.style.transform = 'translate3d(0, 0, 0)'
      }

      setIsDraggingNav(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const handleDesktopNavClick = (event) => {
    if (didDragRef.current) {
      event.preventDefault()
      didDragRef.current = false
    }
  }

  return (
    <>
      {/* ── Mobile: top bar ── */}
      <nav className="intro-nav intro-nav--mobile md:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-[#040913]/55 border-b border-white/10 backdrop-blur-xl supports-[backdrop-filter]:bg-[#040913]/40 shadow-[0_8px_30px_rgba(4,9,19,0.28)] flex items-center justify-between px-6">
        <a
          href="https://linkedin.com/in/murilloliveira999"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-white transition-colors duration-200"
          aria-label="LinkedIn"
        >
          <Linkedin size={20} />
        </a>
        <button
          onClick={() => setOpen(!open)}
          className="text-slate-400 hover:text-white transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* ── Mobile: dropdown menu ── */}
      {open && (
        <div className="mobile-menu-sheet md:hidden fixed top-14 left-0 right-0 z-40 bg-[#040913]/70 supports-[backdrop-filter]:bg-[#040913]/50 backdrop-blur-xl border-b border-white/10 shadow-[0_18px_40px_rgba(4,9,19,0.34)] py-4 px-6 flex flex-col gap-1">
          {navLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              onClick={closeMenu}
              className="mobile-menu-item flex items-center gap-3 text-slate-400 hover:text-white transition-colors duration-200 py-3 border-b border-slate-900 text-sm"
            >
              <Icon size={15} />
              {label}
            </a>
          ))}
          <div className="mobile-menu-item flex gap-6 pt-4">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex items-center gap-2 text-slate-600 hover:text-white transition-colors duration-200 text-sm"
              >
                <Icon size={14} />
                {label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── Desktop: top blurred bar ── */}
      <div className="hidden md:flex fixed top-5 left-1/2 -translate-x-1/2 z-50 justify-center w-full pointer-events-none px-6">
        <div className="intro-nav intro-nav--desktop pointer-events-auto">
          <nav
            ref={navRef}
            className="navbar-strip flex items-center gap-3 px-10 py-4 rounded-none"
            onMouseDown={handleDesktopNavMouseDown}
            style={{
              transition: isDraggingNav ? 'none' : 'transform 620ms cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: isDraggingNav ? 'grabbing' : 'grab',
            }}
          >
            {navLinks
              .filter(({ label }) => label !== 'Contact')
              .map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={handleDesktopNavClick}
                  className="navbar-strip__link group inline-flex items-center gap-3 text-slate-400 hover:text-white transition-colors duration-200"
                >
                  <Icon size={20} className="opacity-85 group-hover:opacity-100 transition-opacity duration-200" />
                  <span className="text-[0.92rem] font-semibold tracking-[-0.02em]">{label}</span>
                </a>
              ))}
          </nav>
        </div>
      </div>
    </>
  )
}
