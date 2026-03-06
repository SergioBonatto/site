"use client"

import { useEffect, useState } from "react"

const FRAME_WIDTH = 216
const FRAME_HEIGHT = 244

const COLS = 5
const ROWS = 4
const TOTAL_FRAMES = COLS * ROWS

export default function Walker() {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const i = setInterval(() => {
      setFrame(f => (f + 1) % TOTAL_FRAMES)
    }, 80)

    return () => clearInterval(i)
  }, [])

  const col = frame % COLS
  const row = Math.floor(frame / COLS)

  return (
    <div className="walker-wrapper">
      <div
        className="walker"
        style={{
          width: FRAME_WIDTH,
          height: FRAME_HEIGHT,
          backgroundImage: "url(/sprite_transparent.png)",
          backgroundPosition: `-${col * FRAME_WIDTH}px -${row * FRAME_HEIGHT}px`
        }}
      />
    </div>
  )
}