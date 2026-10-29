import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * A follower dot added ON TOP of the normal cursor (the native cursor is never hidden).
 * Grows on links/buttons and shows a label (VIEW, COPY, PLAY…) on [data-cursor] elements.
 * Only for fine pointers; off for touch and reduced motion.
 */
export default function Cursor({ reduced }) {
  const root = useRef(null)
  const label = useRef(null)

  useEffect(() => {
    if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = root.current
    el.style.display = 'block'
    const xTo = gsap.quickTo(el, 'x', { duration: 0.3, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.3, ease: 'power3' })
    const move = (e) => { xTo(e.clientX); yTo(e.clientY) }
    const over = (e) => {
      const t = e.target.closest?.('[data-cursor], a, button')
      if (!t) { el.dataset.state = ''; label.current.textContent = ''; return }
      const l = t.dataset.cursor
      el.dataset.state = l ? 'label' : 'link'
      label.current.textContent = l || ''
    }
    const leave = () => { el.style.opacity = 0 }
    const enter = () => { el.style.opacity = 1 }
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over)
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
    }
  }, [reduced])

  return (
    <div className="cursor" ref={root} aria-hidden="true">
      <span className="cursor__dot" />
      <span className="cursor__label mono" ref={label} />
    </div>
  )
}
