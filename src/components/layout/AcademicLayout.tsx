/**
 * @file AcademicLayout.tsx
 * @description Page layout with sticky header (active-section highlight + language toggle + mobile menu),
 *              enriched footer, and a back-to-top button. Uses an AI × Food-Safety themed accent bar.
 */

import { useEffect, useState, type ReactNode } from 'react'
import { ArrowUp, Globe, Mail } from 'lucide-react'
import { useI18n, type Lang } from '../../i18n'

interface AcademicLayoutProps {
  children: ReactNode
}

interface NavItem {
  id: string
  labelKey: string
}

const NAV_ITEMS: NavItem[] = [
  { id: 'about', labelKey: 'nav.home' },
  { id: 'profile', labelKey: 'nav.profile' },
  { id: 'research', labelKey: 'nav.research' },
  { id: 'network', labelKey: 'nav.network' },
  { id: 'publications', labelKey: 'nav.publications' },
  { id: 'contact', labelKey: 'nav.contact' },
]

function scrollToSection(sectionId: string): void {
  const el = document.getElementById(sectionId)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? 'about')
  useEffect(() => {
    const onScroll = (): void => {
      const pos = window.scrollY + 120
      let current = ids[0] ?? 'about'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= pos) current = id
      }
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8
      ) {
        current = 'contact'
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])
  return active
}

/**
 * @description Bilingual toggle pill shown in the header.
 */
function LangToggle() {
  const { lang, setLang, t } = useI18n()
  const options: Lang[] = ['zh', 'en']
  return (
    <div
      role="group"
      aria-label={t('nav.toggle')}
      className="flex items-center rounded-full border border-paper-line bg-slate-100 p-0.5 text-[11px] font-medium"
    >
      <Globe size={12} className="ml-1.5 text-ink-mute" />
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => setLang(opt)}
          className={[
            'rounded-full px-2 py-0.5 transition',
            lang === opt
              ? 'bg-accent text-white shadow-sm'
              : 'text-ink-mute hover:text-ink',
          ].join(' ')}
        >
          {opt === 'zh' ? '中文' : 'EN'}
        </button>
      ))}
    </div>
  )
}

export function AcademicLayout({ children }: AcademicLayoutProps) {
  const { t } = useI18n()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const active = useActiveSection(NAV_ITEMS.map((n) => n.id))

  useEffect(() => {
    const onScroll = (): void => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTop = (): void => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* AI × Food themed accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-ink via-teal-500 to-amber-500" />

      <header className="sticky top-0 z-30 border-b border-paper-line bg-white/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 lg:py-4">
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-start text-left"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              {t('nav.brand.tagline')}
            </span>
            <span className="font-serif text-lg font-semibold text-ink lg:text-xl">
              周子文 <span className="font-normal text-ink-mute">· Ziwen Zhou</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 text-sm md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={[
                    'rounded-md px-3 py-1.5 text-[13px] tracking-wide transition',
                    isActive
                      ? 'bg-accent-pale font-semibold text-accent'
                      : 'text-ink-mute hover:bg-slate-100 hover:text-ink',
                  ].join(' ')}
                >
                  {t(item.labelKey)}
                </button>
              )
            })}
            <div className="ml-2">
              <LangToggle />
            </div>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <LangToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-md border border-paper-line p-2 text-ink-mute"
              aria-label={t('nav.toggle')}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-paper-line bg-white px-4 py-3 md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    scrollToSection(item.id)
                    setMenuOpen(false)
                  }}
                  className={[
                    'rounded-md px-3 py-2 text-left text-sm transition',
                    active === item.id
                      ? 'bg-accent-pale font-semibold text-accent'
                      : 'text-ink-mute hover:bg-slate-100',
                  ].join(' ')}
                >
                  {t(item.labelKey)}
                </button>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-14 pt-8 lg:pb-20 lg:pt-12">
        {children}
      </main>

      <footer className="border-t border-paper-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-sm">
              <div className="font-serif text-base font-semibold text-ink">
                周子文 · Ziwen Zhou
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-mute">
                {t('nav.foot.bio')}
              </p>
              <a
                href="mailto:zzw1174600720@163.com"
                className="mt-3 inline-flex items-center gap-1.5 text-[13px] text-accent hover:underline"
              >
                <Mail size={14} />
                zzw1174600720@163.com
              </a>
            </div>

            <div className="flex gap-10 text-[13px]">
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
                  {t('nav.foot.nav')}
                </div>
                <ul className="space-y-1.5">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(item.id)}
                        className="text-ink-mute transition hover:text-accent"
                      >
                        {t(item.labelKey)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
                  {t('nav.foot.links')}
                </div>
                <ul className="space-y-1.5">
                  <li>
                    <a
                      href="https://orcid.org/0009-0000-3319-7303"
                      target="_blank"
                      rel="noreferrer"
                      className="text-ink-mute transition hover:text-accent"
                    >
                      ORCID
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/zhouziwen18-glitch"
                      target="_blank"
                      rel="noreferrer"
                      className="text-ink-mute transition hover:text-accent"
                    >
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-paper-line pt-4 text-center text-xs text-ink-faint">
            © {new Date().getFullYear()} 周子文 Ziwen Zhou · {t('nav.foot.copyright')}
          </div>
        </div>
      </footer>

      {showTop && (
        <button
          type="button"
          onClick={goTop}
          aria-label={t('nav.foot.top')}
          className="fixed bottom-6 right-6 z-30 rounded-full border border-paper-line bg-white p-3 text-ink-mute shadow-lg transition hover:border-accent hover:text-accent"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  )
}
