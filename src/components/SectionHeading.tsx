import type { ReactNode } from 'react'

interface Props {
  eyebrow: string
  title: string
  id: string
  aside?: ReactNode
  dark?: boolean
}

export function SectionHeading({ eyebrow, title, id, aside, dark }: Props) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-8 sm:mb-14">
      <div className="max-w-2xl">
        <p className={`eyebrow ${dark ? 'text-ice' : ''}`}>{eyebrow}</p>
        <h2 id={id} className="mt-3.5 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-[52px]">
          {title}
        </h2>
      </div>
      {aside}
    </div>
  )
}
