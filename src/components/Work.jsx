import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { moreWork, projects, scenes } from '../content'
import { Browser, Phone } from './Mock'
import SectionHead from './SectionHead'

/**
 * Selected work. Desktop (>=1000px, motion allowed): one pinned horizontal story.
 * Everything else: a normal vertical stack of the same panels.
 * The horizontal move is a single scrubbed tween; reveals and parallax use it as containerAnimation.
 */
export default function Work({ reduced }) {
  const root = useRef(null)
  const wrap = useRef(null)
  const track = useRef(null)
  const bar = useRef(null)
  const [idx, setIdx] = useState(0)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)', () => {
      const dist = () => track.current.scrollWidth - window.innerWidth
      const tween = gsap.to(track.current, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: wrap.current, pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true,
          end: () => `+=${dist()}`,
          onUpdate: (s) => { bar.current.style.transform = `scaleX(${s.progress})`; setIdx(Math.min(projects.length - 1, Math.round(s.progress * (projects.length - 1)))) },
        },
      })
      gsap.utils.toArray('.hpanel').forEach((panel) => {
        const cfg = { trigger: panel, containerAnimation: tween }
        gsap.from(panel.querySelector('.hpanel__stage'), { clipPath: 'inset(0 100% 0 0)', duration: 1, ease: 'power4.out', scrollTrigger: { ...cfg, start: 'left 80%', once: true } })
        gsap.from(panel.querySelectorAll('.hpanel__info > *'), { opacity: 0, y: 30, duration: 0.8, stagger: 0.07, ease: 'power3.out', scrollTrigger: { ...cfg, start: 'left 75%', once: true } })
        gsap.to(panel.querySelector('.hpanel__num'), { xPercent: -25, ease: 'none', scrollTrigger: { ...cfg, start: 'left right', end: 'right left', scrub: true } })
        gsap.to(panel.querySelector('.phone'), { y: -40, ease: 'none', scrollTrigger: { ...cfg, start: 'left right', end: 'right left', scrub: true } })
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <>
      <section className="sec sec--light work__intro" id="work" tabIndex={-1}>
        <SectionHead n="02" label="Selected work" reduced={reduced} />
        <h2 className="huge">Four things<br />I shipped<span className="dot">.</span></h2>
      </section>
      <div className="hwork" ref={wrap}>
        <div className="hwork__track" ref={track}>
          {projects.map((p, i) => {
            const s = scenes[p.title]
            return (
              <article key={p.title} className={`hpanel hpanel--${s.tone}`} style={{ '--accent': s.accent }} aria-label={p.title}>
                <span className="hpanel__num" aria-hidden="true">0{i + 1}</span>
                <div className="hpanel__info">
                  <p className="mono hpanel__kind">{`0${i + 1} / 0${projects.length}`} · {p.kind}</p>
                  <h3 className="hpanel__title">{p.title}</h3>
                  <p className={`hpanel__desc ${p.placeholder ? 'is-placeholder' : ''}`}>{p.desc}</p>
                  <p className="mono"><b>Role</b> {p.role}</p>
                  {p.result && <p className="mono"><b>Result</b> {p.result}</p>}
                  <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                  {p.url
                    ? <a className="pill" data-magnetic data-cursor="VIEW" href={p.url} target="_blank" rel="noreferrer">View project <ArrowUpRight size={14} /></a>
                    : <span className="pill pill--off">Link coming soon</span>}
                </div>
                <div className="hpanel__stage">
                  <Browser kind={s.mock} title={p.title} />
                  <Phone kind={s.mock} />
                </div>
              </article>
            )
          })}
        </div>
        <div className="hwork__hud mono" aria-hidden="true">
          <span>{`0${idx + 1}`} / {`0${projects.length}`}</span>
          <div className="hwork__rail"><div ref={bar} /></div>
        </div>
      </div>
      <section className="sec sec--light more">
        <h3 className="mono more__h">More work</h3>
        <ul>
          {moreWork.map((m) => (
            <li key={m.title}>
              {m.url
                ? <a href={m.url} target="_blank" rel="noreferrer" data-cursor="OPEN"><span>{m.title}</span><span className="mono more__note">{m.note}</span><ArrowUpRight size={18} /></a>
                : <div><span>{m.title}</span><span className="mono more__note">{m.note}</span></div>}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
