import { memo, useState } from 'react'
import { Briefcase, User, Terminal, MessageCircle, Github, Linkedin, Menu, X } from 'lucide-react'

const navLinks = [
  { icon: User,      label: 'About',   sectionId: 'about',   path: '/' },
  { icon: Briefcase, label: 'Work',    sectionId: 'work',    path: '/selected-work' },
  { icon: Terminal,  label: 'Skills',  sectionId: 'skills',  path: '/skills' },
  { icon: MessageCircle, label: 'Connect With Me', sectionId: 'contact', path: '/contact' },
]

const socialLinks = [
  { icon: Github,   label: 'GitHub',   href: 'https://github.com/devlil0' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/murilloliveira999' },
]

function Navbar({ activeSection, onNavigate }) {
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  const handleDesktopNavClick = (event, sectionId, path) => {
    event.preventDefault()
    onNavigate(sectionId, path)
  }

  return (
    <>
      <nav className="site-nav intro-nav intro-nav--mobile md:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6">
        <a
          href="https://linkedin.com/in/murilloliveira999"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-purple-100 transition-colors duration-200"
          aria-label="LinkedIn"
        >
          <Linkedin size={20} />
        </a>
        <button
          onClick={() => setOpen(!open)}
          className="text-slate-400 hover:text-purple-100 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="site-nav-menu mobile-menu-sheet md:hidden fixed top-14 left-0 right-0 z-40 py-4 px-6 flex flex-col gap-1">
          {navLinks.map(({ icon: Icon, label, sectionId, path }) => (
            <a
              key={label}
              href={path}
              onClick={(e) => {
                e.preventDefault()
                closeMenu()
                onNavigate(sectionId, path)
              }}
              className={`mobile-menu-item flex items-center gap-3 transition-colors duration-200 py-3 border-b border-white/10 text-sm ${
                activeSection === sectionId ? 'text-purple-100' : 'text-slate-400 hover:text-purple-100'
              }`}
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
                className="flex items-center gap-2 text-slate-500 hover:text-purple-100 transition-colors duration-200 text-sm"
              >
                <Icon size={14} />
                {label}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="site-nav intro-nav intro-nav--desktop hidden md:flex fixed top-0 left-0 right-0 z-50 h-16">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-8">
          <nav
            className="navbar-strip relative flex w-full items-center justify-center gap-6 lg:gap-9"
          >
            {navLinks
              .map(({ icon: Icon, label, sectionId, path }) => (
                <a
                  key={label}
                  href={path}
                  onClick={(e) => handleDesktopNavClick(e, sectionId, path)}
                  className={`navbar-strip__link group inline-flex items-center gap-2.5 transition-colors duration-200 ${
                    sectionId === 'contact' ? 'fixed left-6' : ''
                  } ${
                    activeSection === sectionId ? 'text-purple-100' : 'text-slate-400 hover:text-purple-100'
                  }`}
                >
                  <Icon size={17} className="opacity-85 group-hover:opacity-100 transition-opacity duration-200" />
                  <span className="text-[0.82rem] font-semibold tracking-[-0.01em]">{label}</span>
                </a>
              ))}
          </nav>
        </div>
      </div>
    </>
  )
}

export default memo(Navbar)
