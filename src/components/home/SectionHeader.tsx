/**
 * @file SectionHeader.tsx
 * @description Reusable section heading with a tech-style mono eyebrow, accent hairline, and bold sans title.
 */

import type { ReactNode } from 'react'

interface SectionHeaderProps {
  /** Main title text of the section. */
  title: string
  /** Optional description under the title. */
  description?: ReactNode
  /** Optional extra content rendered on the right (e.g., filters, actions). */
  trailing?: ReactNode
  /** Optional section index, e.g. "01". */
  index?: string
}

/**
 * @description Renders a section header with a monospace eyebrow, accent hairline and bold title.
 */
export function SectionHeader({ title, description, trailing, index }: SectionHeaderProps) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <div className="mb-2.5 flex items-center gap-2.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
            {index ? `// ${index}` : '// Section'}
          </span>
          <span className="h-px w-16 bg-gradient-to-r from-accent/60 to-transparent" />
        </div>
        <h2 className="font-sans text-[22px] font-semibold tracking-tight text-ink sm:text-[27px]">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-ink-mute">{description}</p>
        )}
      </div>
      {trailing && <div className="flex-shrink-0">{trailing}</div>}
    </div>
  )
}
