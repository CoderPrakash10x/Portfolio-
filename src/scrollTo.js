/** Scroll to an element id, through Lenis if it's running. */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: 0 })
  else el.scrollIntoView({ behavior: 'smooth' })
  el.focus?.({ preventScroll: true })
}
