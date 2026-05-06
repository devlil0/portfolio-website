const stats = [
  { value: '4+', label: 'Years in tech' },
  { value: '2+', label: 'Projects delivered' },
  { value: '∞', label: 'Learning journey' },
]

export default function About() {
  return (
    <section id="about" className="py-32 px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className="reveal flex justify-center md:justify-start">
          <div className="relative w-full max-w-sm group">
            <img
              src="/profile.png"
              alt="Murillo Oliveira"
              width="941"
              height="1672"
              loading="lazy"
              decoding="async"
              className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-500 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060e1c]/20 to-transparent rounded-sm" />
          </div>
        </div>

        <div className="reveal" style={{ transitionDelay: '0.12s' }}>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Murillo Oliveira
          </h2>
          <h3 className="about-gradient-word text-4xl md:text-5xl font-bold leading-tight mt-1">
            Backend<br />Developer
          </h3>
          <div className="w-8 h-px bg-slate-600 mt-5 mb-8" />

          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-12">
            Every line of code tells a story, and mine began with a curiosity about how
            technology works under the hood. As a child, I used to take apart phones and
            computers trying to understand what was beyond the surface, while my interest
            in games, music, and technology kept growing.
            <br /><br />
            Today, that curiosity has turned into purpose: I study Systems Analysis and
            Development and found in backend development with Java and Spring Boot a way to build real
            solutions. That's how I created my first system after noticing, at work, the
            need to organize manual processes, turning an everyday problem into a practical
            application.
            <br /><br />
            I continue to grow with focus, discipline, and a constant desire to learn,
            building my path in backend development.
          </p>

          <div className="grid grid-cols-3 gap-6">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{value}</div>
                <div className="text-slate-500 text-xs leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
