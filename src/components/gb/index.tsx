"use client"

import { useEffect, useState } from "react"

const FRAME_WIDTH = 216
const FRAME_HEIGHT = 244

const COLS = 5
const ROWS = 4
const TOTAL_FRAMES = COLS * ROWS

const SCALE = 0.3

export default function Walker() {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const i = setInterval(() => {
      setFrame(f => (f + 1) % TOTAL_FRAMES)
    }, 90)

    return () => clearInterval(i)
  }, [])

  const col = frame % COLS
  const row = Math.floor(frame / COLS)

  const scaledWidth = FRAME_WIDTH * SCALE
  const scaledHeight = FRAME_HEIGHT * SCALE

  return (
    <div className="walker-wrapper">
      <div
        className="walker"
        style={{
          width: scaledWidth,
          height: scaledHeight,
          backgroundImage: "url(/sprite_transparent.png)",
          backgroundSize: `${COLS * FRAME_WIDTH * SCALE}px ${ROWS * FRAME_HEIGHT * SCALE}px`,
          backgroundPosition: `-${col * FRAME_WIDTH * SCALE}px -${row * FRAME_HEIGHT * SCALE}px`
        }}
      />
    </div>
  )
}