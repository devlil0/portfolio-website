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
    skills: ['Portuguese — Native', 'English — Intermediate'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-8 border-t border-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-16">
          <p className="text-slate-500 text-xs tracking-[0.3em] uppercase mb-4">Expertise</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Technical Skills</h2>
        </div>

        <div className="space-y-8">
          {skillGroups.map(({ label, skills }, i) => (
            <div key={`${label}-${i}`} className="reveal flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="w-28 shrink-0 text-slate-600 text-xs uppercase tracking-widest pt-2">
                {label}
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 border border-slate-800 text-slate-300 text-sm hover:border-slate-500 hover:text-white transition-all duration-200 cursor-default"
                  >
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
