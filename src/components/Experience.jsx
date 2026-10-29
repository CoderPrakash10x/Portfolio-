import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { experience } from '../content'
import SectionHead from './SectionHead'

export default function Experience({ reduced }) {
  const root = useRef(null)
  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from('.erow', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', stagger: 0.12, scrollTrigger: { trigger: '.elist', start: 'top 80%', once: true } })
      gsap.fromTo('.elist__line', { scaleY: 0 }, { scaleY: 1, ease: 'none', transformOrigin: 'top', scrollTrigger: { trigger: '.elist', start: 'top 70%', end: 'bottom 70%', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="sec sec--light experience" id="experience" ref={root} tabIndex={-1}>
      <SectionHead n="04" label="Experience" reduced={reduced} />
      <h2 className="huge">The<br />story so far<span className="dot">.</span></h2>
      <div className="elist">
        <i className="elist__line" aria-hidden="true" />
        {experience.map((e, i) => (
          <div className="erow" key={i}>
            <span className={`mono erow__when ${e.when.startsWith('[') ? 'is-placeholder' : ''}`}>{e.when}</span>
            <div><h3>{e.what}</h3><p className="mono">{e.where}</p></div>
          </div>
        ))}
      </div>
    </section>
  )
}
