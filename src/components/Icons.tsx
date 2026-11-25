type IconProps = { size?: number; className?: string }

export const ArrowUpRight = ({ size = 20, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
    <path d="M14.26 6.02 5.74 13.98" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m8.37 5.82 5.89.2-.2 5.89" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const ArrowRight = ({ size = 20, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
    <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const Chevron = ({ size = 24, className, dir = 'right' }: IconProps & { dir?: 'left' | 'right' | 'down' | 'up' }) => {
  const rot = { right: 0, down: 90, left: 180, up: 270 }[dir]
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}
      style={{ transform: `rotate(${rot}deg)` }}>
      <path d="m10 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const ChevronSmall = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
    <path d="M12 6.67 8.47 10.2a.67.67 0 0 1-.94 0L4 6.67" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const BagIcon = ({ size = 24, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 25 25" fill="none" aria-hidden="true" className={className}>
    <path fill="currentColor" d="M12.02 0a6.44 6.44 0 0 1 6.44 6.44v.54h4.72a.86.86 0 0 1 .86.93l-1.2 13.27a3.14 3.14 0 0 1-3.13 2.86H4.34a3.14 3.14 0 0 1-3.13-2.86L0 7.91a.86.86 0 0 1 .86-.93h4.72v-.54A6.44 6.44 0 0 1 12.02 0Zm-9.1 21.03c.07.73.68 1.3 1.42 1.3h15.36c.74 0 1.36-.57 1.42-1.3l1.12-12.34h-3.79v1.94a.86.86 0 0 1-1.71 0V8.69H7.3v1.94a.86.86 0 0 1-1.72 0V8.69H1.8l1.12 12.34Zm9.1-19.32A4.73 4.73 0 0 0 7.3 6.44v.54h9.45v-.54a4.73 4.73 0 0 0-4.73-4.73Z" />
  </svg>
)

export const ArrowUp = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
    <path d="M8 13.67V2.45M3.95 6.38 8 2.33l4.05 4.05" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const CloseIcon = ({ size = 20, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
    <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

export const SwapIcon = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
    <path d="M3 5.5h9.5L10 3M13 10.5H3.5L6 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
