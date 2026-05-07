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
 * @description Renders a section header with consistent typography and spacing for the light theme.
 */
export function SectionHeader({ title, description, trailing }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="mb-1 h-1 w-10 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500" />
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-[15px] leading-relaxed text-slate-600">
            {description}
          </p>
        )}
      </div>
      {trailing && <div className="flex-shrink-0">{trailing}</div>}
    </div>
  )
}
