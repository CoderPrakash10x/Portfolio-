import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollToId } from '../scrollTo'
import { profile } from '../content'

const links = [['about', 'About'], ['work', 'Work'], ['expertise', 'Expertise'], ['experience', 'Experience'], ['contact', 'Contact']]

export default function Nav() {
  const bar = useRef(null)
  // Page progress: a thin red line, scaled by scroll (transform only).
  useEffect(() => {
    const st = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => { bar.current.style.transform = `scaleX(${s.progress})` } })
    return () => st.kill()
  }, [])
  return (
    <>
      <div className="progress" ref={bar} aria-hidden="true" />
      <header className="nav">
        <a className="nav__logo" href="#top" data-magnetic onClick={(e) => { e.preventDefault(); scrollToId('top') }} aria-label={`${profile.name}, back to top`}>PD</a>
        <nav aria-label="Primary" className="nav__links mono">
          {links.map(([id, label], i) => (
            <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollToId(id) }}><span>0{i + 1}</span> {label}</a>
          ))}
        </nav>
      </header>
    </>
  )
}
