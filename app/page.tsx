'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const CANVAS_W = 29.7

const tulips = [
  {
    id: 1,
    label: 'About You',
    href: '/about-you',
    src: '/tulip-1.png',
    style: { top: '32.0%', left: '34%', width: '16.8%', height: '66.7%', rotate: '-15deg' },
    zIndex: 5,
  },
  {
    id: 2,
    label: 'For You',
    href: '/for-you',
    src: '/tulip-2.png',
    style: { top: '31.8%', left: '46.3%', width: '9.9%', height: '39.5%', rotate: '3deg' },
    zIndex: 3,
  },
  {
    id: 3,
    label: 'Ours',
    href: '/ours',
    src: '/tulip-3.png',
    style: { top: '17.2%', left: '46.3%', width: '8.1%', height: '24.2%', rotate: '0deg' },
    zIndex: 1,
  },
  {
    id: 4,
    label: 'Love You',
    href: '/love-you',
    src: '/tulip-4.png',
    style: { top: '21.05%', left: '47.55%', width: 'min(225px, 90vw)', height: 'min(191px, 76vw)', rotate: '5deg' },
    zIndex: 2,
  },
]

export default function Home() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [visible, setVisible] = useState(false)
  const [forYouHovered, setForYouHovered] = useState(false)
  const [oursVisible, setOursVisible] = useState(false)
  const aboutYouRef = useRef<HTMLDivElement>(null)
  const forYouRef = useRef<HTMLDivElement>(null)
  const oursRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100)
    setVisible(window.scrollY > 100)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = document.getElementById('ours')
    if (!el) return
    const observer = new IntersectionObserver(
      ([e]) => setOursVisible(e.isIntersecting),
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleTulipClick = (href: string, id: number) => {
    if (id === 4) return
    if (id === 1 && href === '/about-you') {
      aboutYouRef.current?.scrollIntoView({ behavior: 'smooth' })
    } else if (id === 2 && href === '/for-you') {
      forYouRef.current?.scrollIntoView({ behavior: 'smooth' })
    } else if (id === 3 && href === '/ours') {
      oursRef.current?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push(href)
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
        overflowY: 'visible',
        background: 'var(--bg)',
        scrollSnapType: 'y mandatory',
      }}
    >
      {/* Hero section */}
      <section
        style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always',
          minHeight: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflowX: 'hidden',
          overflowY: 'hidden',
          background: 'var(--bg)',
        }}
      >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '100vw',
          aspectRatio: '29.7 / 21',
          overflowX: 'hidden',
          overflowY: 'hidden',
        }}
      >
        {/* Background inside fixed-ratio canvas */}
        <img
          src="/hero-bg3.png"
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

        {/* Tulips — positioned using Canva percentages */}
        {tulips.map((tulip) => (
          <motion.div
            key={tulip.id}
            style={{
              position: 'absolute',
              left: tulip.style.left,
              top: tulip.style.top,
              width: tulip.style.width,
              rotate: tulip.style.rotate ?? '0deg',
              zIndex: tulip.zIndex,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            animate={{ y: hovered === tulip.id ? -16 : 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 18 }}
            onHoverStart={() => setHovered(tulip.id)}
            onHoverEnd={() => setHovered(null)}
            onClick={() => handleTulipClick(tulip.href, tulip.id)}
          >
            <AnimatePresence>
              {hovered === tulip.id && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    background: '#124224',
                    color: '#F7F2E8',
                    padding: '5px 14px',
                    borderRadius: '20px',
                    fontSize: 'clamp(0.6rem, 2vw, 0.72rem)',
                    fontFamily: "'TAN Aegean', sans-serif",
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.08em',
                    boxShadow: '0 4px 16px rgba(18,66,36,0.3)',
                    marginBottom: '8px',
                    pointerEvents: 'none',
                  }}
                >
                  {tulip.label}
                </motion.div>
              )}
            </AnimatePresence>

            <img
              src={tulip.src}
              alt={tulip.label}
              style={{
                width: '100%',
                height: 'auto',
                filter: hovered === tulip.id
                  ? 'drop-shadow(0 12px 20px rgba(18,66,36,0.3))'
                  : 'none',
                transition: 'filter 0.3s ease',
              }}
            />
          </motion.div>
        ))}

        {/* Vase — Canva percentages, highest z-index among tulips and text */}
        <img
          src="/bouquet.png"
          alt="Vase"
          style={{
            position: 'absolute',
            left: '30.87%',
            top: '23%',
            width: '34.39%',
            height: 'auto',
            transform: 'rotate(0deg)',
            objectFit: 'contain',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        {/* Tagline at bottom of canvas */}
        <p
          style={{
            position: 'absolute',
            bottom: '12%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: "'TAN Aegean', sans-serif",
            fontSize: 'clamp(0.75rem, 2.5vw, 0.9rem)',
            color: '#124224',
            fontWeight: 600,
            letterSpacing: '0.05em',
            margin: 0,
            zIndex: 4,
            textAlign: 'center',
            whiteSpace: 'pre-line',
          }}
        >
          {`Happy International Women's Day, Mom\nLove you, as always 🌷`}
        </p>
      </div>
      </section>

      {/* About You section — appears when scrolling down */}
      <section
        id="about-you"
        ref={aboutYouRef}
        style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always',
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          overflowX: 'hidden',
          overflowY: 'hidden',
        }}
      >
        <img
          src="/page1-bg.png?v=2"
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
          src="/p1mom1.png"
          alt="mom"
          initial={{ x: -400, opacity: 0 }}
          animate={visible ? { x: 0, opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            left: '22%',
            top: '25%',
            transform: 'translateY(-50%)',
            width: '27.16%',
            zIndex: 2,
            filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.15))',
          }}
        />
        <motion.img
          src="/p1mom2.png"
          alt="mom"
          initial={{ x: 400, opacity: 0 }}
          animate={visible ? { x: 0, opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            right: '20%',
            top: '35%',
            transform: 'translateY(-50%)',
            width: '27.16%',
            zIndex: 2,
            filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.15))',
          }}
        />
      </section>

      {/* Page 2 (For You) — appears when scrolling down from About You */}
      <section
        id="for-you"
        ref={forYouRef}
        style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always',
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          overflowX: 'hidden',
          overflowY: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="/p2-bg.png"
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
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '68%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
          onMouseEnter={() => setForYouHovered(true)}
          onMouseLeave={() => setForYouHovered(false)}
          onClick={() => {
            if (typeof window !== 'undefined') window.sessionStorage.setItem('forYouOpen', '1')
            router.push('/for-you')
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (typeof window !== 'undefined') window.sessionStorage.setItem('forYouOpen', '1')
              router.push('/for-you')
            }
          }}
        >
          <motion.div
            animate={{
              opacity: forYouHovered ? 1 : 0,
              scale: forYouHovered ? 1 : 0.8,
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
          <motion.img
            src="/rib.png"
            alt=""
            animate={{ y: forYouHovered ? -14 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            style={{
              width: `${(4.86 / CANVAS_W) * 100 * 2 * 4.5}%`,
              maxWidth: 'min(810px, 90vw)',
              display: 'block',
              pointerEvents: 'none',
              zIndex: 12,
            }}
          />
          <motion.p
            animate={{ opacity: forYouHovered ? 0.9 : 0 }}
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
        </div>
      </section>

      {/* Ours — appears when scrolling down from For You */}
      <section
        id="ours"
        ref={oursRef}
        style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always',
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          overflowX: 'hidden',
          overflowY: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
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
        {/* Film strip container — no pop-in; strip is static until sliding runs */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            width: '500%',
            overflowX: 'hidden',
            overflowY: 'hidden',
          }}
        >
          <motion.div
            initial={{ x: '0%' }}
            animate={oursVisible ? { x: '-82%' } : { x: '0%' }}
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
            {Array.from({ length: 10 }).map((_, i) => (
              <img
                key={i}
                src="/film.png"
                alt=""
                style={{
                  width: '10%',
                  height: 'auto',
                  display: 'block',
                  flexShrink: 0,
                }}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
