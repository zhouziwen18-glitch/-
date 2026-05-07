/**
 * @file AcademicLayout.tsx
 * @description Overall page layout for the academic homepage with sticky header, centered content, and footer.
 */

import type { ReactNode } from 'react'

/**
 * @description Props for the AcademicLayout component.
 */
interface AcademicLayoutProps {
  /** Main content of the page. */
  children: ReactNode
}

/**
 * @description Smoothly scrolls to a section with the given DOM id.
 * @param sectionId Target DOM element id.
 */
function scrollToSection(sectionId: string): void {
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/**
 * @description Top-level layout: light, technology-inspired header + footer and centered content container.
 */
export function AcademicLayout({ children }: AcademicLayoutProps) {
  const navItems: { id: string; label: string }[] = [
    { id: 'about', label: '简介' },
    { id: 'research', label: '研究方向' },
    { id: 'publications', label: '论文成果' },
    { id: 'contact', label: '联系' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:py-4">
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-[0.18em] text-sky-600">
              ACADEMIC PROFILE
            </span>
            <span className="text-lg font-semibold text-slate-900 lg:text-xl">
              周子文 · Ziwen Zhou
            </span>
          </div>
          <nav className="hidden gap-3 text-sm font-medium text-slate-700 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="rounded-full border border-transparent px-3 py-1.5 text-xs tracking-wide text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-12 pt-8 lg:pb-16 lg:pt-12">
        {children}
      </main>

      <footer className="border-t border-slate-200 bg-white/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} 周子文 Ziwen Zhou. All rights reserved.
          </span>
          <span className="text-slate-400">
            本页内容由本人维护，建议通过邮箱联系获取最新简历与完整论文列表。
          </span>
        </div>
      </footer>
    </div>
  )
}
