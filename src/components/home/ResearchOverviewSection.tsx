/**
 * @file ResearchOverviewSection.tsx
 * @description Overview of main research directions, methods, and application scenarios (bilingual).
 */

import { SectionHeader } from './SectionHeader'
import { useI18n } from '../../i18n'

interface ResearchCardProps {
  category: string
  title: string
  description: string
  output: string
}

function ResearchCard({ category, title, description, output }: ResearchCardProps) {
  const { t } = useI18n()
  return (
    <div className="flex h-full flex-col rounded-lg border border-paper-line bg-white p-4 shadow-sm">
      <span className="text-xs font-medium uppercase tracking-wide text-accent">{category}</span>
      <h3 className="mt-2 font-serif text-base font-semibold text-ink">{title}</h3>
      <p className="text-[13px] leading-relaxed text-ink-mute sm:text-sm">{description}</p>
      <div className="mt-auto pt-4">
        <div className="rounded-md bg-paper px-3 py-2 text-[12px] leading-relaxed text-ink-mute">
          <span className="font-medium text-ink">{t('research.output.label')}</span>
          {output}
        </div>
      </div>
    </div>
  )
}

export function ResearchOverviewSection() {
  const { t } = useI18n()

  const cards = [
    { category: t('research.cat.ra'), title: t('research.t.ra'), description: t('research.d.ra'), output: t('research.o.ra') },
    { category: t('research.cat.pm'), title: t('research.t.pm'), description: t('research.d.pm'), output: t('research.o.pm') },
    { category: t('research.cat.ai'), title: t('research.t.ai'), description: t('research.d.ai'), output: t('research.o.ai') },
    { category: t('research.cat.ki'), title: t('research.t.ki'), description: t('research.d.ki'), output: t('research.o.ki') },
  ]

  const blocks = [
    { title: t('research.data.title'), body: t('research.data.body') },
    { title: t('research.method.title'), body: t('research.method.body') },
    { title: t('research.value.title'), body: t('research.value.body') },
  ]

  return (
    <section id="research" className="mb-12 sm:mb-16">
      <SectionHeader title={t('research.title')} description={t('research.desc')} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <ResearchCard key={card.title} {...card} />
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-paper-line bg-white p-4 shadow-sm">
        <div className="grid gap-4 text-[13px] leading-relaxed text-ink-mute md:grid-cols-3">
          {blocks.map((block) => (
            <div key={block.title}>
              <div className="text-xs font-semibold uppercase tracking-wide text-ink">{block.title}</div>
              <p className="mt-1">{block.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
