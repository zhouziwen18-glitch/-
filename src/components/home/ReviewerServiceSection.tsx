/**
 * @file ReviewerServiceSection.tsx
 * @description Academic service: journals Ziwen Zhou serves as a peer reviewer for.
 */

import { SectionHeader } from './SectionHeader'
import { useI18n } from '../../i18n'

interface ReviewerService {
  journal: string
  publisher: string
  year: number
  topic: { zh: string; en: string }
}

const REVIEWER_SERVICES: ReviewerService[] = [
  {
    journal: 'Discover Public Health',
    publisher: 'Springer Nature',
    year: 2026,
    topic: { zh: '公共健康与食品安全相关主题', en: 'Public health & food-safety related topics' },
  },
  {
    journal: 'Frontiers in Microbiology',
    publisher: 'Frontiers',
    year: 2026,
    topic: {
      zh: '单增李斯特菌在烟熏三文鱼加工环境中的污染',
      en: 'L. monocytogenes occurrence in cold-smoked salmon processing',
    },
  },
  {
    journal: 'Frontiers in Plant Science',
    publisher: 'Frontiers',
    year: 2026,
    topic: {
      zh: '太赫兹时域光谱测定面粉灰分',
      en: 'Ash content in wheat flour via terahertz spectroscopy',
    },
  },
  {
    journal: 'Journal of Microbiological Methods',
    publisher: 'Elsevier',
    year: 2026,
    topic: { zh: '微生物学实验与检测方法', en: 'Microbiological methods & detection' },
  },
]

/**
 * @description Section listing journals for which Ziwen Zhou served as a peer reviewer.
 */
export function ReviewerServiceSection() {
  const { t, lang } = useI18n()

  return (
    <section
      id="reviewer"
      className="rounded-2xl border border-paper-line bg-white p-5 shadow-sm sm:p-7"
    >
      <SectionHeader title={t('reviewer.title')} description={t('reviewer.subtitle')} />

      <div className="grid gap-4 sm:grid-cols-2">
        {REVIEWER_SERVICES.map((r) => (
          <div
            key={r.journal}
            className="rounded-xl border border-paper-line bg-paper/60 p-4 transition hover:border-accent/40"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-serif text-[15px] font-semibold leading-snug text-ink">
                  {r.journal}
                </h3>
                <p className="mt-1 text-[12px] text-ink-mute">
                  {t('reviewer.publisher')}: {r.publisher}
                </p>
              </div>
              <span className="flex-shrink-0 rounded-md bg-accent-pale px-2 py-1 text-[11px] font-semibold text-accent">
                {r.year}
              </span>
            </div>
            <p className="mt-2 border-t border-paper-line pt-2 text-[13px] leading-relaxed text-ink-soft">
              <span className="font-medium text-ink">{t('reviewer.reviewed')}: </span>
              {lang === 'en' ? r.topic.en : r.topic.zh}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
