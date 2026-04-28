import { Mail, Github, Linkedin } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-8 border-t border-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-slate-500 text-xs tracking-[0.3em] uppercase mb-6">Contact</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Connect</h2>
        <p className="text-slate-400 text-sm md:text-base mb-16 max-w-lg mx-auto leading-relaxed">
          Open to new opportunities, collaborations, or just a good conversation about tech.
          Reach out through any of the channels below.
        </p>

        <div className="flex flex-col items-center gap-8">
          <a
            href="mailto:devmurilloliveira@gmail.com"
            className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-200 text-base"
          >
            <Mail size={18} className="text-slate-500" />
            devmurilloliveira@gmail.com
          </a>

          <div className="flex gap-10">
            <a
              href="https://github.com/devlil0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors duration-200 text-sm"
            >
              <Github size={15} />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/murilloliveira999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors duration-200 text-sm"
            >
              <Linkedin size={15} />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-slate-900">
          <p className="text-slate-800 text-xs">
            © 2026 Murillo Oliveira — Built with React + Vite + Tailwind CSS
          </p>
        </div>
      </div>
    </section>
  )
}
