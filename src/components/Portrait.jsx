import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Portrait({ reduced }) {
  const wrap = useRef(null)
  useEffect(() => {
    if (reduced || !wrap.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.portrait img', { opacity: 0, y: 36, scale: 0.96 }, {
        opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: wrap.current, start: 'top 78%', once: true }
      })
    }, wrap)
    return () => ctx.revert()
  }, [reduced])

  return <div className="portrait" ref={wrap}><img src="/me.png" alt="Portrait of Prakash Dubey" loading="lazy" decoding="async" /></div>
}
