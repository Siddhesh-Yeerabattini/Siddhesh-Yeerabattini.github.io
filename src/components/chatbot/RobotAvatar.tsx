interface RobotAvatarProps {
  scale?: number
  floating?: boolean
}

/** The CSS-drawn robot character used across the toggle button, header, and message bubbles. */
export default function RobotAvatar({ scale = 1, floating = true }: RobotAvatarProps) {
  return (
    <div
      className="robot-container"
      style={{ transform: `scale(${scale})`, animation: floating ? undefined : 'none' }}
    >
      <div className="robot-antenna" />
      <div className="robot-head">
        <div className="robot-eyes">
          <div className="robot-eye" />
          <div className="robot-eye" />
        </div>
      </div>
    </div>
  )
}
