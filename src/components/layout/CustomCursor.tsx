import { useCustomCursor } from '../../hooks/useCustomCursor'

export default function CustomCursor() {
  const { dotRef, outlineRef } = useCustomCursor()

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={outlineRef} className="cursor-outline" />
    </>
  )
}
