import { useEffect, useRef } from 'react'
import SectionHead from './SectionHead'

/**
 * The one WebGL-free experiment: ~1,200 canvas particles that form a word and scatter away from the pointer.
 * Click bursts them out in signal red. The loop runs only while the section is on screen.
 * Reduced motion: one static frame. Canvas is decorative (aria-hidden), the heading carries the meaning.
 */
export default function Playground({ reduced }) {
  const wrap = useRef(null)
  const canvas = useRef(null)

  useEffect(() => {
    const cv = canvas.current, ctx = cv.getContext('2d')
    const mouse = { x: -9999, y: -9999 }
    let parts = [], w = 0, h = 0, raf = 0, visible = false, dead = false, resizeT

    const setup = async () => {
      try { await document.fonts.load('900 200px "Archivo Variable"') } catch { /* fall back to system font */ }
      if (dead) return
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = wrap.current.clientWidth; h = wrap.current.clientHeight
      cv.width = w * dpr; cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // Sample the word from an offscreen canvas.
      const off = document.createElement('canvas'); off.width = w; off.height = h
      const o = off.getContext('2d')
      const size = Math.min(h * 0.62, (w / 3.4)) 
      o.fillStyle = '#fff'; o.textAlign = 'center'; o.textBaseline = 'middle'
      o.font = `900 ${size}px "Archivo Variable", Arial, sans-serif`
      o.fillText('BUILD', w / 2, h / 2)
      const data = o.getImageData(0, 0, w, h).data
      const step = Math.max(4, Math.round(Math.sqrt((w * h) / 9000)))
      parts = []
      for (let y = 0; y < h; y += step) for (let x = 0; x < w; x += step) {
        if (data[(y * w + x) * 4 + 3] > 128) parts.push({ x: Math.random() * w, y: Math.random() * h, tx: x, ty: y, vx: 0, vy: 0, hot: 0, g: Math.random() < 0.06 })
      }
      if (reduced) { parts.forEach((p) => { p.x = p.tx; p.y = p.ty }); draw() }
      else if (visible) start()
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const sz = 2.4
      for (const col of ['#F7F7F5', '#B7FF35', '#FF3030']) {
        ctx.fillStyle = col
        for (const p of parts) {
          const c = p.hot > 0.05 ? '#FF3030' : p.g ? '#B7FF35' : '#F7F7F5'
          if (c === col) ctx.fillRect(p.x, p.y, sz, sz)
        }
      }
    }
    const frame = () => {
      const R = 110
      for (const p of parts) {
        const dx = mouse.x - p.x, dy = mouse.y - p.y, d2 = dx * dx + dy * dy
        if (d2 < R * R) { const d = Math.sqrt(d2) || 1, f = (1 - d / R) * 6; p.vx -= (dx / d) * f; p.vy -= (dy / d) * f }
        p.vx += (p.tx - p.x) * 0.03; p.vy += (p.ty - p.y) * 0.03
        p.vx *= 0.86; p.vy *= 0.86; p.x += p.vx; p.y += p.vy; p.hot *= 0.96
      }
      draw()
      raf = requestAnimationFrame(frame)
    }
    const start = () => { if (!raf && !reduced) raf = requestAnimationFrame(frame) }
    const stop = () => { cancelAnimationFrame(raf); raf = 0 }

    const move = (e) => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top }
    const leave = () => { mouse.x = mouse.y = -9999 }
    const click = (e) => {
      const r = cv.getBoundingClientRect(), cx = e.clientX - r.left, cy = e.clientY - r.top
      for (const p of parts) { const dx = p.x - cx, dy = p.y - cy, d = Math.hypot(dx, dy) || 1; if (d < 260) { p.vx += (dx / d) * 18; p.vy += (dy / d) * 18; p.hot = 1 } }
    }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop() }, { threshold: 0.05 })
    io.observe(wrap.current)
    cv.addEventListener('pointermove', move); cv.addEventListener('pointerleave', leave); cv.addEventListener('click', click)
    const onResize = () => { clearTimeout(resizeT); resizeT = setTimeout(() => { stop(); setup() }, 200) }
    window.addEventListener('resize', onResize)
    setup()
    return () => { dead = true; stop(); io.disconnect(); clearTimeout(resizeT); cv.removeEventListener('pointermove', move); cv.removeEventListener('pointerleave', leave); cv.removeEventListener('click', click); window.removeEventListener('resize', onResize) }
  }, [reduced])

  return (
    <section className="sec sec--dark play" id="playground" tabIndex={-1}>
      <SectionHead n="05" label="Playground" reduced={reduced} />
      <div className="play__stage" ref={wrap} data-cursor="PLAY">
        <canvas ref={canvas} aria-hidden="true" />
      </div>
      <p className="mono play__hint">Move through it. Click to blow it apart.</p>
    </section>
  )
}
