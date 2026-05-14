import { CloudCog, ShieldCheck } from 'lucide-react'

const skillGroups = [
  {
    label: 'Languages',
    skills: ['Java', 'Python', 'SQL'],
  },
  {
    label: 'Frameworks',
    skills: ['Spring Boot', 'Spring Data JPA', 'Spring WebFlux'],
  },
  {
    label: 'Tools',
    skills: ['Git', 'GitHub', 'Docker', 'Maven', 'IntelliJ IDEA', 'Postman'],
  },
  {
    label: 'Databases',
    skills: ['PostgreSQL'],
  },
  {
    label: 'Concepts',
    skills: ['REST API', 'Object-Oriented Design', 'MVC Architecture', 'Dependency Injection', 'Reactive Programming'],
  },
  {
    label: 'Languages',
    skills: ['Portuguese (Native)', 'English (Intermediate)'],
  },
]

const growthCards = [
  {
    icon: ShieldCheck,
    label: 'Currently Improving',
    title: 'Security & Authentication',
    description: 'Improving backend security skills with authentication, authorization and secure API practices.',
    skills: ['Spring Security', 'JWT', 'Auth Flow'],
  },
  {
    icon: CloudCog,
    label: 'Next Focus',
    title: 'DevOps & Frontend',
    description: 'Expanding my DevOps and frontend skills to build applications that are easier to deploy, automate and maintain.',
    skills: ['AWS', 'CI/CD', 'React', 'TypeScript', 'Tailwind CSS'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section-shell border-t border-white/10">
      <div className="section-inner">
        <div className="reveal mb-16">
          <p className="section-kicker mb-4">Expertise</p>
          <h2 className="section-title text-4xl md:text-5xl">Technical Skills</h2>
        </div>

        <div className="tech-panel p-5 sm:p-8 space-y-7">
          {skillGroups.map(({ label, skills }, i) => (
            <div key={`${label}-${i}`} className="reveal flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="w-28 shrink-0 terminal-label text-[0.68rem] pt-2">
                {label}
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-chip px-4 py-2 text-slate-300 text-sm cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-5">
          {growthCards.map(({ icon: Icon, label, title, description, skills }, i) => (
            <div key={title} className="learning-card reveal tech-panel tech-panel--interactive" style={{ transitionDelay: `${0.14 + i * 0.08}s` }}>
              <div className="learning-card__icon" aria-hidden="true">
                <Icon size={22} />
              </div>
              <div>
                <p className="terminal-label text-[0.62rem] mb-3">{label}</p>
                <h3>{title}</h3>
                <p className="learning-card__description">
                  {description}
                </p>
              </div>
              <div className="learning-card__tags">
                {skills.map((skill) => (
                  <span key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
