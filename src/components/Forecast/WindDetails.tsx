type WindProps = {
  speed: number
  direction: number
}

export const WindDetails = ({ speed, direction }: WindProps) => {
  return (
    <div className="flex items-center">
      <span className="text-base">{speed} m/s</span>

      <svg
        width="25"
        height="25"
        viewBox="-5 -5 46 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="ml-2 inline-block"
      >
        <path
          d="M18 3L6 33L18 27L30 33L18 3Z"
          stroke="#fff"
          strokeWidth="3"
          fill="none"
          strokeLinejoin="round"
          transform={`rotate(${Math.round(direction)}, 18 18)`}
        />
      </svg>
    </div>
  )
}
