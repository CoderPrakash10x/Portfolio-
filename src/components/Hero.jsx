import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowDown } from 'lucide-react'
import { profile, projects } from '../content'
import { scrollToId } from '../scrollTo'

const Word = ({ text }) => (
  <span className="hero__line" aria-hidden="true">
    <span>{[...text].map((c, i) => <span className="ch" key={i}>{c}</span>)}</span>
  </span>
)

const clockFmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })

export default function Hero({ reduced, ready }) {
  const root = useRef(null)
  const clock = useRef(null)

  // Live local time (Gorakhpur). One text node updated once a second; no re-render.
  useEffect(() => {
    const tick = () => { if (clock.current) clock.current.textContent = `${clockFmt.format(new Date())} IST` }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // Entrance: hidden until the loader finishes, then the name lines rise and the red rule draws.
  // Content stays visible by default; JS only hides it while waiting.
  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      if (!ready) { gsap.set('.hero__line > span', { yPercent: 115 }); gsap.set('.hero__fade', { opacity: 0 }); gsap.set('.hero__sweep', { scaleX: 0 }); return }
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from('.hero__line > span', { yPercent: 115, duration: 1.2, stagger: 0.12 })
        .from('.hero__sweep', { scaleX: 0, duration: 1.2, ease: 'power3.inOut' }, 0.5)
        .from('.hero__fade', { opacity: 0, y: 14, duration: 0.8, stagger: 0.07, ease: 'power3.out' }, 0.6)
    }, root)
    return () => ctx.revert()
  }, [reduced, ready])

  // Scroll: the name lines slide apart and the bottom rows fade. Transform/opacity only.
  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 } })
        .to('.hero__line:nth-child(1)', { xPercent: -6 }, 0)
        .to('.hero__line:nth-child(2)', { xPercent: 6 }, 0)
        .to('.hero__portrait', { xPercent: 42, yPercent: 12, scale: 0.62, opacity: 0.55, duration: 1 }, 0)
        .to('.hero__bottom, .hero__sweep', { opacity: 0, y: -30 }, 0)
    }, root)
    return () => ctx.revert()
  }, [reduced])

  // Pointer: the whole name drifts a few pixels against the cursor, for depth. Mouse only.
  useLayoutEffect(() => {
    if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const title = root.current.querySelector('.hero__title')
    const x = gsap.quickTo(title, 'x', { duration: 1, ease: 'power3' }), y = gsap.quickTo(title, 'y', { duration: 1, ease: 'power3' })
    const move = (e) => { x((e.clientX / window.innerWidth - 0.5) * -22); y((e.clientY / window.innerHeight - 0.5) * -12) }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [reduced])

  return (
    <section className="hero" id="top" ref={root} tabIndex={-1}>
      <div className="hero__meta mono hero__fade">
        <span className="avail"><i aria-hidden="true" />{profile.status}</span>
        <span>Gorakhpur, IN · <span className="hero__clock" ref={clock}>--:--:-- IST</span></span>
      </div>

      <button className="badge hero__fade" onClick={() => scrollToId('about')} aria-label="Scroll to About">
        <svg className="ring" viewBox="0 0 200 200" aria-hidden="true">
          <defs><path id="ringpath" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" /></defs>
          <text><textPath href="#ringpath" textLength="495" lengthAdjust="spacing">Available for work • Building live products • </textPath></text>
        </svg>
        <span className="badge__arrow"><ArrowDown size={18} /></span>
      </button>

      <div className="hero__portrait-wrap" aria-hidden="true"><img className="hero__portrait" src="/me.png" alt="" /></div>
      <h1 className="hero__title" aria-label={profile.name}>
        <Word text="PRAKASH" />
        <Word text="DUBEY" />
      </h1>
      <div className="hero__sweep" aria-hidden="true" />
      <div className="hero__bottom">
        <p className="hero__statement hero__fade">Full-stack developer.<br />I build things people use live.</p>
        <nav className="hero__index mono hero__fade" aria-label="Selected work">
          <h2>Selected work</h2>
          {projects.map((p, i) => <a key={p.title} href="#work" onClick={(e) => { e.preventDefault(); scrollToId('work') }}><span>0{i + 1}</span>{p.title}</a>)}
        </nav>
        <div className="hero__cue mono hero__fade" aria-hidden="true"><i /> Scroll</div>
      </div>
      <span className="hero__mark hero__mark--bl" aria-hidden="true">+</span>
      <span className="hero__mark hero__mark--br" aria-hidden="true">+</span>
    </section>
  )
}
