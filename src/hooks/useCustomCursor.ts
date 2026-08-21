import { useEffect, useRef } from 'react'

const DARK_TRIGGER_SELECTOR =
  'h1, h2, h3, h4, h5, h6, a, button, .dark-trigger, .text-grayBlue, .text-white'
const HOVER_TRIGGER_SELECTOR = '.hover-trigger'

/** Ports the original mousemove-driven custom cursor to a React effect. */
export function useCustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const outlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const outline = outlineRef.current
    if (!dot || !outline) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e

      dot.style.left = `${x}px`
      dot.style.top = `${y}px`

      outline.animate({ left: `${x}px`, top: `${y}px` }, { duration: 400, fill: 'forwards' })

      const target = e.target as Element
      const isDark = target.matches?.(DARK_TRIGGER_SELECTOR) || target.closest?.(DARK_TRIGGER_SELECTOR)
      document.body.classList.toggle('on-dark-bg', Boolean(isDark))

      const isHover = target.matches?.(HOVER_TRIGGER_SELECTOR) || target.closest?.(HOVER_TRIGGER_SELECTOR)
      document.body.classList.toggle('hovering', Boolean(isHover))
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return { dotRef, outlineRef }
}
