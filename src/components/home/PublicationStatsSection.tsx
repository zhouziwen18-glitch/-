/**
 * @file PublicationStatsSection.tsx
 * @description Visual summary of publication statistics by year (bilingual chart labels).
 */

import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { SectionHeader } from './SectionHeader'
import { publications } from '../../data/publications'
import { useI18n } from '../../i18n'

interface YearStat {
  year: number
  english: number
  chinese: number
  total: number
}

function StatsTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { name: string; value: number; color: string; dataKey: string }[]
  label?: string | number
}) {
  const { t } = useI18n()
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className="rounded-md border border-paper-line bg-white px-3 py-1.5 text-xs text-slate-700 shadow-sm">
      <div className="font-medium">{t('stats.tooltip.year')}：{label}</div>
      {payload.map((item) => (
        <div key={item.dataKey} className="mt-0.5">
          <span
            className="mr-1.5 inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-ink-mute">
            {item.dataKey === 'english' ? t('stats.tooltip.english') : item.dataKey === 'chinese' ? t('stats.tooltip.chinese') : t('stats.tooltip.total')}：{item.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export function PublicationStatsSection() {
  const { t } = useI18n()

  const statsByYear: YearStat[] = useMemo(() => {
    const counts = new Map<number, { english: number; chinese: number }>()
    for (const paper of publications) {
      const isChinese = /[\u4e00-\u9fa5]/.test(paper.title) || paper.tags?.includes('中文论文')
      const yearCounts = counts.get(paper.year) || { english: 0, chinese: 0 }
      if (isChinese) yearCounts.chinese++
      else yearCounts.english++
      counts.set(paper.year, yearCounts)
    }
    return Array.from(counts.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([year, { english, chinese }]) => ({ year, english, chinese, total: english + chinese }))
  }, [])

  const totalEnglish = publications.filter(
    (p) => !(/[\u4e00-\u9fa5]/.test(p.title) || p.tags?.includes('中文论文')),
  ).length
  const totalChinese = publications.length - totalEnglish

  if (statsByYear.length === 0) return null

  const englishColor = '#0f766e'
  const chineseColor = '#f59e0b'
  const trendColor = '#10b981'

  return (
    <section className="mb-12 sm:mb-16">
      <SectionHeader title={t('stats.title')} description={t('stats.desc')} />
      <div className="rounded-2xl border border-paper-line bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <p className="max-w-md text-[14px] leading-relaxed text-ink-mute">{t('stats.intro')}</p>
          <div className="flex flex-wrap gap-4">
            <div className="rounded-xl border border-paper-line bg-paper px-3 py-2 text-xs text-ink-mute">
              <div>
                {t('stats.total')}：{' '}
                <span className="font-semibold text-ink">{publications.length}</span>
              </div>
              <div className="mt-1">
                {t('stats.years')}：{' '}
                <span className="font-semibold text-ink">
                  {statsByYear[0].year} - {statsByYear[statsByYear.length - 1].year}
                </span>
              </div>
            </div>
            <div className="rounded-xl border border-paper-line bg-paper px-3 py-2 text-xs text-ink-mute">
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: englishColor }} />
                <span>{t('stats.english')}：<span className="font-semibold text-ink">{totalEnglish}</span> {t('stats.piece')}</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: chineseColor }} />
                <span>{t('stats.chinese')}：<span className="font-semibold text-ink">{totalChinese}</span> {t('stats.piece')}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={statsByYear} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
              <defs>
                <linearGradient id="englishGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={englishColor} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={englishColor} stopOpacity={0.3} />
                </linearGradient>
                <linearGradient id="chineseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chineseColor} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={chineseColor} stopOpacity={0.3} />
                </linearGradient>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={trendColor} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={trendColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={{ stroke: '#cbd5f5' }}
                tick={{ fontSize: 12, fill: '#64748b' }}
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={{ stroke: '#cbd5f5' }}
                tick={{ fontSize: 12, fill: '#64748b' }}
              />
              <Tooltip content={<StatsTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} iconType="circle" iconSize={8} />
              <Bar dataKey="english" name={t('stats.legend.english')} fill="url(#englishGradient)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="chinese" name={t('stats.legend.chinese')} fill="url(#chineseGradient)" radius={[4, 4, 0, 0]} />
              <Line
                type="monotone"
                dataKey="total"
                name={t('stats.legend.total')}
                stroke={trendColor}
                strokeWidth={2.5}
                dot={{ fill: trendColor, stroke: '#fff', strokeWidth: 2, r: 4 }}
                activeDot={{ fill: trendColor, stroke: '#fff', strokeWidth: 2, r: 6 }}
              />
              <Area type="monotone" dataKey="total" fill="url(#trendGradient)" stroke="none" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}
