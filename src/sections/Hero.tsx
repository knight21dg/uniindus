import type React from 'react'
import { ArrowRight, CircleCheckBig, ShieldCheck } from 'lucide-react'
import { COMPANY, HERO, SERVING_INDUSTRIES } from '../content/company'

/**
 * Layers, back to front: background image, navy overlay, content, then the
 * industry bar below. The site header is fixed and sits over the top of this.
 * Sizes live in index.css as fluid clamp() values, so the text and buttons
 * grow with the screen independently of how the image is cropped.
 */
export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="flex min-h-svh flex-col">
      <div className="hero-stage">
        <img
          src="/images/hero-port-1839.webp"
          srcSet="/images/hero-port-1024.webp 1024w, /images/hero-port-1839.webp 1839w"
          sizes="(min-width: 1024px) 130vw, 280vw"
          width={1839}
          height={757}
          alt=""
          fetchPriority="high"
          decoding="sync"
          className="hero-bg"
        />
        <div aria-hidden="true" className="hero-overlay" />

        <div className="hero-content">
          <p className="hero-badge">
            <span className="hero-badge-mark">
              <img src="/images/logo-mark-96.webp" width={106} height={96} alt="" />
            </span>
            {COMPANY.motto}
          </p>

          <h1 id="hero-title" className="hero-title">
            <span className="block text-white">{COMPANY.nameLines[0]}</span>
            <span className="block bg-linear-to-b from-gold-300 to-gold-400 bg-clip-text pb-[0.08em] text-transparent">
              {COMPANY.nameLines[1]}
            </span>
          </h1>
          <span className="hero-rule" aria-hidden="true" />

          <p className="hero-subtitle">{HERO.subtitle}</p>

          <ul className="hero-chips">
            {HERO.chips.map((chip) => (
              <li key={chip} className="hero-chip">
                <CircleCheckBig strokeWidth={1.9} aria-hidden="true" />
                {chip}
              </li>
            ))}
          </ul>

          <div className="hero-actions">
            <a href="#verticals" className="btn btn-primary hero-btn">
              Explore Solutions
              <ArrowRight className="btn-arrow" aria-hidden="true" />
            </a>
            <a href="#about" className="btn btn-secondary hero-btn">
              <ShieldCheck className="text-gold-400" aria-hidden="true" />
              About Our Company
            </a>
          </div>
        </div>
      </div>

      <IndustryBar />
    </section>
  )
}

// Enough copies that the strip stays full on very wide screens while one copy scrolls away.
const BAR_COPIES = 4

/**
 * The gold "Serving Industries" bar. The label stays put and the five
 * industries scroll past it; hovering or focusing the strip pauses it.
 */
export function IndustryBar() {
  return (
    <div className="industry-bar">
      <p className="industry-item industry-label">
        Serving
        <br className="sm:hidden" /> Industries
      </p>
      <div
        className="marquee min-w-0 flex-1"
        style={{ '--marquee-copies': BAR_COPIES, '--marquee-duration': '32s' } as React.CSSProperties}
        tabIndex={0}
        role="group"
        aria-label="Industries we serve"
      >
        <div className="marquee-track">
          {Array.from({ length: BAR_COPIES }, (_, copy) => (
            <ul key={copy} aria-hidden={copy > 0 ? true : undefined} className="flex shrink-0">
              {SERVING_INDUSTRIES.map(({ name, icon: Icon }) => (
                <li key={name} className="industry-item">
                  <Icon strokeWidth={1.75} aria-hidden="true" />
                  {name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}
