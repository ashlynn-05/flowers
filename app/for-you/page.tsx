'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useEnvelope } from '@/context/EnvelopeContext'

const CANVAS_W = 29.7
const CANVAS_H = 21

const FRONT_Z = 25

function DraggableItem({ src, initialStyle, animateIn }: { 
  src: string
  initialStyle: React.CSSProperties
  animateIn: boolean 
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [draggedOut, setDraggedOut] = useState(false)

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => { setIsDragging(false); setDraggedOut(true) }}
      initial={{ y: 0, opacity: 0 }}
      animate={animateIn ? { y: -50, opacity: 1 } : { y: 0, opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        ...initialStyle,
        position: 'absolute',
        zIndex: isDragging || draggedOut ? FRONT_Z : (initialStyle.zIndex as number ?? 3),
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      whileDrag={{ scale: 1.03 }}
    >
      <img
        src={src}
        alt=""
        style={{ width: '100%', height: 'auto', display: 'block', pointerEvents: 'none' }}
      />
    </motion.div>
  )
}

export default function ForYou() {
  const [opened, setOpened] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [p4Visible, setP4Visible] = useState(false)
  const router = useRouter()
  const { setEnvelopeOpened } = useEnvelope()

  useEffect(() => {
    if (!opened) return
    const timer = setTimeout(() => setP4Visible(true), 400)
    return () => clearTimeout(timer)
  }, [opened])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const shouldOpen = window.sessionStorage.getItem('forYouOpen')
      if (shouldOpen) {
        window.sessionStorage.removeItem('forYouOpen')
        setOpened(true)
      }
    }
  }, [])

  useEffect(() => {
    setEnvelopeOpened(opened)
  }, [opened, setEnvelopeOpened])

  return (
    <main style={{
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      overflowX: 'hidden',
      overflowY: opened ? 'auto' : 'hidden',
      ...(opened && { scrollSnapType: 'y mandatory' }),
    }}>

      {/* Page 3 — envelope opened */}
      <section style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(opened && { scrollSnapAlign: 'start', scrollSnapStop: 'always' }),
      }}>
      {/* Closed envelope background */}
      <motion.img
        src="/p2-bg.png"
        alt=""
        animate={{ opacity: opened ? 0 : 1 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Open envelope background */}
      <motion.img
        src="/p3-bg.png"
        alt=""
        animate={{ opacity: opened ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Full page container matching Canva 29.7x21 ratio */}
      <div style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}>

        {/* LETTER — draggable */}
        <DraggableItem
          src="/letter.png"
          animateIn={opened}
          initialStyle={{
            left: `${(7.7 / CANVAS_W) * 100}%`,
            top: `${(2.1 / CANVAS_H) * 100}%`,
            width: `${(14.06 / CANVAS_W) * 100}%`,
            transform: 'rotate(1deg)',
            zIndex: 3,
          }}
        />

        {/* FLW — draggable */}
        <DraggableItem
          src="/flw.png"
          animateIn={opened}
          initialStyle={{
            left: `${(8.21 / CANVAS_W) * 100}%`,
            top: `${(6.04 / CANVAS_H) * 100}%`,
            width: `${(5.82 / CANVAS_W) * 100}%`,
            transform: 'rotate(-8.8deg)',
            zIndex: 4,
          }}
        />

        {/* PIC — draggable */}
        <DraggableItem
          src="/pic.png"
          animateIn={opened}
          initialStyle={{
            left: `${(13.9 / CANVAS_W) * 100}%`,
            top: `${(8.18 / CANVAS_H) * 100}%`,
            width: `${(7.46 / CANVAS_W) * 100}%`,
            transform: 'rotate(-67.8deg)',
            zIndex: 4,
          }}
        />

        {/* Envelope — visible on page 3 (opened), front layer, no effects */}
        <img
          src="/envelop.png"
          alt=""
          style={{
            position: 'absolute',
            left: `${(7.1 / CANVAS_W) * 100 + 1.2}%`,
            top: `${(5.78 / CANVAS_H) * 100 - 2}%`,
            width: `${(14.51 / CANVAS_W) * 100}%`,
            transform: 'rotate(-0.6deg)',
            zIndex: 15,
            pointerEvents: 'none',
            opacity: opened ? 1 : 0,
          }}
        />

        {/* Ribbon — centred, clickable; "click to open" shows on hover */}
        <motion.div
          style={{
            position: 'absolute',
            left: '50%',
            top: '68%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            cursor: opened ? 'default' : 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          onClick={() => !opened && setOpened(true)}
        >
          {/* Light pink aura on hover */}
          <motion.div
            animate={{
              opacity: hovered && !opened ? 1 : 0,
              scale: hovered && !opened ? 1 : 0.8,
            }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              inset: '-80px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(242,192,202,0.75) 0%, rgba(242,192,202,0.35) 45%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: -1,
            }}
          />

          {/* Ribbon — centred, 4.5× size */}
          <motion.img
            src="/rib.png"
            alt=""
            animate={{
              y: hovered && !opened ? -14 : 0,
              opacity: opened ? 0 : 1,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            style={{
              width: `${(4.86 / CANVAS_W) * 100 * 2 * 4.5}%`,
              maxWidth: '810px',
              display: 'block',
              pointerEvents: 'none',
              zIndex: 12,
            }}
          />

          {/* Click hint — only when hovering the ribbon */}
          {!opened && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered ? 0.9 : 0 }}
              transition={{ duration: 0.25 }}
              style={{
                fontFamily: "'TAN Aegean', sans-serif",
                fontSize: 'clamp(0.55rem, 1.8vw, 0.65rem)',
                color: '#124224',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                zIndex: 20,
                margin: 0,
                pointerEvents: 'none',
              }}
            >
              click to open ✦
            </motion.p>
          )}
        </motion.div>

        {/* Back button — page 3 back to homepage Page 2 (preserves scroll connection with page 1) */}
        {opened && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => router.push('/#for-you')}
            style={{
              position: 'absolute',
              top: '4%',
              left: '4%',
              zIndex: 30,
              fontFamily: "'TAN Aegean', sans-serif",
              fontSize: 'clamp(0.75rem, 2.2vw, 0.85rem)',
              color: '#124224',
              letterSpacing: '0.08em',
              background: 'transparent',
              border: '1.5px solid #124224',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
            }}
          >
            ← back
          </motion.button>
        )}

        {/* Drag hint after opened */}
        {opened && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.8 }}
            style={{
              position: 'absolute',
              bottom: '6%',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'TAN Aegean', sans-serif",
              fontSize: 'clamp(0.55rem, 1.8vw, 0.65rem)',
              color: '#124224',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              zIndex: 20,
            }}
          >
            please drag them out, mommy
          </motion.p>
        )}
      </div>
      </section>

      {/* Page 4 — appears when scrolling down from page 3 */}
      {opened && (
        <section
          id="for-you-page-4"
          style={{
            minHeight: '100vh',
            width: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            scrollSnapAlign: 'start',
            scrollSnapStop: 'always',
            overflowX: 'hidden',
          }}
        >
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
          <motion.img
            src="/film.png"
            alt="film"
            initial={{ x: '100vw', opacity: 0 }}
            animate={p4Visible ? { x: 0, opacity: 1 } : {}}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.3,
            }}
            style={{
              position: 'relative',
              zIndex: 2,
              width: '75%',
              maxWidth: 'min(900px, 90vw)',
              display: 'block',
              filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.2))',
            }}
          />
        </section>
      )}
    </main>
  )
}
