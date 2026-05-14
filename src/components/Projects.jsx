import { useEffect, useMemo, useState } from 'react'
import { AlertCircle, CalendarDays, ExternalLink, GitCommit, Github, GitFork, Loader2, Package, Star } from 'lucide-react'

const GITHUB_USER = 'devlil0'
const GITHUB_PROFILE_MARKDOWN_URL = 'https://r.jina.ai/http://github.com/devlil0'
const GITHUB_REPOS_MARKDOWN_URL = 'https://r.jina.ai/http://github.com/devlil0?tab=repositories'

const fallbackRepos = [
  {
    id: 'whey-promotion-bot',
    name: 'whey-promotion-bot',
    description: 'Price monitoring bot that tracks whey protein deals across major Brazilian supplement stores.',
    html_url: 'https://github.com/devlil0/whey-promotion-bot',
    language: 'Java',
    stargazers_count: 0,
    forks_count: 0,
    created_at: '2026-01-01T00:00:00Z',
    pushed_at: '2026-01-01T00:00:00Z',
    topics: ['java', 'spring-boot', 'docker'],
    commitCount: null,
  },
  {
    id: 'uniform-system',
    name: 'uniform-system',
    description: 'REST application for managing orders, production stages, stock and deliveries in a clothing factory.',
    html_url: 'https://github.com/devlil0/uniform-system',
    language: 'Java',
    stargazers_count: 0,
    forks_count: 0,
    created_at: '2026-01-01T00:00:00Z',
    pushed_at: '2026-01-01T00:00:00Z',
    topics: ['java', 'spring-boot', 'postgresql'],
    commitCount: null,
  },
]

const languageColors = {
  Java: '#f87171',
  JavaScript: '#facc15',
  TypeScript: '#60a5fa',
  Python: '#34d399',
  HTML: '#fb923c',
  CSS: '#a78bfa',
}

let githubDataCache = null
let githubDataPromise = null

const KNOWN_LANGUAGES = ['JavaScript', 'TypeScript', 'Java', 'Python', 'HTML', 'CSS', 'Kotlin', 'Go', 'Shell', 'C++']

const selectedProjects = [
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
      'Exposed a REST API to query live rankings, tracked products and active offers.',
    ],
    github: 'https://github.com/devlil0/whey-promotion-bot',
  },
  {
    title: 'Uniform Management System',
    year: '2026',
    tech: ['Java', 'Spring Boot', 'Spring Data JPA', 'PostgreSQL', 'REST API'],
    description: [
      'Centralized the operational flow of a clothing factory, replacing spreadsheets and manual processes.',
      'Modeled business entities ensuring end-to-end traceability.',
      'Implemented order status control and production stages with operator assignment.',
      'Structured in clean layers applying OOP best practices and REST standards.',
    ],
    github: 'https://github.com/devlil0/uniform-system',
  },
]

function formatDate(value) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

