'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Ours() {
  const [visible, setVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <main style={{
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      overflowX: 'hidden',
      overflowY: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>

      {/* Background */}
      <img
        src="/p4-bg.png"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />

      {/* Film strip container — centered vertically */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '500%',
          overflowX: 'hidden',
          overflowY: 'hidden',
        }}
      >
        {/* Sliding film — 10x width, moves right to left very slowly */}
        <motion.div
          initial={{ x: '0%' }}
          animate={visible ? { x: '-82%' } : { x: '0%' }}
          transition={{
            duration: 600,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
          }}
          style={{
            display: 'flex',
            width: '400%',
          }}
        >
          {/* Repeat film.png 10 times side by side for seamless loop */}
            {Array.from({ length: 10 }).map((_, i) => (
              <img
                key={i}
                src="/film.png"
                alt=""
                style={{
                  width: '10%',
                  height: isMobile ? '120px' : 'auto',
                  display: 'block',
                  flexShrink: 0,
                  objectFit: 'cover',
                }}
              />
            ))}
        </motion.div>
      </motion.div>

    </main>
  )
}
