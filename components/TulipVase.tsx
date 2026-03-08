 'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const tulips = [
  {
    id: 1,
    label: 'About Me',
    href: '/about',
    style: { bottom: '62%', left: '28%' },
    image: '/tulip-1.png',
  },
  {
    id: 2,
    label: 'Growth Numbers',
    href: '/growth',
    style: { bottom: '70%', left: '42%' },
    image: '/tulip-2.png',
  },
  {
    id: 3,
    label: 'Case Studies',
    href: '/cases',
    style: { bottom: '65%', left: '56%' },
    image: '/tulip-3.png',
  },
  {
    id: 4,
    label: "Let's Connect",
    href: '/connect',
    style: { bottom: '58%', left: '68%' },
    image: '/tulip-4.png',
  },
]

export default function TulipVase() {
  const [hovered, setHovered] = useState<number | null>(null)
  const router = useRouter()

  return (
    <div style={{
      position: 'relative',
      width: '600px',
      height: '700px',
      margin: '0 auto',
    }}>
      <img
        src="/vase.png"
        alt="Flower vase"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
        }}
      />

      {tulips.map((tulip) => (
        <motion.div
          key={tulip.id}
          style={{
            position: 'absolute',
            ...tulip.style,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
          animate={{ y: hovered === tulip.id ? -12 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onHoverStart={() => setHovered(tulip.id)}
          onHoverEnd={() => setHovered(null)}
          onClick={() => router.push(tulip.href)}
        >
          <AnimatePresence>
            {hovered === tulip.id && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: 'var(--forest)',
                  color: 'var(--cloud)',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.05em',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
              >
                {tulip.label}
              </motion.div>
            )}
          </AnimatePresence>

          <img
            src={tulip.image}
            alt={tulip.label}
            style={{
              width: '80px',
              height: 'auto',
              filter: hovered === tulip.id
                ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))'
                : 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
              transition: 'filter 0.3s ease',
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}
