import { COMPANY } from '../content/company'

/**
 * Logo tile + wordmark. The header version is fluid on desktop (see
 * `.logo-fluid` in index.css); `compact` keeps the fixed footer size.
 */
export function Logo({ compact = false }: { compact?: boolean }) {
  const fluid = compact ? '' : 'logo-fluid'
  return (
    <span className="flex items-center gap-3">
      <span className={`logo-tile ${fluid}`}>
        <img
          src="/images/logo-mark-192.webp"
          width={212}
          height={192}
          alt=""
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`logo-name ${fluid}`}>{COMPANY.nameLines[0]}</span>
        <span className={`logo-sub ${fluid}`}>{COMPANY.nameLines[1]}</span>
      </span>
    </span>
  )
}
