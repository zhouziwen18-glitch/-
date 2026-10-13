/**
 * @file PublicationsSection.tsx
 * @description Representative publications and full list with type/language filters and keyword search (bilingual).
 */

import { useMemo, useState, type ChangeEvent } from 'react'
import { SectionHeader } from './SectionHeader'
import {
  type Publication,
  type PublicationType,
  publications,
  isNewestPublication,
  isAutoCollected,
} from '../../data/publications'
import { useI18n } from '../../i18n'

function TagPill({ label, variant = 'default' }: { label: string; variant?: 'default' | 'sci' | 'core' | 'impact' }) {
  const variants = {
    default: 'bg-accent-pale text-accent ring-accent/20',
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

function PublicationItem({ publication }: { publication: Publication }) {
  const { title, authors, venue, year, link, pdfPath, tags, highlight, journalCategory } = publication
  const { t } = useI18n()
  const isNewest = isNewestPublication(publication)

  const getCategoryVariant = (category: string): 'default' | 'sci' | 'core' | 'impact' => {
    if (category.includes('SCI') || category.includes('EI')) return 'sci'
    if (category.includes('北大核心') || category.includes('南大核心') || category.includes('CSCD')) return 'core'
    return 'default'
  }

  return (
    <article
      className="group relative rounded-xl border border-paper-line bg-white p-4 shadow-sm transition hover:border-accent/40 hover:shadow-md"
      id={publication.id}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-ink sm:text-[15px]">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 underline decoration-slate-300 decoration-1 underline-offset-4 transition group-hover:text-accent group-hover:decoration-accent/60"
            >
              {title}
              <svg className="h-3 w-3 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ) : pdfPath ? (
            <a
              href={pdfPath}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 underline decoration-slate-300 decoration-1 underline-offset-4 transition group-hover:text-accent group-hover:decoration-accent/60"
            >
              {title}
              <svg className="h-3 w-3 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </a>
          ) : (
            title
          )}
        </h3>
        <span className="text-xs font-medium text-ink-faint">{year}</span>
      </div>
      <p className="mt-1 text-[13px] text-ink-soft sm:text-sm">{authors}</p>
      <p className="mt-1 text-[13px] text-ink-mute">{venue}</p>

      {journalCategory && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-medium text-ink-faint">|</span>
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
        {highlight && <TagPill label={t('pubs.representative')} />}
        {isNewest && (
          <span className="inline-flex items-center rounded-full bg-gold-pale px-2.5 py-0.5 text-[11px] font-semibold text-gold ring-1 ring-gold/30">
            {t('pubs.newest')}
          </span>
        )}
        {tags?.map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </div>
    </article>
  )
}

function FilterButton(props: {
  label: string
  active: boolean
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
          ? 'border-accent bg-accent-pale text-accent shadow-sm'
          : 'border-paper-line bg-white text-ink-mute hover:border-accent/50 hover:text-accent',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

type LanguageFilter = 'all' | 'chinese' | 'english'

function isChinesePublication(paper: Publication): boolean {
  return /[\u4e00-\u9fa5]/.test(paper.title) || paper.tags?.includes('中文论文')
}

export function PublicationsSection() {
  const { t } = useI18n()
  const [typeFilter, setTypeFilter] = useState<'all' | PublicationType>('all')
  const [languageFilter, setLanguageFilter] = useState<LanguageFilter>('all')
  const [query, setQuery] = useState('')

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value)
  }

  const featured = useMemo(() => publications.filter((paper) => paper.highlight), [])

  const filtered = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase()
    return publications.filter((paper) => {
      const matchesType = typeFilter === 'all' ? true : paper.type === typeFilter
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
      if (!groups[paper.year]) groups[paper.year] = []
      groups[paper.year].push(paper)
    }
    return Object.keys(groups)
      .map((key) => Number(key))
      .sort((a, b) => b - a)
      .map((year) => ({
        year,
        // 组内按时间倒序：自动收录（最新发表）排在前面，其余保持数据顺序
        items: [...groups[year]].sort(
          (a, b) => (isAutoCollected(b) ? 1 : 0) - (isAutoCollected(a) ? 1 : 0),
        ),
      }))
  }, [filtered])

  const languageControls = (
    <div className="flex flex-wrap items-center gap-2">
      <FilterButton label={t('pubs.all')} active={languageFilter === 'all'} onClick={() => setLanguageFilter('all')} />
      <FilterButton label={t('pubs.chinese')} active={languageFilter === 'chinese'} onClick={() => setLanguageFilter('chinese')} />
      <FilterButton label={t('pubs.english')} active={languageFilter === 'english'} onClick={() => setLanguageFilter('english')} />
    </div>
  )

  const typeControls = [
    { key: 'all' as const, label: t('pubs.type.all') },
    { key: 'journal' as const, label: t('pubs.type.journal') },
    { key: 'conference' as const, label: t('pubs.type.conference') },
    { key: 'preprint' as const, label: t('pubs.type.preprint') },
    { key: 'patent' as const, label: t('pubs.type.patent') },
  ]

  return (
    <section id="publications" className="mb-12 sm:mb-16">
      <SectionHeader title={t('pubs.title')} description={t('pubs.desc')} trailing={languageControls} />

      <div className="mb-6 flex flex-wrap gap-2">
        {typeControls.map((control) => (
          <FilterButton
            key={control.key}
            label={control.label}
            active={typeFilter === control.key}
            onClick={() => setTypeFilter(control.key)}
          />
        ))}
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
          placeholder={t('pubs.search.placeholder')}
          value={query}
          onChange={handleSearchChange}
          className="w-full rounded-lg border border-paper-line bg-white py-2 pl-10 pr-4 text-sm shadow-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div className="space-y-6">
        {groupedByYear.map((group) => (
          <div key={group.year}>
            <h2 className="mb-4 flex items-center gap-2 font-serif text-lg font-semibold text-ink">
              <span className="rounded-lg bg-accent-pale px-3 py-1 text-sm font-medium text-accent">
                {group.year}
              </span>
              <span className="text-sm font-normal text-ink-faint">
                ({group.items.length} {t('pubs.count.suffix')})
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

      {featured.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 font-serif text-lg font-semibold text-ink">{t('pubs.featured')}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((paper) => (
              <PublicationItem key={paper.id} publication={paper} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
