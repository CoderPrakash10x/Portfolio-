import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

/** Numbered section label with a rule that draws in once. */
export default function SectionHead({ n, label, reduced }) {
  const root = useRef(null)
  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from('.shead__rule', { scaleX: 0, transformOrigin: 'left', duration: 1, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 85%', once: true } })
      gsap.from('.shead__n, .shead__l', { yPercent: 100, duration: 0.7, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: root.current, start: 'top 85%', once: true } })
    }, root)
    return () => ctx.revert()
  }, [reduced])
  return (
    <div className="shead mono" ref={root}>
      <span className="shead__mask"><span className="shead__n">{n}</span></span>
      <span className="shead__mask"><span className="shead__l">{label}</span></span>
      <i className="shead__rule" />
    </div>
  )
}
