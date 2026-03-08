'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

type EnvelopeContextType = {
  envelopeOpened: boolean
  setEnvelopeOpened: (opened: boolean) => void
}

const EnvelopeContext = createContext<EnvelopeContextType | null>(null)

export function EnvelopeProvider({ children }: { children: ReactNode }) {
  const [envelopeOpened, setEnvelopeOpened] = useState(false)
  return (
    <EnvelopeContext.Provider value={{ envelopeOpened, setEnvelopeOpened }}>
      {children}
    </EnvelopeContext.Provider>
  )
}

export function useEnvelope() {
  const ctx = useContext(EnvelopeContext)
  if (!ctx) return { envelopeOpened: false, setEnvelopeOpened: () => {} }
  return ctx
}
