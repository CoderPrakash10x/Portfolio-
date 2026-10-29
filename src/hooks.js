import { useEffect, useState } from 'react'

/** True when the visitor asked the OS for less motion. Re-evaluates live. */
export function useReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)'
  const [reduced, setReduced] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

/** Finger-first devices don't get hover/pointer-proximity effects. */
export const isCoarsePointer = () => window.matchMedia('(pointer: coarse)').matches
