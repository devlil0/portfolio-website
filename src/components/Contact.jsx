import { Mail, Github, Linkedin } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="section-shell border-t border-white/10">
      <div className="reveal tech-panel max-w-4xl mx-auto text-center p-6 sm:p-10">
        <p className="section-kicker mb-6">Contact</p>
        <h2 className="section-title text-4xl md:text-5xl mb-6">Let's connect</h2>
        <p className="text-slate-400 text-sm md:text-base mb-16 max-w-lg mx-auto leading-relaxed">
          Open to new opportunities, collaborations, or just a good conversation about tech.
          Reach out through any of the channels below.
        </p>

        <div className="flex flex-col items-center gap-8">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=devmurilloliveira@gmail.com&su=Portfolio%20contact&body=Hi%20Murillo%2C%0A%0A"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-action flex items-center gap-3 px-5 py-3 text-slate-300 hover:text-white transition-colors duration-200 text-sm sm:text-base"
          >
            <Mail size={18} className="text-purple-200" />
            Send message
          </a>

          <div className="flex gap-4 sm:gap-6">
            <a
              href="https://github.com/devlil0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-500 hover:text-purple-100 transition-colors duration-200 text-sm"
            >
              <Github size={15} />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/murilloliveira999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-500 hover:text-purple-100 transition-colors duration-200 text-sm"
            >
              <Linkedin size={15} />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/10">
          <p className="text-slate-700 text-xs">
            © 2026 Murillo Oliveira
          </p>
        </div>
      </div>
    </section>
  )
}
