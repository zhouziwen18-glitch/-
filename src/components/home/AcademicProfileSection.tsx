/**
 * @file AcademicProfileSection.tsx
 * @description Academic biography, education, experience, and research capability section (bilingual).
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
    <div className="rounded-lg border border-paper-line bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="rounded-md bg-accent-pale p-2 text-accent">
          <Icon size={18} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{description}</p>
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

  return (
    <section id="profile" className="mb-12 sm:mb-16">
      <SectionHeader title={t('profile.title')} description={t('profile.desc')} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <div className="space-y-4">
          <div className="rounded-lg border border-paper-line bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 font-serif text-sm font-semibold text-ink">
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
          <div className="rounded-lg border border-paper-line bg-white p-5 shadow-sm">
            <div className="mb-1 flex items-center gap-2 font-serif text-sm font-semibold text-ink">
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

          <div className="rounded-lg border border-paper-line bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 font-serif text-sm font-semibold text-ink">
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

          <div className="rounded-lg border border-paper-line bg-ink p-5 text-white shadow-sm">
            <h3 className="font-serif text-sm font-semibold">{t('profile.keywords')}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {keywordItems.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-medium text-slate-100 ring-1 ring-white/10"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
