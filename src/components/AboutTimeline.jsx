import { useState } from 'react'
import { ChevronDown, Download, FileText, Zap, GraduationCap, Rocket, Users, Heart, Settings, Infinity as InfinityIcon } from 'lucide-react'

const milestones = [
  {
    year: '2022',
    icon: Zap,
    color: 'text-yellow-400',
    borderColor: 'border-yellow-400/30',
    title: 'The Beginning',
    subtitle: 'IT Technician, Autônomo',
    description:
      'Started as a self-employed IT Technician, diagnosing and repairing computers and smartphones. First direct contact with technology as a profession, building problem-solving discipline that still drives every line of code I write.',
  },
  {
    year: '2023',
    icon: GraduationCap,
    color: 'text-blue-400',
    borderColor: 'border-blue-400/30',
    title: 'Expanding Knowledge',
    subtitle: 'Python Course, SENAI',
    description:
      'Completed a Python course at SENAI, broadening the perspective beyond hardware and discovering the world of programming. The first step toward backend development.',
  },
  {
    year: '2025',
    icon: Rocket,
    color: 'text-green-400',
    borderColor: 'border-green-400/30',
    title: 'Corporate Experience',
    subtitle: 'Burger King & IU Uniformes',
    description:
      'Worked at Burger King developing teamwork and performance-under-pressure skills. At IU Uniformes, direct contact with factory operations, managing production stages, deadlines, and logistics. Directly inspired the Uniform Management System built the following year.',
  },
  {
    year: '2026',
    icon: Users,
    color: 'text-purple-400',
    borderColor: 'border-purple-400/30',
    title: 'Academic Foundation',
    subtitle: 'Systems Analysis & Development, UMC',
    description:
      'Enrolled in the Systems Analysis and Development degree at Universidade de Mogi das Cruzes, formalizing software engineering knowledge and deepening understanding of architecture, data structures, and system design.',
  },
  {
    year: '2026',
    icon: Heart,
    color: 'text-rose-400',
    borderColor: 'border-rose-400/30',
    title: 'Online Courses',
    subtitle: 'Rocketseat & Udemy Certifications',
    description:
      'Completed Rocketseat Java Certification, Rocketseat Spring Boot Certification, and Algorithm and Programming Logic on Udemy, reinforcing backend expertise and foundational computer science concepts with structured, hands-on learning.',
  },
  {
    year: '2026',
    icon: Settings,
    color: 'text-orange-400',
    borderColor: 'border-orange-400/30',
    title: 'Building Real Systems',
    subtitle: 'Uniform Management System',
    description:
      'Developed a complete web system with Java and Spring Boot to centralize all operational flow of a clothing factory, from orders and production stages to stock control and delivery. Replaced manual spreadsheets with a traceable, layered REST application.',
  },
  {
    year: '2026',
    icon: InfinityIcon,
    color: 'text-slate-400',
    borderColor: 'border-slate-400/30',
    title: 'Going Reactive',
    subtitle: 'Whey Promotion Bot',
    repository: 'https://github.com/devlil0/whey-promotion-bot',
    description:
      'Built a price monitoring bot with Java, Spring Boot, Spring WebFlux and Docker to track whey protein deals across major Brazilian supplement stores. It collects prices twice a day, calculates price-per-protein rankings, and detects promotions automatically.',
  },
]

export default function AboutTimeline() {
  const [open, setOpen] = useState(null)

  return (
    <>
      <div className="about-deferred max-w-4xl mx-auto mt-20 md:mt-28">
        <div className="reveal text-center mb-16">
          <p className="section-kicker mb-4">Timeline</p>
          <h2 className="section-title text-4xl mb-4">The Development Journey</h2>
          <p className="text-slate-500 text-lg sm:text-2xl whitespace-normal sm:whitespace-nowrap mx-auto">
            Every stage of my journey has helped to increase my skills.
          </p>
        </div>

        <div>
          {milestones.flatMap((item, i) => {
            const Icon = item.icon
            const isOpen = open === i

            const milestoneRow = (
              <div key={`item-${i}`} className="flex gap-3 sm:gap-10 items-start">
                <div className="flex flex-col items-center w-14 sm:w-20 shrink-0 self-stretch">
                  <div
                    className={`w-14 h-14 sm:w-20 sm:h-20 border ${item.borderColor} bg-black/50 ring-1 ring-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.42)] flex items-center justify-center relative z-10 shrink-0`}
                  >
                    <Icon size={20} className={`${item.color} sm:hidden`} />
                    <Icon size={30} className={`${item.color} hidden sm:block`} />
                  </div>
                  <div className="w-14 sm:w-auto border border-white/10 bg-black/50 px-0 sm:px-3 py-1 mt-2 z-10 shrink-0 text-center">
                    <span
                      className="text-slate-400 text-[0.68rem] sm:text-sm tracking-[0.16em] sm:tracking-[0.22em]"
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400 }}
                    >
                      {item.year}
                    </span>
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="hidden md:block w-px bg-white/10 flex-1 mt-2" />
                  )}
                </div>

                <div className="timeline-card flex-1 min-w-0">
                  <button
                    className="w-full flex items-start justify-between p-4 sm:p-7 text-left"
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <div>
                      <div
                        className="text-white text-[1.3rem] sm:text-[2rem] leading-none"
                        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: '-0.03em' }}
                      >
                        {item.title}
                      </div>
                      <div
                        className="mt-2 text-[1rem] leading-none text-slate-500"
                        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, letterSpacing: '-0.02em' }}
                      >
                        {item.subtitle}
                      </div>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-purple-300/60 transition-transform duration-200 shrink-0 mt-1 ml-4 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-7 sm:pb-7">
                      <p
                        className="text-[1.05rem] leading-[1.6] sm:leading-[1.9] text-slate-400"
                        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, letterSpacing: '-0.02em' }}
                      >
                        {item.description}
                        {item.repository && (
                          <>
                            {' '}
                            Repository available on GitHub.{' '}
                            <a
                              href={item.repository}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-200 hover:text-white underline underline-offset-4 transition-colors duration-200"
                            >
                              Click Here
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )

            if (i < milestones.length - 1) {
              const separator = (
                <div key={`sep-${i}`} className="flex gap-3 sm:gap-10">
                  <div className="flex flex-col items-center w-14 sm:w-20">
                    <div className="hidden md:block w-px bg-white/10 h-8" />
                  </div>
                  <div className="h-8 md:h-0 flex-1" />
                </div>
              )
              return [milestoneRow, separator]
            }

            return [milestoneRow]
          })}
        </div>
      </div>

      <div className="about-deferred curriculum-card resume-download-card reveal tech-panel tech-panel--interactive mt-20 md:mt-28 p-6 sm:p-8">
        <span className="curriculum-border-beam" aria-hidden="true" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="border border-purple-300/25 bg-purple-300/10 p-3 text-purple-100">
              <FileText size={24} />
            </div>
            <div>
              <p className="section-kicker mb-3">Resume</p>
              <h2 className="section-title text-3xl md:text-4xl mb-3">Download my curriculum</h2>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl">
                A concise overview of my backend profile, projects, technical stack, and current professional path.
              </p>
            </div>
          </div>

          <a
            href="/murillo-oliveira-backend-developer-2026-en.pdf"
            download
            className="hero-action inline-flex items-center justify-center gap-2 px-6 py-3 text-sm shrink-0"
          >
            <Download size={15} />
            Download LATEX
          </a>
        </div>
      </div>
    </>
  )
}
