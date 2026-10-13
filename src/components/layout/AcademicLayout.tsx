/**
 * @file AcademicLayout.tsx
 * @description Overall page layout for the academic homepage with sticky header, active-section
 *              highlighting, a responsive mobile menu, and an enriched footer.
 */

import { useEffect, useState, type ReactNode } from 'react'
import { ArrowUp, Mail } from 'lucide-react'

/**
 * @description Props for the AcademicLayout component.
 */
interface AcademicLayoutProps {
  /** Main content of the page. */
  children: ReactNode
}

/**
 * @description Section navigation model.
 */
interface NavItem {
  id: string
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: '首页' },
  { id: 'profile', label: '简介与经历' },
  { id: 'research', label: '研究主线' },
  { id: 'network', label: '论文网络' },
  { id: 'publications', label: '成果列表' },
  { id: 'contact', label: '联系' },
]

/**
 * @description Smoothly scrolls to a section with the given DOM id.
 */
function scrollToSection(sectionId: string): void {
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/**
 * @description Tracks the currently visible section for header highlighting.
 */
function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? 'about')
  useEffect(() => {
    const onScroll = (): void => {
      const pos = window.scrollY + 120
      let current = ids[0] ?? 'about'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= pos) {
          current = id
        }
      }
      // 页面底部时高亮「联系」
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
 * @description Top-level layout: refined academic header + footer and centered content container.
 */
export function AcademicLayout({ children }: AcademicLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const active = useActiveSection(NAV_ITEMS.map((n) => n.id))

  useEffect(() => {
    const onScroll = (): void => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* 顶部学术色条 */}
      <div className="h-1 w-full bg-gradient-to-r from-ink via-accent to-gold" />

      <header className="sticky top-0 z-30 border-b border-paper-line bg-white/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:py-4">
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-start text-left"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              Food Safety · AI Research
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
                  {item.label}
                </button>
              )
            })}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-md border border-paper-line p-2 text-ink-mute md:hidden"
            aria-label="切换导航菜单"
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
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-14 pt-8 lg:pb-20 lg:pt-12">
        {children}
      </main>

      {/* 页脚 */}
      <footer className="border-t border-paper-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-sm">
              <div className="font-serif text-base font-semibold text-ink">
                周子文 · Ziwen Zhou
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-mute">
                上海理工大学健康科学与工程学院 · 食品科学与工程博士研究生。
                研究聚焦食品安全风险评估、预测微生物学与 AI 建模，构建可解释、可验证、
                可部署的智能预警方法。
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
                  页面导航
                </div>
                <ul className="space-y-1.5">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(item.id)}
                        className="text-ink-mute transition hover:text-accent"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
                  学术链接
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
            © {new Date().getFullYear()} 周子文 Ziwen Zhou · 食品安全风险评估 ·
            预测微生物学 · AI 建模
          </div>
        </div>
      </footer>

      {/* 回到顶部 */}
      {showTop && (
        <button
          type="button"
          onClick={goTop}
          aria-label="回到顶部"
          className="fixed bottom-6 right-6 z-30 rounded-full border border-paper-line bg-white p-3 text-ink-mute shadow-lg transition hover:border-accent hover:text-accent"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  )
}
