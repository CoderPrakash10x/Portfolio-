import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Page-long signal-red thread, built to stay cheap while scrolling.
 * - Waypoints: every [data-thread="l|r|c"] element (side + vertical position via data-at).
 * - The curve (Catmull-Rom + a curl per waypoint) is sampled ONCE into a lookup table.
 * - The SVG is viewport-sized and fixed; the path inside is shifted by -scrollY.
 * - Per scroll frame: a table lookup and two attribute writes. Rebuilds after ScrollTrigger refreshes (pin spacers change layout).
 */
const curl = (x, y, R) => {
  const pts = [[x, y - R * 1.3]]
  for (let k = 0; k < 6; k++) {
    const a = Math.PI / 2 + k * 1.15
    const r = R * (1 - k * 0.09)
    pts.push([x + Math.cos(a) * r, y + Math.sin(a) * r * 0.9])
  }
  pts.push([x, y + R * 1.3])
  return pts
}
const toPath = (p) => {
  let d = `M${p[0][0].toFixed(1)},${p[0][1].toFixed(1)}`
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
  }
  return d
}

export default function Thread({ reduced }) {
  const svg = useRef(null), group = useRef(null), path = useRef(null), head = useRef(null)

  useEffect(() => {
    const N = 700
    let len = 0, xs = [], ys = [], prefMax = [], timer, lastDrawn = -1, lastScroll = -1

    const build = () => {
      const W = document.documentElement.clientWidth, VH = window.innerHeight
      svg.current.setAttribute('width', W); svg.current.setAttribute('height', VH); svg.current.setAttribute('viewBox', `0 0 ${W} ${VH}`)
      const R = Math.max(26, Math.min(90, W * 0.07))
      const pts = [[W * 0.1, 78]]
      document.querySelectorAll('[data-thread]').forEach((el) => {
        const r = el.getBoundingClientRect()
        const y = r.top + window.scrollY + r.height * parseFloat(el.dataset.at || '0.3')
        const s = el.dataset.thread
        const x = s === 'l' ? Math.max(R + 12, W * 0.1) : s === 'r' ? Math.min(W - R - 12, W * 0.9) : W * 0.5
        if (el.dataset.loop === 'no') pts.push([x, y]); else pts.push(...curl(x, y, R))
      })
      path.current.setAttribute('d', toPath(pts))
      len = path.current.getTotalLength()
      xs = []; ys = []; prefMax = []
      let max = 0
      for (let i = 0; i <= N; i++) {
        const p = path.current.getPointAtLength((len * i) / N)
        xs.push(p.x); ys.push(p.y); max = Math.max(max, p.y); prefMax.push(max)
      }
      path.current.style.strokeDasharray = `${len}`
      lastDrawn = -1; lastScroll = -1
      update()
    }
    const update = () => {
      if (!len) return
      const sy = window.scrollY
      if (sy === lastScroll) return
      lastScroll = sy
      let f = N
      if (!reduced) {
        const target = sy + window.innerHeight * 0.62
        let lo = 0, hi = N
        while (lo < hi) { const m = (lo + hi) >> 1; prefMax[m] < target ? (lo = m + 1) : (hi = m) }
        f = lo
      }
      group.current.setAttribute('transform', `translate(0 ${-sy})`)
      if (f !== lastDrawn) {
        lastDrawn = f
        path.current.style.strokeDashoffset = `${len - (len * f) / N}`
        head.current.setAttribute('cx', xs[f]); head.current.setAttribute('cy', ys[f])
      }
    }
    const schedule = () => { clearTimeout(timer); timer = setTimeout(build, 150) }

    build()
    const st = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: update })
    ScrollTrigger.addEventListener('refresh', schedule)
    window.addEventListener('resize', schedule)
    document.fonts?.ready.then(schedule)
    return () => { st.kill(); ScrollTrigger.removeEventListener('refresh', schedule); window.removeEventListener('resize', schedule); clearTimeout(timer) }
  }, [reduced])

  return (
    <div className="thread" aria-hidden="true">
      <svg ref={svg}><g ref={group}><path ref={path} className="thread__path" /><circle ref={head} className="thread__head" r="6" /></g></svg>
    </div>
  )
}
