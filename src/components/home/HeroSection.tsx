/**
 * @file HeroSection.tsx
 * @description Top hero: profile, auto-computed metrics, latest-work callout, and portrait,
 *              with an AI × Food-Safety themed neural-motif background and an AI pipeline strip.
 */

import { CalendarClock, Cpu, ExternalLink, Mail, MapPin, ShieldCheck, UtensilsCrossed } from 'lucide-react'
import { publications, getNewestPublications } from '../../data/publications'
import { useI18n } from '../../i18n'

/**
 * @description Props for a single academic metric cell.
 */
interface MetricProps {
  label: string
  value: string
  helper?: string
}

/**
 * @description Metric cell with serif value and gold top rule.
 */
function Metric({ label, value, helper }: MetricProps) {
  return (
    <div className="rounded-xl border border-paper-line bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm">
      <div className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">
        {label}
      </div>
      <div className="mt-1 font-serif text-2xl font-semibold text-ink">{value}</div>
      {helper && <div className="mt-1 text-[11px] leading-snug text-ink-mute">{helper}</div>}
    </div>
  )
}

/**
 * @description Subtle neural-network motif: nodes + connecting edges (deterministic, decorative).
 */
function NeuralMotif() {
  const nodes = [
    { x: 6, y: 8 }, { x: 22, y: 14 }, { x: 40, y: 8 }, { x: 58, y: 18 },
    { x: 74, y: 9 }, { x: 90, y: 16 }, { x: 30, y: 32 }, { x: 50, y: 30 },
    { x: 70, y: 34 }, { x: 14, y: 48 }, { x: 40, y: 52 }, { x: 62, y: 50 },
    { x: 84, y: 44 }, { x: 24, y: 66 }, { x: 50, y: 66 }, { x: 72, y: 70 },
    { x: 40, y: 84 }, { x: 62, y: 86 }, { x: 86, y: 82 },
  ]
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [1, 6], [2, 7], [3, 8], [6, 9],
    [7, 10], [8, 11], [9, 12], [10, 13], [11, 14], [12, 15], [13, 16], [14, 17], [15, 18],
  ]
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
      preserveAspectRatio="none"
    >
      {edges.map(([a, b], i) => (
        <line
          key={`e${i}`}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke="#0f766e"
          strokeWidth={0.4}
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={`n${i}`} cx={n.x} cy={n.y} r={1.1} fill="#0f766e" />
      ))}
    </svg>
  )
}

/**
 * @description Hero section.
 */
