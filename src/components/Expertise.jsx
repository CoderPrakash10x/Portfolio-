import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { skills } from '../content'
import SectionHead from './SectionHead'

export default function Expertise({ reduced }) {
  const root = useRef(null)
  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.xrow').forEach((row) => {
        gsap.from(row.querySelector('.xrow__rule'), { scaleX: 0, transformOrigin: 'left', duration: 1, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 85%', once: true } })
        gsap.from(row.querySelectorAll('.xrow__name, .xrow__items li'), { yPercent: 40, opacity: 0, duration: 0.7, stagger: 0.04, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 85%', once: true } })
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="sec sec--dark expertise" id="expertise" ref={root} tabIndex={-1}>
      <SectionHead n="03" label="Expertise" reduced={reduced} />
      <h2 className="huge">What I<br />work <span className="outline">with</span></h2>
      <div className="xlist">
        {skills.map((g, i) => (
          <div className="xrow" key={g.group}>
            <i className="xrow__rule" />
            <h3 className="xrow__name"><span className="mono">0{i + 1}</span> {g.group}</h3>
            <ul className="xrow__items">{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  )
}
