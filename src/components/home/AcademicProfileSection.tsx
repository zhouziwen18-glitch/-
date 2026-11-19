/**
 * @file AcademicProfileSection.tsx
 * @description Academic biography with a personal statement, an interdisciplinary path strip,
 *              capability cards, education, experience and research keywords (bilingual).
 */

import {
  BrainCircuit,
  BriefcaseBusiness,
  GraduationCap,
  Microscope,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { useI18n } from '../../i18n'

function TimelineItem({
  year,
  title,
  institution,
  detail,
}: {
  year: string
  title: string
  institution: string
  detail: string
}) {
  return (
    <div className="grid gap-3 border-t border-paper-line py-4 sm:grid-cols-[120px_minmax(0,1fr)]">
      <div className="text-xs font-semibold uppercase tracking-wide text-accent">{year}</div>
      <div>
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        <p className="mt-1 text-[13px] font-medium text-ink-soft">{institution}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-ink-mute">{detail}</p>
      </div>
    </div>
  )
}

function CapabilityItem({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof ShieldCheck
  title: string
  description: string
}) {
  return (
    <div className="rounded-lg border border-paper-line bg-white/[0.04] p-4">
      <div className="flex items-start gap-3">
        <div className="rounded-md bg-accent-pale p-2 text-accent">
          <Icon size={18} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink">{title}</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-ink-mute">{description}</p>
        </div>
      </div>
    </div>
  )
}

export function AcademicProfileSection() {
  const { t } = useI18n()

  const capabilityItems = [
    { icon: ShieldCheck, title: t('profile.cap.qmra.title'), description: t('profile.cap.qmra.desc') },
    { icon: Microscope, title: t('profile.cap.micro.title'), description: t('profile.cap.micro.desc') },
    { icon: BrainCircuit, title: t('profile.cap.ml.title'), description: t('profile.cap.ml.desc') },
    { icon: Sparkles, title: t('profile.cap.kg.title'), description: t('profile.cap.kg.desc') },
  ]

  const educationItems = [
    {
      year: '2025 - Present',
      degree: t('profile.edu.phd.degree'),
      institution: t('profile.edu.phd.org'),
      detail: t('profile.edu.phd.detail'),
    },
    {
      year: '2021',
      degree: t('profile.edu.ms.degree'),
      institution: t('profile.edu.ms.org'),
      detail: t('profile.edu.ms.detail'),
    },
    {
      year: '2017',
      degree: t('profile.edu.bs.degree'),
      institution: t('profile.edu.bs.org'),
      detail: t('profile.edu.bs.detail'),
    },
  ]

  const keywordItems = [
    'Food Microbiology', 'QMRA', 'Predictive Microbiology', 'Listeria monocytogenes',
    'Machine Learning', 'Deep Learning', 'Food Safety Early Warning',
  ]

  const characterTags = [
    t('profile.tags.interdisciplinary'),
    t('profile.tags.interpretable'),
    t('profile.tags.open'),
    t('profile.tags.problem'),
  ]

  const pathSteps = [
    { title: t('profile.traj.1'), detail: t('profile.traj.1d') },
    { title: t('profile.traj.2'), detail: t('profile.traj.2d') },
    { title: t('profile.traj.3'), detail: t('profile.traj.3d') },
    { title: t('profile.traj.4'), detail: t('profile.traj.4d') },
  ]

  return (
    <section id="profile" className="mb-12 sm:mb-16">
      <SectionHeader title={t('profile.title')} description={t('profile.desc')} />

      <div className="space-y-4">
        {/* personal statement + character tags */}
        <div className="relative overflow-hidden rounded-xl border border-accent/25 bg-gradient-to-br from-accent/[0.08] via-white/[0.02] to-cyan-500/[0.05] p-5 sm:p-6">
          <span className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-accent to-cyan-400" />
          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
            // Profile
          </div>
          <blockquote className="mt-2 max-w-3xl font-sans text-[19px] font-semibold leading-relaxed text-ink sm:text-[22px]">
            “{t('profile.statement')}”
          </blockquote>
          <div className="mt-4 flex flex-wrap gap-2">
            {characterTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-accent/30 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* interdisciplinary path strip */}
        <div className="rounded-xl border border-paper-line bg-white/[0.03] p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              // Path
            </span>
            <span className="text-[11px] text-ink-faint">{t('profile.traj.title')}</span>
            <span className="h-px w-10 bg-gradient-to-r from-accent/50 to-transparent" />
          </div>
          <div className="grid gap-4 sm:grid-cols-4">
            {pathSteps.map((step, i) => (
              <div key={step.title} className="relative">
                <div className="font-mono text-[11px] tracking-wide text-ink-faint">
                  0{i + 1}
                </div>
                <div className="mt-1 text-[13px] font-semibold leading-snug text-ink">
                  {step.title}
                </div>
                <div className="mt-0.5 text-[11px] leading-snug text-ink-mute">{step.detail}</div>
                {i < pathSteps.length - 1 && (
                  <span className="absolute -right-2 top-3 hidden text-accent/40 sm:block">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="space-y-4">
            <div className="rounded-lg border border-paper-line bg-white/[0.04] p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
                <GraduationCap size={18} className="text-accent" />
                {t('profile.bio.title')}
              </div>
              <div className="space-y-3 text-[15px] leading-relaxed text-ink-soft">
                <p>{t('profile.bio.p1')}</p>
                <p>{t('profile.bio.p2')}</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {capabilityItems.map((item) => (
                <CapabilityItem key={item.title} {...item} />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-paper-line bg-white/[0.04] p-5">
              <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-ink">
                <GraduationCap size={18} className="text-accent" />
                {t('profile.edu.title')}
              </div>
              <div>
                {educationItems.map((item) => (
                  <TimelineItem
                    key={`${item.year}-${item.degree}`}
                    year={item.year}
                    title={item.degree}
                    institution={item.institution}
                    detail={item.detail}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-paper-line bg-white/[0.04] p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
                <BriefcaseBusiness size={18} className="text-accent" />
                {t('profile.exp.title')}
              </div>
              <TimelineItem
                year="07/2024 - 07/2025"
                title={t('profile.exp.role')}
                institution={t('profile.exp.org')}
                detail={t('profile.exp.detail')}
              />
            </div>

            <div className="rounded-lg border border-paper-line bg-white/[0.04] p-5">
              <h3 className="text-sm font-semibold text-ink">{t('profile.keywords')}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {keywordItems.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-md border border-accent/20 bg-accent/[0.08] px-2.5 py-1 text-[11px] font-medium text-accent"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
