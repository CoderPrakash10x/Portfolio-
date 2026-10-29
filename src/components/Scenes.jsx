import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowUpRight } from 'lucide-react'
import { projects, scenes } from '../content'
import { Browser, Phone } from './Mock'

/** One full-height scene per project: info on the left, UI mock on the right, caption tucked on the mock. */
export default function Scenes({ reduced }) {
  const root = useRef(null)
  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.pscene').forEach((el) => {
        gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 60%', once: true }, defaults: { ease: 'power3.out' } })
          .from(el.querySelector('.pscene__title span'), { yPercent: 110, duration: 0.9 })
          .from(el.querySelectorAll('.pscene__info > *:not(.pscene__titlewrap)'), { opacity: 0, y: 18, duration: 0.7, stagger: 0.07 }, '-=0.5')
          .from(el.querySelector('.browser'), { opacity: 0, y: 50, duration: 0.9 }, '-=0.9')
          .from(el.querySelector('.phone'), { opacity: 0, y: 70, duration: 0.9 }, '-=0.7')
          .from(el.querySelector('.caption'), { opacity: 0, scale: 0.92, duration: 0.5 }, '-=0.4')
        // The phone drifts slightly faster than the browser for depth. Smoothed scrub.
        gsap.to(el.querySelector('.phone'), { y: -50, ease: 'none', scrollTrigger: { trigger: el, scrub: 0.8, start: 'top bottom', end: 'bottom top' } })
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <div ref={root}>
      {projects.map((p, i) => {
        const s = scenes[p.title]
        return (
          <section key={p.title} className="scene pscene" id={i === 0 ? 'projects' : undefined}
            style={{ background: s.bg, color: s.fg, '--accent': s.accent }}
            data-tone={s.bg === '#0d0d0d' ? 'dark' : 'light'}
            data-say="project" data-text={s.say.startsWith('[') ? 'Tell me what this project does in content.js.' : s.say}
            data-thread={i % 2 ? 'l' : 'r'} data-at="0.5">
            <div className="pscene__grid">
              <div className="pscene__info">
                <div className="pscene__titlewrap"><h2 className="pscene__title"><span>{p.title}</span></h2></div>
                <p className="mono pscene__kind">{p.kind}</p>
                <p className={`pscene__desc ${p.placeholder ? 'is-placeholder' : ''}`}>{p.desc}</p>
                <p className="mono"><b>Role</b> {p.role}</p>
                {p.result && <p className="mono"><b>Result</b> {p.result}</p>}
                <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                {p.url
                  ? <a className="pill" href={p.url} target="_blank" rel="noreferrer">View project <ArrowUpRight size={14} /></a>
                  : <span className="pill pill--off">Link coming soon</span>}
              </div>
              <div className="pscene__stage">
                <div className={`caption ${s.placeholder ? 'is-placeholder' : ''}`}><p>{s.say}</p></div>
                <Browser kind={s.mock} title={p.title} />
                <Phone kind={s.mock} />
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
