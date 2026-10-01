import type { KeyboardEvent, ReactNode } from 'react'
import { ArrowRight, CircleCheckBig, Package } from 'lucide-react'
import {
  DETAIL_TABS,
  EXIM,
  HYDRAULICS,
  MANPOWER,
  OEM_MRO,
  PORTFOLIO,
  POSITIONS,
  PROCUREMENT,
  TAB_ICONS,
  type Brand,
  type Category,
  type DetailTab,
} from '../content/verticals'
import { BulletList, HexIcon, Img, SectionHeading, StrengthChips } from '../components/ui'

type Props = { tab: DetailTab; onTabChange: (t: DetailTab) => void }

/** "Services": the PDF's service pages (p5-p8, p11) as an ARIA tab set. */
export function Capabilities({ tab, onTabChange }: Props) {
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = DETAIL_TABS.findIndex((t) => t.id === tab)
    let next = -1
    if (e.key === 'ArrowRight') next = (i + 1) % DETAIL_TABS.length
    else if (e.key === 'ArrowLeft') next = (i - 1 + DETAIL_TABS.length) % DETAIL_TABS.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = DETAIL_TABS.length - 1
    if (next < 0) return
    e.preventDefault()
    const id = DETAIL_TABS[next].id
    onTabChange(id)
    document.getElementById(`tab-${id}`)?.focus()
  }

  return (
    <div className="section-y container-x">
      <div className="max-w-3xl">
        <p className="eyebrow">Our Services</p>
        <h3 className="mt-3 font-heading text-2xl font-extrabold text-white uppercase sm:text-3xl">
          What each vertical <span className="text-gold-400">delivers</span>
        </h3>
      </div>

      <div
        role="tablist"
        aria-label="Services"
        onKeyDown={onKeyDown}
        className="scrollbar-none -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3"
      >
        {DETAIL_TABS.map((t) => {
          const selected = t.id === tab
          const Icon = TAB_ICONS[t.id]
          return (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onTabChange(t.id)}
              className={`flex min-h-12 shrink-0 items-center gap-2.5 rounded-lg border px-4 text-left text-sm font-bold transition-colors sm:text-[0.95rem] ${
                selected
                  ? 'border-gold-400 bg-gold-400 text-ink'
                  : 'border-line bg-navy-950/60 text-slate-200 hover:border-gold-400/60 hover:text-white'
              }`}
            >
              <Icon className="size-5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
              <span className="lg:hidden">{t.short}</span>
              <span className="hidden lg:inline">{t.label}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-8 lg:mt-10">
        <Panel id="manpower" tab={tab}>
          <Manpower />
        </Panel>
        <Panel id="procurement" tab={tab}>
          <Procurement />
        </Panel>
        <Panel id="exim" tab={tab}>
          <Exim />
        </Panel>
      </div>
    </div>
  )
}

function Panel({ id, tab, children }: { id: DetailTab; tab: DetailTab; children: ReactNode }) {
  return (
    <div id={`panel-${id}`} role="tabpanel" aria-labelledby={`tab-${id}`} hidden={id !== tab} tabIndex={0} className="focus-visible:outline-offset-8">
      {children}
    </div>
  )
}

/* ---------- Shared bits ---------- */

function Tagline({ children }: { children: ReactNode }) {
  return <p className="mt-3 font-semibold text-slate-100 sm:text-lg">{children}</p>
}

function CategoryGrid({ items, label }: { items: Category[]; label: string }) {
  return (
    <ul aria-label={label} className="grid h-full gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ title, icon, items: list }) => (
        <li key={title} className="panel-subtle hover-card p-4 sm:p-5">
          <div className="flex items-center gap-3 xl:flex-col xl:items-start xl:gap-2">
            <HexIcon icon={icon} size="sm" />
            <h4 className="font-heading text-base leading-tight font-bold text-white uppercase">{title}</h4>
          </div>
          <BulletList items={list} className="mt-3" />
        </li>
      ))}
    </ul>
  )
}

