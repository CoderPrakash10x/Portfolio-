import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const words = ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'GSAP', 'Live events']

/**
 * Signal-red band between hero and about.
 * - Always drifting sideways (one looping tween).
 * - Scroll DOWN: it tilts downward and runs forward. Scroll UP: it tilts upward and runs backward.
 *   The last scroll tilt is intentionally held when scrolling stops.
 * Transform only; reduced motion gets a static band.
 */
export default function Marquee({ reduced }) {
  const band = useRef(null)
  const track = useRef(null)

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const loop = gsap.to(track.current, { xPercent: -50, ease: 'none', duration: 34, repeat: -1 })
      const tilt = gsap.quickTo(band.current, 'rotation', { duration: 0.7, ease: 'power3' })
      const st = ScrollTrigger.create({
        start: 0, end: 'max',
        onUpdate: (self) => {
          const v = self.getVelocity()
          tilt(gsap.utils.clamp(-4.5, 4.5, v / 220))
          gsap.to(loop, { timeScale: self.direction * (1 + Math.min(Math.abs(v) / 260, 5)), duration: 0.4, overwrite: true })
        },
      })
      return () => { st.kill() }
    })
    return () => ctx.revert()
  }, [reduced])

  const row = words.map((w) => <span key={w}>{w} <i aria-hidden="true">×</i> </span>)
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__band" ref={band}>
        <div className="marquee__track" ref={track}>{row}{row}{row}{row}</div>
      </div>
    </div>
  )
}
