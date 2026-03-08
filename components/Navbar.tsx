'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useEnvelope } from '@/context/EnvelopeContext'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About You', href: '/#about-you' },
  { label: 'For You', href: '/#for-you' },
  { label: 'Ours', href: '/#ours' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { envelopeOpened } = useEnvelope()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])
  const [inAboutYou, setInAboutYou] = useState(false)
  const [inForYou, setInForYou] = useState(false)
  const [inOurs, setInOurs] = useState(false)
  const isHome = pathname === '/'
  const hideNav = pathname === '/for-you' && envelopeOpened

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    onScroll()

    const aboutEl = document.getElementById('about-you')
    const forYouEl = document.getElementById('for-you')
    const oursEl = document.getElementById('ours')
    if (!isHome || !aboutEl || !forYouEl) return () => window.removeEventListener('scroll', onScroll)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target.id === 'about-you') {
            setInAboutYou(e.isIntersecting)
            if (e.isIntersecting) { setInForYou(false); setInOurs(false) }
          }
          if (e.target.id === 'for-you') {
            setInForYou(e.isIntersecting)
            if (e.isIntersecting) { setInAboutYou(false); setInOurs(false) }
          }
          if (e.target.id === 'ours') {
            setInOurs(e.isIntersecting)
            if (e.isIntersecting) { setInAboutYou(false); setInForYou(false) }
          }
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(aboutEl)
    observer.observe(forYouEl)
    if (oursEl) observer.observe(oursEl)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [isHome])

  if (hideNav) return null

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '1rem 3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
        background: isHome ? (scrolled ? 'var(--cloud)' : 'transparent') : 'var(--cloud)',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <span
        style={{
          fontFamily: "'TAN Aegean', sans-serif",
          fontSize: 'clamp(1rem, 2.5vw, 1.32rem)',
          color: 'var(--forest)',
        }}
      >
        For my one and only
      </span>

      {isMobile && (
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: 'var(--forest)',
            padding: '0.25rem',
            lineHeight: 1,
          }}
        >
          ☰
        </button>
      )}

      <div style={{
        display: isMobile ? 'none' : 'flex',
        gap: '2rem',
      }}>
        {links.map(({ label, href }) => {
          const isActive = href === '/'
            ? pathname === '/' && !inAboutYou && !inForYou && !inOurs
            : href === '/#about-you'
            ? inAboutYou
            : href === '/#for-you'
            ? inForYou
            : href === '/#ours'
            ? inOurs
            : pathname === href
          return (
          <Link
            key={href}
            href={href}
            style={{
              fontFamily: "'TAN Aegean', sans-serif",
              fontSize: '1.05rem',
              fontWeight: isActive ? 700 : 400,
              color: 'var(--forest)',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              borderBottom: isActive ? '2px solid var(--mango)' : '2px solid transparent',
              paddingBottom: '2px',
              transition: 'border-color 0.2s ease',
            }}
          >
            {label}
          </Link>
          )
        })}
      </div>

      {/* Mobile fullscreen overlay menu */}
      {menuOpen && (
        <div
          role="dialog"
          aria-label="Menu"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 101,
            background: 'rgba(247, 242, 232, 0.95)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
          }}
        >
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--forest)',
              padding: '0.25rem',
            }}
          >
            ×
          </button>
          {links.map(({ label, href }) => {
            const isActive = href === '/'
              ? pathname === '/' && !inAboutYou && !inForYou && !inOurs
              : href === '/#about-you'
              ? inAboutYou
              : href === '/#for-you'
              ? inForYou
              : href === '/#ours'
              ? inOurs
              : pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'TAN Aegean', sans-serif",
                  fontSize: '1.2rem',
                  fontWeight: isActive ? 700 : 400,
                  color: 'var(--forest)',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  borderBottom: isActive ? '2px solid var(--mango)' : '2px solid transparent',
                  paddingBottom: '2px',
                }}
              >
                {label}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}
