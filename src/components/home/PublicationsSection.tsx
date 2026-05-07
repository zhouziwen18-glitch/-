/**
 * @file PublicationsSection.tsx
 * @description Displays representative publications and full list with type filters and keyword search.
 */

import { useMemo, useState, type ChangeEvent } from 'react'
import { SectionHeader } from './SectionHeader'
import {
  type Publication,
  type PublicationType,
  publications,
} from '../../data/publications'

/**
 * @description Small rounded tag pill.
 */
function TagPill({ label, variant = 'default' }: { label: string; variant?: 'default' | 'sci' | 'core' | 'impact' }) {
  const variants = {
    default: 'bg-sky-50 text-sky-700 ring-sky-100',
    sci: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    core: 'bg-amber-50 text-amber-700 ring-amber-100',
    impact: 'bg-purple-50 text-purple-700 ring-purple-100',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ${variants[variant]}`}>
      {label}
    </span>
  )
}

/**
 * @description Single publication item row.
 */
function PublicationItem({ publication }: { publication: Publication }) {
  const { title, authors, venue, year, link, pdfPath, tags, highlight, journalCategory } = publication
  
  const getCategoryVariant = (category: string): 'default' | 'sci' | 'core' | 'impact' => {
    if (category.includes('SCI') || category.includes('EI')) return 'sci'
    if (category.includes('北大核心') || category.includes('南大核心') || category.includes('CSCD')) return 'core'
    return 'default'
  }

  return (
    <article
      className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-sky-200 hover:shadow-md"
      id={publication.id}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-900 sm:text-[15px]">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 underline decoration-slate-300 decoration-1 underline-offset-4 transition group-hover:text-sky-700 group-hover:decoration-sky-400"
            >
              {title}
              <svg className="h-3 w-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ) : pdfPath ? (
            <a
              href={pdfPath}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 underline decoration-slate-300 decoration-1 underline-offset-4 transition group-hover:text-sky-700 group-hover:decoration-sky-400"
            >
              {title}
              <svg className="h-3 w-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </a>
          ) : (
            title
          )}
        </h3>
        <span className="text-xs font-medium text-slate-500">{year}</span>
      </div>
      <p className="mt-1 text-[13px] text-slate-700 sm:text-sm">{authors}</p>
      <p className="mt-1 text-[13px] text-slate-500">{venue}</p>
      
      {journalCategory && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-medium text-slate-400">|</span>
          {journalCategory.categories?.map((category) => (
            <TagPill key={category} label={category} variant={getCategoryVariant(category)} />
          ))}
          {journalCategory.casPartition && (
            <TagPill label={journalCategory.casPartition} variant="sci" />
          )}
          {journalCategory.impactFactor && (
            <TagPill label={`IF ${journalCategory.impactFactor}`} variant="impact" />
          )}
        </div>
      )}
      
      <div className="mt-2 flex flex-wrap gap-1.5">
        {highlight && <TagPill label="代表作" />}
        {tags?.map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </div>
    </article>
  )
}

/**
 * @description Filter button for publication type.
 */
function FilterButton(props: {
  /** Button label. */
  label: string
  /** Whether the button is currently active. */
  active: boolean
  /** Click handler. */
  onClick: () => void
}) {
  const { label, active, onClick } = props
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'rounded-full border px-2.5 py-1 text-xs font-medium transition',
        active
          ? 'border-sky-500 bg-sky-50 text-sky-700 shadow-sm'
          : 'border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-sky-700',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

/**
 * @description Language filter type.
 */
type LanguageFilter = 'all' | 'chinese' | 'english'

/**
 * @description Checks if a publication is in Chinese.
 */
function isChinesePublication(paper: Publication): boolean {
  return /[\u4e00-\u9fa5]/.test(paper.title) || paper.tags?.includes('中文论文')
}

/**
 * @description Publications section: representative works and complete list.
 */
export function PublicationsSection() {
  const [typeFilter, setTypeFilter] = useState<'all' | PublicationType>('all')
  const [languageFilter, setLanguageFilter] = useState<LanguageFilter>('all')
  const [query, setQuery] = useState('')

  /**
   * @description Handles changes in the search input.
   */
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value)
  }

  const featured = useMemo(
    () => publications.filter((paper) => paper.highlight),
    [],
  )

  const filtered = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase()
    return publications.filter((paper) => {
      const matchesType =
        typeFilter === 'all' ? true : paper.type === typeFilter
      const matchesLanguage =
        languageFilter === 'all' ||
        (languageFilter === 'chinese' && isChinesePublication(paper)) ||
        (languageFilter === 'english' && !isChinesePublication(paper))
      const matchesQuery =
        !lowerQuery ||
        paper.title.toLowerCase().includes(lowerQuery) ||
        paper.venue.toLowerCase().includes(lowerQuery)
      return matchesType && matchesLanguage && matchesQuery
    })
  }, [typeFilter, languageFilter, query])

  const groupedByYear = useMemo(() => {
    const groups: Record<number, Publication[]> = {}
    for (const paper of filtered) {
      if (!groups[paper.year]) {
        groups[paper.year] = []
      }
      groups[paper.year].push(paper)
    }
    return Object.keys(groups)
      .map((key) => Number(key))
      .sort((a, b) => b - a)
      .map((year) => ({
        year,
        items: groups[year],
      }))
  }, [filtered])

  const trailingControls = (
    <div className="flex flex-wrap items-center gap-2">
      <FilterButton
        label="全部"
        active={languageFilter === 'all'}
        onClick={() => setLanguageFilter('all')}
      />
      <FilterButton
        label="中文"
        active={languageFilter === 'chinese'}
        onClick={() => setLanguageFilter('chinese')}
      />
      <FilterButton
        label="English"
        active={languageFilter === 'english'}
        onClick={() => setLanguageFilter('english')}
      />
    </div>
  )

  return (
    <section id="publications" className="mb-12 sm:mb-16">
      <SectionHeader
        title="论文与成果"
        description="涵盖食品安全、机器学习、预测微生物学等研究方向"
        trailing={trailingControls}
      />

      <div className="mb-6 flex flex-wrap gap-2">
        <FilterButton
          label="全部类型"
          active={typeFilter === 'all'}
          onClick={() => setTypeFilter('all')}
        />
        <FilterButton
          label="期刊论文"
          active={typeFilter === 'journal'}
          onClick={() => setTypeFilter('journal')}
        />
        <FilterButton
          label="会议论文"
          active={typeFilter === 'conference'}
          onClick={() => setTypeFilter('conference')}
        />
        <FilterButton
          label="预印本"
          active={typeFilter === 'preprint'}
          onClick={() => setTypeFilter('preprint')}
        />
        <FilterButton
          label="专利"
          active={typeFilter === 'patent'}
          onClick={() => setTypeFilter('patent')}
        />
      </div>

      <div className="relative mb-6">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="搜索论文标题或期刊名称..."
          value={query}
          onChange={handleSearchChange}
          className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm shadow-sm transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
      </div>

      {featured.length > 0 && (
        <div className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">代表性成果</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((paper) => (
              <PublicationItem key={paper.id} publication={paper} />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-6">
        {groupedByYear.map((group) => (
          <div key={group.year}>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
              <span className="rounded-lg bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
                {group.year}
              </span>
              <span className="text-sm font-normal text-slate-400">
                ({group.items.length}篇)
              </span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((paper) => (
                <PublicationItem key={paper.id} publication={paper} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}