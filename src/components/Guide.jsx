import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { says, scenes } from '../content'
import { isCoarsePointer } from '../hooks'

gsap.registerPlugin(Draggable)

/** A dotted-halftone mascot. Swap this SVG for your own illustration or photo any time. */
function Face() {
  return (
    <svg viewBox="0 0 200 230" role="img" aria-label="Illustrated mascot">
      <defs>
        <pattern id="d1" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r="1.6" fill="#0a0a0a" /></pattern>
        <pattern id="d2" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="0.9" fill="#0a0a0a" /></pattern>
      </defs>
      <path d="M20 230c4-52 36-68 80-68s76 16 80 68z" fill="#faf9f5" stroke="#0a0a0a" strokeWidth="3" />
      <path d="M20 230c4-52 36-68 80-68s76 16 80 68z" fill="url(#d2)" />
      <rect x="82" y="138" width="36" height="34" fill="#faf9f5" stroke="#0a0a0a" strokeWidth="3" />
      <ellipse cx="100" cy="92" rx="58" ry="62" fill="#faf9f5" stroke="#0a0a0a" strokeWidth="3" />
      <path d="M40 84c-6-44 24-72 62-72s62 26 58 70c-10-22-26-30-60-30s-52 12-60 32z" fill="#faf9f5" stroke="#0a0a0a" strokeWidth="3" />
      <path d="M40 84c-6-44 24-72 62-72s62 26 58 70c-10-22-26-30-60-30s-52 12-60 32z" fill="url(#d1)" />
      <g className="eyes">
        <ellipse cx="76" cy="96" rx="9" ry="11" fill="#0a0a0a" /><ellipse cx="124" cy="96" rx="9" ry="11" fill="#0a0a0a" />
        <circle className="pupil" cx="78" cy="92" r="3" fill="#faf9f5" /><circle className="pupil" cx="126" cy="92" r="3" fill="#faf9f5" />
      </g>
      <path d="M78 128c14 14 30 14 44 0" fill="none" stroke="#0a0a0a" strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}

export default function Guide({ reduced }) {
  const box = useRef(null)
  const [say, setSay] = useState(says.top)
  const [grabbed, setGrabbed] = useState(false)

  // Bubble text follows the section in view.
  useEffect(() => {
    const triggers = [...document.querySelectorAll('[data-say]')].map((el) =>
      ScrollTrigger.create({
        trigger: el, start: 'top 55%', end: 'bottom 55%',
        onToggle: (s) => s.isActive && setSay(el.dataset.say === 'project' ? el.dataset.text : says[el.dataset.say] || ''),
      })
    )
    return () => triggers.forEach((t) => t.kill())
  }, [])

  // Pupils follow the pointer; the mascot can be grabbed and flung, then springs back.
  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const pupils = box.current.querySelectorAll('.pupil')
      const move = (e) => {
        const r = box.current.getBoundingClientRect()
        const dx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / 400))
        const dy = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / 400))
        gsap.to(pupils, { x: dx * 3, y: dy * 3, duration: 0.3, overwrite: true })
      }
      if (!isCoarsePointer()) window.addEventListener('pointermove', move)
      Draggable.create(box.current.querySelector('.guide__face'), {
        type: 'x,y', onPress() { setGrabbed(true) },
        onRelease() { setGrabbed(false); gsap.to(this.target, { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.45)' }) },
      })
      gsap.to('.guide__face svg', { y: -4, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      return () => window.removeEventListener('pointermove', move)
    }, box)
    return () => ctx.revert()
  }, [reduced])

  return (
    <div className="guide" ref={box}>
      {say && <p className="bubble" aria-live="polite" key={say}>{grabbed ? 'Whoa, put me down!' : say}</p>}
      <div className="guide__face"><Face /></div>
    </div>
  )
}
