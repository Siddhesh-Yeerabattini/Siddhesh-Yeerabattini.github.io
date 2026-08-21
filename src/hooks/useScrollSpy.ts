import { useEffect, useState } from 'react'

/** Highlights whichever section id is currently intersecting the viewport. */
export function useScrollSpy(sectionIds: string[], threshold = 0.3): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)
  const key = sectionIds.join(',')

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { threshold },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, threshold])

  return activeId
}
