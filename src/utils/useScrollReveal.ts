"use client"
import { useEffect, useRef, useState } from 'react'

/**
 * Returns a ref to attach to any element.
 * `isVisible` becomes true once the element enters the viewport.
 */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el) // fire once
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}
