import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useReducedMotion } from './hooks'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Work from './components/Work'
import Expertise from './components/Expertise'
import Experience from './components/Experience'
import Playground from './components/Playground'
import Contact from './components/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(false)

  // One smooth-scroll system only (Lenis), wired into ScrollTrigger. Off for reduced motion.
  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ lerp: 0.1 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    window.__lenis = lenis
    return () => { gsap.ticker.remove(tick); lenis.destroy(); delete window.__lenis }
  }, [reduced])

  // Magnetic buttons: elements with [data-magnetic] lean toward the pointer. Mouse only.
  useEffect(() => {
    if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const cleanups = [...document.querySelectorAll('[data-magnetic]')].map((el) => {
      const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' })
      const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' })
      const move = (e) => { const r = el.getBoundingClientRect(); x((e.clientX - (r.left + r.width / 2)) * 0.3); y((e.clientY - (r.top + r.height / 2)) * 0.3) }
      const leave = () => { x(0); y(0) }
      el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave)
      return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); gsap.set(el, { x: 0, y: 0 }) }
    })
    return () => cleanups.forEach((c) => c())
  }, [reduced])

  useEffect(() => { document.fonts?.ready.then(() => ScrollTrigger.refresh()) }, [])

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Loader reduced={reduced} onDone={() => setReady(true)} />
      <Cursor reduced={reduced} />
      <Nav />
      <main id="main">
        <Hero reduced={reduced} ready={ready} />
        <Marquee reduced={reduced} />
        <About reduced={reduced} />
        <Work reduced={reduced} />
        <Expertise reduced={reduced} />
        <Experience reduced={reduced} />
        <Playground reduced={reduced} />
        <Contact reduced={reduced} />
      </main>
    </>
  )
}