function formatRepoName(name) {
  return name
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function getRepoPreviewUrl(repoName) {
  return `https://opengraph.githubassets.com/devlil0-${repoName}/${GITHUB_USER}/${repoName}`
}

function handlePreviewError(event) {
  event.currentTarget.closest('.repo-card__visual')?.classList.add('repo-card__visual--fallback')
}

function parseNumericMatch(text, regex) {
  const match = text.match(regex)
  return match ? Number(match[1]) : null
}

function parseProfileMarkdown(markdown) {
  const totalRepos = parseNumericMatch(markdown, /Repositories\s+(\d+)/i)
  const stars = parseNumericMatch(markdown, /Stars\s+(\d+)/i)
  const contributionsLastYear = parseNumericMatch(markdown, /(\d+)\s+contributions in the last year/i)
  const activeYears = new Set((markdown.match(/year-link-(\d{4})/g) || []).map((yearLink) => yearLink.replace(/\D/g, ''))).size || 1

  return {
    totalRepos: totalRepos ?? 0,
    stars: stars ?? 0,
    contributionsLastYear: contributionsLastYear ?? 0,
    activeYears,
  }
}

function parseRepoMarkdown(markdown) {
  const repoLines = markdown.split(/\r?\n/).filter((line) => line.startsWith('*   ### ['))

  return repoLines.map((line) => {
    const nameMatch = line.match(/\[([^\]]+)\]\(http:\/\/github\.com\/devlil0\/([^)]+)\)/)
    const updatedMatch = line.match(/Updated ([A-Za-z]{3}\s+\d{1,2},\s+\d{4})/)
    const starMatch = line.match(/\[([0-9]+)\]\(http:\/\/github\.com\/devlil0\/[^)]+\/stargazers\)/)
    const topics = [...line.matchAll(/\[([^\]]+)\]\(http:\/\/github\.com\/topics\/[^)]+\)/g)].map((match) => match[1]).slice(0, 3)
    const language = KNOWN_LANGUAGES.find((lang) => new RegExp(`\\b${lang.replace(/\+/g, '\\+')}(?:\\b|\\[)`).test(line)) || null

    let description = line
      .replace(/^\*\s+### \[[^\]]+\]\(http:\/\/github\.com\/devlil0\/[^)]+\)Public\s*/, '')
      .replace(/\[([^\]]+)\]\(http:\/\/github\.com\/topics\/[^)]+\)/g, '')
      .replace(/\b(JavaScript|TypeScript|Java|Python|HTML|CSS|Kotlin|Go|Shell|C\+\+)(?:\[[0-9]+\]\(http:\/\/github\.com\/devlil0\/[^)]+\/stargazers\))?/g, '')
      .replace(/\s+Updated\s+[A-Za-z]{3}\s+\d{1,2},\s+\d{4}\s*$/i, '')
      .replace(/\s+/g, ' ')
      .trim()

    if (description === 'Public') description = ''
    description = description.replace(/^Public\s*/i, '').trim()

    return {
      id: nameMatch?.[2] || nameMatch?.[1] || line,
      name: nameMatch?.[2] || nameMatch?.[1] || line,
      html_url: nameMatch ? `https://github.com/${GITHUB_USER}/${nameMatch[2]}` : `https://github.com/${GITHUB_USER}`,
      description,
      language,
      stargazers_count: starMatch ? Number(starMatch[1]) : 0,
      forks_count: 0,
      created_at: updatedMatch ? new Date(updatedMatch[1]).toISOString() : new Date().toISOString(),
      pushed_at: updatedMatch ? new Date(updatedMatch[1]).toISOString() : new Date().toISOString(),
      topics,
      commitCount: null,
    }
  })
}

