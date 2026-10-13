/**
 * @file SectionHeader.tsx
 * @description Reusable section heading component with title and optional description and trailing content.
 */

import type { ReactNode } from 'react'

/**
 * @description Props for the SectionHeader component.
 */
interface SectionHeaderProps {
  /** Main title text of the section. */
  title: string
  /** Optional description under the title. */
  description?: ReactNode
  /** Optional extra content rendered on the right (e.g., filters, actions). */
  trailing?: ReactNode
}

/**
 * @description Renders a section header with consistent academic typography and spacing.
 */
export function SectionHeader({ title, description, trailing }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-px w-8 bg-gold-soft" />
          <span className="h-2 w-2 rounded-sm bg-accent" />
        </div>
        <h2 className="font-serif text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          {title}
        </h2>
        {description && (
          <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-ink-mute">
            {description}
          </p>
        )}
      </div>
      {trailing && <div className="flex-shrink-0">{trailing}</div>}
    </div>
  )
}
