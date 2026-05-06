import { Github } from 'lucide-react'

const projects = [
  {
    title: 'Whey Promotion Bot',
    year: '2026',
    tech: ['Java', 'Spring Boot', 'Spring Data JPA', 'Spring WebFlux', 'Spring Schedule', 'Railway', 'Docker'],
    description: [
    'Built a price monitoring bot that tracks whey protein deals across major Brazilian supplement stores.',
    'Collected prices twice a day from 10+ sources, including Growth Supplements, Dark Lab, ProFit Labs, Soldiers and Black Skull.',
    'Calculated real-time cost-benefit rankings based on price per gram of protein to identify the best deals.',
    'Implemented automatic promotion detection when a product drops 15% or more below its 7-day moving average.',
    'Generated daily rankings with product images, direct purchase links and updated pricing data.',
    'Exposed a REST API to query live rankings, tracked products and active offers.'],
    github: 'https://github.com/devlil0/whey-promotion-bot',
  },
  {
    title: 'Uniform Management System',
    year: '2026',
    tech: ['Java', 'Spring Boot', 'Spring Data JPA', 'PostgreSQL', 'REST API'],
    description: [
      'Centralized the operational flow of a clothing factory (orders, production, stock, delivery), replacing spreadsheets and manual processes.',
      'Modeled business entities (Clients, Uniforms, Orders, Production, Delivery) ensuring end-to-end traceability.',
      'Implemented order status control and production stages (cutting, sewing, printing, finishing, packaging) with operator assignment.',
      'Structured in clean layers (Controller, Service, Repository) applying OOP best practices and REST standards.',
    ],
    github: 'https://github.com/devlil0/uniform-system',
  },
]

export default function Projects() {
  return (
    <section id="work" className="py-32 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-16">
          <p className="text-slate-500 text-xs tracking-[0.3em] uppercase mb-4">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Selected Work</h2>
        </div>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="reveal border border-slate-800 p-8 hover:border-slate-600 transition-colors duration-300"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{project.title}</h3>
                  <p className="text-slate-600 text-xs">{project.year}</p>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-white transition-colors duration-200 mt-1"
                  aria-label="GitHub"
                >
                  <Github size={16} />
                </a>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 border border-slate-800 text-slate-500"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <ul className="space-y-2">
                {project.description.map((item, i) => (
                  <li key={i} className="text-slate-400 text-sm flex gap-3 leading-relaxed">
                    <span className="text-slate-700 shrink-0 mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
