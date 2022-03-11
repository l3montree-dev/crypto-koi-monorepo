import React, { FunctionComponent } from 'react'

interface Props {
  circleOneStroke: string
  circleTwoStroke: string
  size: number
  strokeWidth: number
  fill?: string
  progress: number
}
const RoundProgress: FunctionComponent<Props> = (props) => {
  const { size, circleOneStroke, circleTwoStroke, strokeWidth, progress } =
    props
  const center = size / 2
  const radius = size / 2 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius
  return (
    <svg id="round-progress" className="svg" width={size} height={size}>
      <circle
        className="svg-circle-bg"
        stroke={circleOneStroke}
        cx={center}
        cy={center}
        r={radius}
        fill={props.fill ?? 'transparent'}
        strokeWidth={strokeWidth}
      />
      <circle
        className="svg-circle"
        stroke={circleTwoStroke}
        cx={center}
        cy={center}
        fill={'transparent'}
        r={radius}
        strokeDashoffset={1 - progress * circumference}
        strokeDasharray={circumference}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}

export default RoundProgress