export function HeroSection() {
  const { t } = useI18n()
  const papers = publications.filter((p) => p.type !== 'patent')
  const peerReviewedCount = papers.length
  const sciCount = publications.filter((p) =>
    p.journalCategory?.categories.includes('SCI'),
  ).length
  const q1Count = publications.filter((p) =>
    p.journalCategory?.casPartition?.includes('1区'),
  ).length
  const leadCount = publications.filter((p) =>
    (p.tags ?? []).some((tg) => tg.includes('第一作者') || tg.includes('通讯作者')),
  ).length

  const newest = getNewestPublications(2)

  const pipeline = [
    { icon: ShieldCheck, label: t('hero.badge.qmra') },
    { icon: Cpu, label: t('hero.badge.ai') },
    { icon: UtensilsCrossed, label: t('hero.badge.pm') },
  ]

  return (
    <section
      id="about"
      className="mb-12 overflow-hidden rounded-2xl border border-paper-line bg-white shadow-sm sm:mb-16 animate-rise"
    >
      <div className="relative h-40 sm:h-48">
        <img
          src="picture/campus.jpg"
          alt={t('hero.campus.alt')}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/45 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-3 sm:bottom-6 sm:left-6">
          <img
            src="picture/logo.png"
            alt="USST"
            className="h-12 w-12 rounded-full bg-white p-1 shadow-lg sm:h-14 sm:w-14"
          />
          <div className="text-white">
            <div className="font-serif text-lg font-semibold sm:text-xl">{t('hero.univ.name')}</div>
            <div className="text-sm text-slate-200">{t('hero.univ.school')}</div>
          </div>
        </div>
        <div className="absolute right-4 top-4 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm sm:right-6 sm:top-6">
          {t('hero.tagline.pipeline')}
        </div>
      </div>

      <div className="relative p-6 sm:p-8">
        <NeuralMotif />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.9fr)]">
          <div className="space-y-5">
            <div className="inline-flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent-pale px-3 py-1.5 font-medium text-accent">
                <ShieldCheck size={14} />
                {t('hero.badge.qmra')}
              </span>
              <span className="rounded-md border border-paper-line bg-white px-3 py-1.5 text-ink-mute">
                {t('hero.badge.pm')}
              </span>
              <span className="rounded-md border border-accent/30 bg-teal-50 px-3 py-1.5 text-accent-soft">
                <Cpu size={13} className="mr-1 inline" />
                {t('hero.badge.ai')}
              </span>
            </div>

            <div>
              <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-[2.6rem]">
                周子文 <span className="text-accent">·</span> Ziwen Zhou
              </h1>
              <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink-soft sm:text-base">
                {t('hero.intro.p1')}
              </p>
            </div>

            <p className="max-w-3xl text-[15px] leading-relaxed text-ink-soft sm:text-base">
              {t('hero.intro.p2')}
            </p>

            {/* AI → Food pipeline strip */}
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-accent/20 bg-gradient-to-r from-accent-pale/60 via-white to-amber-50 p-3 text-xs font-medium text-ink-soft">
              {pipeline.map((item, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-accent">→</span>}
                  <item.icon size={14} className="text-accent-soft" />
                  {item.label}
                </span>
              ))}
              <span className="ml-1 rounded-full bg-gold-pale px-2.5 py-0.5 text-gold">
                {t('hero.latest.title')}
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:zzw1174600720@163.com"
                className="inline-flex items-center gap-2 rounded-md bg-ink px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
              >
                <Mail size={16} />
                {t('hero.btn.email')}
              </a>
              <a
                href="#publications"
                className="inline-flex items-center gap-2 rounded-md border border-paper-line bg-white px-3.5 py-2 text-sm font-medium text-ink-soft shadow-sm transition hover:border-accent/50 hover:bg-accent-pale hover:text-accent"
              >
                <ExternalLink size={16} />
                {t('hero.btn.papers')}
              </a>
              <a
                href="https://orcid.org/0009-0000-3319-7303"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-paper-line bg-white px-3.5 py-2 text-sm font-medium text-ink-soft shadow-sm transition hover:border-accent/50 hover:bg-accent-pale hover:text-accent"
              >
                ORCID
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Metric label={t('hero.metric.peer')} value={`${peerReviewedCount} 篇`} />
              <Metric label={t('hero.metric.sci')} value={`${sciCount} 篇`} helper={t('hero.metric.sci.helper')} />
              <Metric label={t('hero.metric.q1')} value={`${q1Count} 篇`} />
              <Metric label={t('hero.metric.lead')} value={`${leadCount} 篇`} />
            </div>

            {newest.length > 0 && (
              <div className="rounded-xl border border-gold/40 bg-gold-pale/60 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-md bg-gold-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    {t('hero.latest')}
                  </span>
                  <span className="text-[11px] font-medium text-gold">{t('hero.latest.title')}</span>
                </div>
                <ul className="space-y-2">
                  {newest.map((paper) => (
                    <li key={paper.id} className="min-w-0">
                      <div className="text-[13px] font-medium leading-snug text-ink">{paper.title}</div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-ink-mute">
                        <span className="inline-flex items-center gap-1">
                          <CalendarClock size={12} className="text-gold-soft" />
                          {paper.year}
                        </span>
                        <span>{paper.venue}</span>
                        {paper.link && (
                          <a
                            href={paper.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-accent hover:underline"
                          >
                            DOI ↗
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-4 lg:items-end">
            <div className="relative h-52 w-52 overflow-hidden rounded-2xl border border-paper-line bg-white shadow-xl sm:h-60 sm:w-60">
              <img
                src="picture/photo.jpg"
                alt={t('hero.portrait.alt')}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-3 pb-2 pt-8">
                <div className="text-xs font-medium text-white">周子文 · Ziwen Zhou</div>
                <div className="text-[10px] text-slate-200">PhD Candidate, USST</div>
              </div>
            </div>
            <div className="w-full rounded-xl border border-paper-line bg-paper p-4 text-[13px] leading-relaxed text-ink-soft">
              <div className="flex items-center gap-2 font-medium text-ink">
                <MapPin size={15} className="text-accent" />
                Shanghai, China
              </div>
              <p className="mt-2">{t('hero.sidebio')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
