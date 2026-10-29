import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { about } from '../content'
import SectionHead from './SectionHead'
import Portrait from './Portrait'

const statement = 'I’m a full-stack developer from Gorakhpur. I build for the moment real people show up: live events, competitions and club portals.'

export default function About({ reduced }) {
  const root = useRef(null)
  // Word-by-word mask reveal for the statement; calm facts fade in after.
  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: '.about__big', start: 'top 75%', once: true } })
      tl.from('.w > span', { yPercent: 110, duration: 0.9, ease: 'power4.out', stagger: 0.035 })
        .from('.about__facts > *', { opacity: 0, y: 20, duration: 0.7, stagger: 0.08, ease: 'power3.out' }, '-=0.4')
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="sec sec--light about" id="about" ref={root} tabIndex={-1}>
      <SectionHead n="01" label="About" reduced={reduced} />
      <div className="about__layout">
        <div className="about__copy">
          <p className="about__big" aria-label={statement}>
            {statement.split(' ').map((w, i) => <span className="w" aria-hidden="true" key={i}><span>{w}&nbsp;</span></span>)}
          </p>
          <div className="about__facts mono">
            <div>
              {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              <p className={about.approach.placeholder ? 'is-placeholder' : ''}>{about.approach.text}</p>
            </div>
            <ul>
              {about.facts.map((f) => <li key={f.k}><span>{f.k}</span>{f.v}</li>)}
              <li><span>Deepening</span>{about.focus.join(', ')}</li>
            </ul>
          </div>
        </div>
        <Portrait reduced={reduced} />
      </div>
    </section>
  )
}
