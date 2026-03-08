'use client'

import { useEffect } from 'react'

export default function AboutYouPage() {
  useEffect(() => {
    window.location.replace('/#about-you')
  }, [])

  return null
}