/** White logo panel, as in the PDF's brand grids (p9, p10). */
function BrandPanel({ title, brands, gridClass, className = '' }: { title: string; brands: Brand[]; gridClass: string; className?: string }) {
  return (
    <div className={className}>
      <p className="flex items-center gap-3 font-heading text-sm font-extrabold tracking-wide text-gold-400 uppercase">
        <span className="h-px flex-1 bg-gold-400/60" aria-hidden="true" />
        {title}
        <span className="h-px flex-1 bg-gold-400/60" aria-hidden="true" />
      </p>
      <ul aria-label={title} className={`mt-3 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-gold-400/60 bg-[#e2e8f0] ${gridClass}`}>
        {brands.map((b) => (
          <li key={b.name} className="flex h-16 items-center justify-center bg-[#ffffff] p-2.5 sm:h-[4.5rem]">
            <img src={b.logo} alt={b.name} loading="lazy" className="max-h-full max-w-full object-contain transition-transform duration-200 hover:scale-110" />
          </li>
        ))}
      </ul>
    </div>
  )
}

function Divider() {
  return <hr className="my-12 border-0 border-t border-gold-400/20 lg:my-16" />
}

/* ---------- Offshore & Industrial Manpower (p5) + Positions We Supply (p6) ---------- */

function Manpower() {
  return (
    <>
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading as="h3" lines={MANPOWER.heading} />
          <Tagline>{MANPOWER.tagline}</Tagline>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="panel hover-card p-5">
              <h4 className="font-heading text-lg font-bold text-gold-400 uppercase">Workforce Solutions</h4>
              <ul className="mt-4 divide-y divide-white/10">
                {MANPOWER.workforce.map(({ label, icon: Icon }) => (
                  <li key={label} className="flex items-center gap-3 py-2.5 text-slate-100">
                    <span className="icon-ring size-8">
                      <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="panel hover-card self-start p-5">
              <h4 className="font-heading text-lg font-bold text-gold-400 uppercase">Deployment Models</h4>
              <ul className="mt-4 divide-y divide-white/10">
                {MANPOWER.deployment.map((label) => (
                  <li key={label} className="flex items-center gap-3 py-3 text-slate-100">
                    <CircleCheckBig className="size-6 shrink-0 text-gold-400" strokeWidth={1.75} aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <figure className="relative min-h-[16.25rem] overflow-hidden rounded-[var(--radius-card)] border border-gold-400/35 lg:col-span-5">
          <Img
            name={MANPOWER.image}
            alt="Offshore crews and platforms at dusk"
            sizes="(min-width: 1024px) 500px, 100vw"
            className="absolute inset-0 size-full object-cover"
          />
        </figure>
      </div>
      <StrengthChips items={MANPOWER.strengths} label="Manpower strengths" className="mt-8" />

      <Divider />

      <SectionHeading as="h3" lines={POSITIONS.heading} />
      <Tagline>{POSITIONS.tagline}</Tagline>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {POSITIONS.groups.map(({ title, icon, roles }) => (
          <div key={title} className="panel hover-card p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <HexIcon icon={icon} size="lg" />
              <h4 className="font-heading text-lg font-bold text-gold-400 uppercase">{title}</h4>
            </div>
            <ul className="mt-5 grid grid-cols-1 gap-x-6 min-[400px]:grid-cols-2">
              {roles.map((role) => (
                <li key={role} className="flex items-center gap-2.5 border-b border-white/10 py-2 text-slate-100">
                  <span className="size-1.5 shrink-0 rounded-full bg-gold-400" aria-hidden="true" />
                  {role}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <StrengthChips items={POSITIONS.strengths} label="Workforce strengths" className="mt-8" />
    </>
  )
}

/* ---------- Industrial Procurement (p7) + OEM Spare Parts & MRO (p8) ---------- */

function Procurement() {
  return (
    <>
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <SectionHeading as="h3" lines={PROCUREMENT.heading} />
          <Tagline>{PROCUREMENT.tagline}</Tagline>
          <p className="lead mt-3">{PROCUREMENT.text}</p>
        </div>
        <figure className="overflow-hidden rounded-[var(--radius-card)] border border-gold-400/35 lg:col-span-5">
          <Img name={PROCUREMENT.image} alt="Warehouse aisle stocked with industrial goods" sizes="(min-width: 1024px) 500px, 100vw" className="aspect-[16/7] w-full object-cover" />
        </figure>
      </div>

      <p className="mt-10 mb-4 inline-block rounded-md bg-gold-400 px-4 py-1.5 font-heading text-sm font-extrabold tracking-wide text-ink uppercase">
        Procurement Categories
      </p>
      <CategoryGrid items={PROCUREMENT.categories} label="Procurement categories" />
      <p className="mt-2 text-sm text-muted">…and more in every category.</p>

      <p className="panel mt-6 flex flex-col items-center justify-center gap-1 px-5 py-4 text-center font-heading font-bold uppercase sm:flex-row sm:gap-4">
        <span className="text-white">{PROCUREMENT.slogan[0]}</span>
        <span className="hidden h-5 w-px bg-gold-400/60 sm:block" aria-hidden="true" />
        <span className="text-gold-400">{PROCUREMENT.slogan[1]}</span>
      </p>
      <StrengthChips items={PROCUREMENT.strengths} label="Procurement strengths" className="mt-6" />

      <Divider />

      <SectionHeading as="h3" lines={OEM_MRO.heading} />
      <Tagline>{OEM_MRO.tagline}</Tagline>
      <p className="lead mt-3 max-w-3xl">{OEM_MRO.text}</p>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="panel hover-card flex flex-col p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <HexIcon icon={Package} size="lg" />
            <h4 className="font-heading text-lg font-bold uppercase">
              <span className="text-gold-400">OEM</span> Spare Parts
            </h4>
          </div>
          <p className="mt-5 flex gap-3 text-slate-100">
            <CircleCheckBig className="mt-0.5 size-6 shrink-0 text-gold-400" strokeWidth={1.75} aria-hidden="true" />
            {OEM_MRO.oem}
          </p>
          <Img
            name="about-valves"
            alt="Flanged industrial valves and fittings"
            sizes="(min-width: 1024px) 380px, 100vw"
            className="mt-5 aspect-[16/9] w-full flex-1 rounded-md object-cover"
          />
        </div>
        <div className="panel hover-card p-5 sm:p-6">
          <h4 className="font-heading text-lg font-bold uppercase">
            <span className="text-gold-400">MRO</span> Solutions
          </h4>
          <ul className="mt-3 divide-y divide-white/10">
            {OEM_MRO.mro.map(({ label, icon: Icon }) => (
              <li key={label} className="flex items-center gap-3 py-2.5 text-slate-100">
                <span className="icon-ring size-8">
                  <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
        <ul aria-label="MRO benefits" className="grid grid-cols-2 gap-3">
          {OEM_MRO.benefits.map(({ label, icon: Icon }) => (
            <li key={label} className="panel-subtle hover-card flex flex-col justify-center gap-3 p-4">
              <Icon className="size-7 text-gold-400" strokeWidth={1.5} aria-hidden="true" />
              <span className="font-heading text-sm leading-tight font-bold text-white uppercase">{label}</span>
            </li>
          ))}
        </ul>
      </div>
      <StrengthChips items={OEM_MRO.strengths} label="OEM and MRO strengths" className="mt-8" />
    </>
  )
}

/* ---------- Product Portfolio (p9) + Hydraulics & Technical Supplies (p10) ---------- */

/** "Products": its own block below Services, always visible. */
export function Products() {
  return (
    <div className="section-y container-x">
      <p className="eyebrow mb-4">Our Products</p>
      <SectionHeading as="h3" lines={PORTFOLIO.heading} />
      <Tagline>{PORTFOLIO.tagline}</Tagline>
      <p className="lead mt-3 mb-8 max-w-3xl">{PORTFOLIO.text}</p>
      <div className="grid gap-8 xl:grid-cols-12 xl:gap-6">
        <div className="xl:col-span-8">
          <CategoryGrid items={PORTFOLIO.categories} label="Product categories" />
        </div>
        <BrandPanel
          title="Trusted Global Brands"
          brands={PORTFOLIO.brands}
          gridClass="grid-cols-3 sm:grid-cols-6 xl:grid-cols-3"
          className="xl:col-span-4"
        />
      </div>
      <StrengthChips items={PORTFOLIO.strengths} label="Product strengths" className="mt-8" />

      <Divider />

      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <SectionHeading as="h3" lines={HYDRAULICS.heading} />
          <p className="lead mt-4">{HYDRAULICS.text}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {HYDRAULICS.groups.map(({ title, icon, items }) => (
              <li key={title} className="panel hover-card p-5">
                <HexIcon icon={icon} />
                <h4 className="mt-3 font-heading text-base font-bold text-gold-400 uppercase">{title}</h4>
                <BulletList items={items} className="mt-3" />
              </li>
            ))}
          </ul>
        </div>
        <figure className="overflow-hidden rounded-[var(--radius-card)] border border-gold-400/35 lg:col-span-5">
          <Img name={HYDRAULICS.image} alt="Hydraulic hoses, pneumatic regulators and welding work" sizes="(min-width: 1024px) 500px, 100vw" className="w-full object-cover" />
        </figure>
      </div>
      <BrandPanel title="Our Premium Brands" brands={HYDRAULICS.brands} gridClass="grid-cols-3 sm:grid-cols-5 lg:grid-cols-10" className="mt-10" />
      <StrengthChips items={HYDRAULICS.strengths} label="Technical supplies strengths" className="mt-8" />
    </div>
  )
}

/* ---------- Global Sourcing & EXIM (p11) ---------- */

function Exim() {
  return (
    <>
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading as="h3" lines={EXIM.heading} />
          <p className="lead mt-4">{EXIM.text}</p>
          <div className="panel hover-card mt-8 p-5 sm:p-6">
            <h4 className="font-heading text-lg font-bold text-gold-400 uppercase">Global Procurement Network</h4>
            <ul className="mt-3 divide-y divide-white/10">
              {EXIM.network.map((item) => (
                <li key={item} className="flex items-center gap-3 py-2.5 text-slate-100">
                  <CircleCheckBig className="size-5 shrink-0 text-gold-400" strokeWidth={1.75} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <figure className="overflow-hidden rounded-[var(--radius-card)] border border-gold-400/35 lg:col-span-7">
          <Img
            name={EXIM.image}
            alt="Container port with cargo ship, trucks and an aircraft overhead"
            sizes="(min-width: 1024px) 700px, 100vw"
            className="h-full min-h-[15rem] w-full object-cover"
          />
        </figure>
      </div>

      <h4 className="mt-12 font-heading text-lg font-bold text-white uppercase">
        From source <span className="text-gold-400">to site</span>
      </h4>
      <ol className="mt-5 grid gap-3 lg:grid-cols-5 lg:gap-0">
        {EXIM.steps.map(({ label, text, icon: Icon }, i) => (
          <li key={label} className="relative flex gap-4 lg:flex-col lg:items-center lg:px-3 lg:text-center">
            {i < EXIM.steps.length - 1 && (
              <>
                <span className="absolute top-12 bottom-[-12px] left-6 w-px bg-gold-400/40 lg:hidden" aria-hidden="true" />
                <ArrowRight
                  className="absolute top-4 -right-2.5 hidden size-5 text-gold-400/70 lg:block"
                  aria-hidden="true"
                />
              </>
            )}
            <span className="icon-ring relative z-10 size-12 bg-navy-900">
              <Icon className="size-6" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <div className="pb-3 lg:pb-0">
              <p className="font-heading text-sm font-bold text-gold-400 uppercase lg:mt-3">
                <span className="sr-only">Step {i + 1}: </span>
                {label}
              </p>
              <p className="mt-1 text-sm leading-snug text-slate-200">{text}</p>
            </div>
          </li>
        ))}
      </ol>
      <StrengthChips items={EXIM.strengths} label="Sourcing and EXIM strengths" className="mt-10" />
    </>
  )
}
