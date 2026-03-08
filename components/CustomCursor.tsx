'use client'

import { useEffect, useState, useRef } from 'react'

const SMOOTHING = 0.15 // lower = smoother, slower follow

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0, flip: false })
  const [visible, setVisible] = useState(false)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
      setVisible(true)
    }

    const animate = () => {
      const { x: tx, y: ty } = target.current
      const { x: cx, y: cy } = current.current
      const x = cx + (tx - cx) * SMOOTHING
      const y = cy + (ty - cy) * SMOOTHING
      current.current = { x, y }
      const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0
      setPos({ x, y, flip: x < centerX })
      rafId.current = requestAnimationFrame(animate)
    }

    document.body.style.cursor = 'none'
    window.addEventListener('mousemove', onMove)
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafId.current != null) cancelAnimationFrame(rafId.current)
      document.body.style.cursor = ''
    }
  }, [])

  if (!visible) return null

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        zIndex: 99999,
        pointerEvents: 'none',
      }}
    >
      <img
        src="/mouse.png"
        alt=""
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          width: '48px',
          height: 'auto',
          transform: pos.flip ? 'translate(-50%, -50%) scaleX(-1)' : 'translate(-50%, -50%)',
          transition: 'none',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
        }}
      />
    </div>
  )
}
