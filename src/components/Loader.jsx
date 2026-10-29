import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/** Short (~1.2s), skippable, and shown once per session. Never blocks reduced-motion visitors. */
export default function Loader({ reduced, onDone }) {
  const root = useRef(null)
  const count = useRef(null)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    let seen = false
    try { seen = sessionStorage.getItem('seen') === '1' } catch { /* ignore */ }
    if (reduced || seen) { setGone(true); onDone(); return }

    const html = document.documentElement
    html.style.overflow = 'hidden'
    const state = { v: 0 }
    let exited = false
    const exit = () => {
      if (exited) return
      exited = true
      try { sessionStorage.setItem('seen', '1') } catch { /* ignore */ }
      html.style.overflow = ''
      onDone()
      gsap.to(root.current, { yPercent: -100, duration: 0.7, ease: 'power4.inOut', onComplete: () => setGone(true) })
    }
    const tween = gsap.to(state, { v: 100, duration: 1.2, ease: 'power2.inOut', onUpdate: () => { if (count.current) count.current.textContent = String(Math.round(state.v)).padStart(3, '0') }, onComplete: exit })
    root.current.__skip = () => { tween.kill(); exit() }
    return () => { tween.kill(); html.style.overflow = '' }
  }, [reduced]) // eslint-disable-line react-hooks/exhaustive-deps

  if (gone) return null
  return (
    <div className="loader" ref={root} role="status" aria-label="Loading">
      <span className="mono loader__tag">Prakash Dubey / Portfolio</span>
      <span className="loader__count" ref={count}>000</span>
      <button className="loader__skip mono" onClick={() => root.current.__skip?.()}>Skip</button>
    </div>
  )
}