async function fetchMarkdown(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Failed to fetch ${url}`)
  return response.text()
}

function loadGitHubData() {
  if (githubDataCache) return Promise.resolve(githubDataCache)
  if (githubDataPromise) return githubDataPromise

  githubDataPromise = (async () => {
    try {
      const [profileMarkdown, reposMarkdown] = await Promise.all([
        fetchMarkdown(GITHUB_PROFILE_MARKDOWN_URL),
        fetchMarkdown(GITHUB_REPOS_MARKDOWN_URL),
      ])

      const profileData = parseProfileMarkdown(profileMarkdown)
      const repos = parseRepoMarkdown(reposMarkdown)

      const payload = {
        profile: profileData,
        repos,
      }

      githubDataCache = payload
      return payload
    } catch (error) {
      githubDataPromise = null
      throw error
    }
  })()

  return githubDataPromise
}

export default function Projects() {
  const [repos, setRepos] = useState([])
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadGitHubRepos() {
      try {
        setLoading(true)
        setError('')
        const data = await loadGitHubData()

        if (!ignore) {
          setProfile(data.profile)
          setRepos(data.repos)
        }
      } catch (requestError) {
        if (!ignore) {
          setError('Unable to load live GitHub data right now.')
          setProfile(null)
          setRepos(fallbackRepos)
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadGitHubRepos()

    return () => {
      ignore = true
    }
  }, [])

  const overview = useMemo(() => {
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
    const commitCounts = repos.map((repo) => repo.commitCount).filter((count) => Number.isFinite(count))
    const totalCommits = commitCounts.reduce((sum, count) => sum + count, 0)
    const yearsActive = profile?.activeYears ?? 1

    return [
      { icon: Package, label: 'Total projects', value: profile?.totalRepos ?? repos.length },
      { icon: Star, label: 'GitHub stars', value: profile?.stars ?? totalStars },
      { icon: GitCommit, label: 'Commits', value: commitCounts.length ? totalCommits : profile?.contributionsLastYear ?? 'Live' },
      { icon: CalendarDays, label: 'Years active', value: yearsActive },
    ]
  }, [profile, repos])

  return (
    <section id="work" className="section-shell">
      <div className="section-inner">
        <div className="reveal mb-10">
          <p className="section-kicker mb-4">RIGHT NOW</p>
          <h2 className="section-title text-4xl md:text-5xl">Live Statistics</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {overview.map(({ icon: Icon, label, value }) => (
            <div key={label} className="tech-panel p-4 sm:p-5">
              <div className="flex items-center justify-between mb-5">
                <span className="terminal-label text-[0.62rem]">{label}</span>
                <Icon size={16} className="text-purple-200" />
              </div>
              <div className="text-3xl sm:text-4xl font-semibold text-white tracking-[-0.04em]">{value}</div>
            </div>
          ))}
        </div>

        <div className="mb-10">
          <div className="reveal workspace-feature-card tech-panel tech-panel--interactive overflow-hidden">
            <div className="workspace-feature-card__copy">
              <h3 className="workspace-feature-card__title">
                <span>My</span>
                <span>Dev</span>
                <span>Space.</span>
                <span>;x</span>
              </h3>
              <p className="workspace-feature-card__tagline">
                Projects built with purpose.
              </p>
              <p className="workspace-feature-card__caption">
                A focused workspace where I turn ideas into APIs, automations, and backend solutions with Java and Spring Boot.
              </p>
            </div>
            <img
              src="/spacex-optimized.jpg"
              alt="Development workspace"
              width="1000"
              height="1333"
              loading="lazy"
              decoding="async"
              className="work-space-image"
            />
          </div>
        </div>

        <div className="mb-10">
          <div className="mb-5">
            <p className="section-kicker mb-2">PROJECTS</p>
            <h3 className="section-title text-3xl md:text-4xl">Selected Work</h3>
          </div>

          <div className="space-y-6">
            {selectedProjects.map((project, i) => (
              <div
                key={project.title}
                className="tech-panel tech-panel--interactive p-6 sm:p-8"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-1 tracking-[-0.02em]">{project.title}</h4>
                    <p className="terminal-label text-[0.68rem]">{project.year}</p>
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-purple-100 transition-colors duration-200 mt-1"
                    aria-label={`${project.title} on GitHub`}
                  >
                    <Github size={18} />
                  </a>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span key={tech} className="project-chip text-xs px-3 py-1">
                      {tech}
                    </span>
                  ))}
                </div>

                <ul className="space-y-2">
                  {project.description.map((item) => (
                    <li key={item} className="text-slate-400 text-sm flex gap-3 leading-relaxed">
                      <span className="text-purple-300/60 shrink-0 mt-0.5">/</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <p className="section-kicker mb-2">Live Repositories &gt;_</p>
            <h3 className="section-title text-3xl md:text-4xl">Portfolio Overview</h3>
          </div>
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-action hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm"
          >
            <Github size={15} />
            GitHub
          </a>
        </div>

        {loading && (
          <div className="tech-panel p-6 flex items-center gap-3 text-slate-400">
            <Loader2 size={18} className="animate-spin text-purple-200" />
            Loading live repositories...
          </div>
        )}

        {!loading && error && (
          <div className="tech-panel p-4 mb-5 flex items-center gap-3 text-slate-400">
            <AlertCircle size={17} className="text-purple-200" />
            {error}
          </div>
        )}

        {!loading && (
          <div className="repo-market-grid">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-card tech-panel tech-panel--interactive"
              >
                <div className="repo-card__visual">
                  <img
                    src={getRepoPreviewUrl(repo.name)}
                    alt={`${formatRepoName(repo.name)} preview`}
                    loading="lazy"
                    decoding="async"
                    onError={handlePreviewError}
                  />
                  <Github size={38} className="repo-card__fallback-icon text-purple-100" />
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h4 className="text-lg font-semibold text-white leading-tight tracking-[-0.03em]">
                      {formatRepoName(repo.name)}
                    </h4>
                    <ExternalLink size={16} className="text-slate-500 shrink-0 mt-1" />
                  </div>

                  <p className="repo-card__description text-sm text-slate-400 leading-relaxed mb-5">
                    {repo.description || 'Public GitHub repository with source code and development history.'}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {repo.language && (
                      <span className="project-chip inline-flex items-center gap-2 text-xs px-3 py-1">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: languageColors[repo.language] || '#c084fc' }}
                        />
                        {repo.language}
                      </span>
                    )}
                    {(repo.topics || []).slice(0, 2).map((topic) => (
                      <span key={topic} className="project-chip text-xs px-3 py-1">
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="repo-card__meta">
                    <span className="inline-flex items-center gap-1.5">
                      <Star size={14} />
                      {repo.stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <GitFork size={14} />
                      {repo.forks_count}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <GitCommit size={14} />
                      {repo.commitCount ?? 'Live'}
                    </span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10 text-xs text-slate-500">
                    Updated {formatDate(repo.pushed_at)}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
