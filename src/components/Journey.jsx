import { useState } from 'react'
import { ChevronDown, Zap, GraduationCap, Rocket, Users, Heart, Settings, Infinity as InfinityIcon } from 'lucide-react'

const milestones = [
  {
    year: '2022',
    icon: Zap,
    color: 'text-yellow-400',
    borderColor: 'border-yellow-400/30',
    title: 'The Beginning',
    subtitle: 'IT Technician — Autônomo',
    description:
      'Started as a self-employed IT Technician, diagnosing and repairing computers and smartphones. First direct contact with technology as a profession, building problem-solving discipline that still drives every line of code I write.',
  },
  {
    year: '2023',
    icon: GraduationCap,
    color: 'text-blue-400',
    borderColor: 'border-blue-400/30',
    title: 'Expanding Knowledge',
    subtitle: 'Python Course — SENAI',
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
      'Worked at Burger King developing teamwork and performance-under-pressure skills. At IU Uniformes, direct contact with factory operations — managing production stages, deadlines, and logistics — directly inspired the Uniform Management System built the following year.',
  },
  {
    year: '2026',
    icon: Users,
    color: 'text-purple-400',
    borderColor: 'border-purple-400/30',
    title: 'Academic Foundation',
    subtitle: 'Systems Analysis & Development — UMC',
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
      'Completed Rocketseat Java Certification, Rocketseat Spring Boot Certification, and Algorithm and Programming Logic on Udemy — reinforcing backend expertise and foundational computer science concepts with structured, hands-on learning.',
  },
  {
    year: '2026',
    icon: Settings,
    color: 'text-orange-400',
    borderColor: 'border-orange-400/30',
    title: 'Building Real Systems',
    subtitle: 'Uniform Management System',
    description:
      'Developed a complete web system with Java and Spring Boot to centralize all operational flow of a clothing factory — from orders and production stages to stock control and delivery. Replaced manual spreadsheets with a traceable, layered REST application.',
  },
  {
    year: '2026',
    icon: InfinityIcon,
    color: 'text-slate-400',
    borderColor: 'border-slate-400/30',
    title: 'Going Reactive',
    subtitle: 'Free Fire Telegram Bot',
    description:
      'Built a reactive Telegram bot with Spring WebFlux and Docker, integrating external APIs to query player profiles and ban status via non-blocking HTTP calls. Containerized for portable deployment — current chapter.',
  },
]

export default function Journey() {
  const [open, setOpen] = useState(null)

  return (
    <section id="journey" className="py-32 px-4 sm:px-8 border-t border-slate-900">
      <div className="max-w-4xl mx-auto">
        <div className="reveal text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">journey</h2>
          <p className="text-slate-500 text-lg sm:text-2xl whitespace-normal sm:whitespace-nowrap mx-auto">
            Every stage of my journey has helped to increase my skills.
          </p>
        </div>

        <div>
          {milestones.flatMap((item, i) => {
            const Icon = item.icon
            const isOpen = open === i

            const milestoneRow = (
              <div key={`item-${i}`} className="flex gap-4 sm:gap-10 items-start">
                <div className="flex flex-col items-center w-12 sm:w-20 shrink-0 self-stretch">
                  <div
                    className={`w-12 h-12 sm:w-20 sm:h-20 rounded-full border ${item.borderColor} bg-[#02050d] ring-1 ring-white/5 shadow-[0_0_0_1px_rgba(15,23,42,0.45),0_12px_30px_rgba(2,6,23,0.4)] flex items-center justify-center relative z-10 shrink-0`}
                  >
                    <Icon size={20} className={`${item.color} sm:hidden`} />
                    <Icon size={30} className={`${item.color} hidden sm:block`} />
                  </div>
                  <div className="border border-slate-700 bg-[#040913] px-3 py-1 mt-2 z-10 rounded-md shrink-0">
                    <span
                      className="text-slate-400 text-xs sm:text-sm tracking-[0.22em]"
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400 }}
                    >
                      {item.year}
                    </span>
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="hidden md:block w-px bg-slate-700 flex-1 mt-2" />
                  )}
                </div>

                <div className="flex-1 bg-[#091427] rounded-xl hover:bg-[#0d1829] transition-colors duration-200">
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
                      className={`text-slate-600 transition-transform duration-200 shrink-0 mt-1 ml-4 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-7 sm:pb-7">
                      <p
                        className="text-[1.05rem] leading-[1.6] sm:leading-[1.9] text-slate-400"
                        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, letterSpacing: '-0.02em' }}
                      >
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )

            if (i < milestones.length - 1) {
              const separator = (
                <div key={`sep-${i}`} className="flex gap-4 sm:gap-10">
                  <div className="flex flex-col items-center w-12 sm:w-20">
                    <div className="hidden md:block w-px bg-slate-700 h-8" />
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
    </section>
  )
}
