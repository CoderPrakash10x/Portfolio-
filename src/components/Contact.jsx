import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { profile } from '../content'
import { scrollToId } from '../scrollTo'
import SectionHead from './SectionHead'

export default function Contact({ reduced }) {
  const root = useRef(null)
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email) } catch { /* address is visible anyway */ }
    setCopied(true); setTimeout(() => setCopied(false), 2200)
  }

  // Closing scene: the red field wipes in from the bottom, then the two lines rise.
  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from('.contact__bg', { clipPath: 'inset(100% 0 0 0)', ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 90%', end: 'top 20%', scrub: 0.6 } })
      gsap.from('.contact__line > span', { yPercent: 115, duration: 1.1, ease: 'power4.out', stagger: 0.1, scrollTrigger: { trigger: root.current, start: 'top 45%', once: true } })
      gsap.from('.contact__rest > *', { opacity: 0, y: 24, duration: 0.7, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 35%', once: true } })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="contact" id="contact" ref={root} tabIndex={-1}>
      <div className="contact__bg" aria-hidden="true" />
      <div className="contact__in">
        <SectionHead n="06" label="Contact" reduced={reduced} />
        <h2 className="huge contact__title" aria-label="Let’s build something.">
          {['Let’s build', 'something.'].map((l) => <span className="contact__line" aria-hidden="true" key={l}><span>{l}</span></span>)}
        </h2>
        <div className="contact__rest">
          <p className="contact__lead">Internships, full-time roles or a project that needs a developer. Write to me.</p>
          <div className="contact__actions">
            <a className="pill pill--solid" href={`mailto:${profile.email}`} data-magnetic data-cursor="WRITE">Write to me <ArrowUpRight size={16} /></a>
            <button className="pill pill--line" onClick={copy} data-magnetic data-cursor="COPY" aria-live="polite">
              {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> {profile.email}</>}
            </button>
          </div>
          <ul className="mono contact__links">
            {profile.links.map((l) => <li key={l.label}><a href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a></li>)}
          </ul>
        </div>
        <footer className="footer mono">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <button onClick={() => scrollToId('top')}>Back to top ↑</button>
        </footer>
      </div>
    </section>
  )
}
