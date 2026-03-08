import Navbar from '@/components/Navbar'
import CustomCursor from '@/components/CustomCursor'
import { EnvelopeProvider } from '@/context/EnvelopeContext'
import './globals.css'

export const metadata = {
  title: 'Lynn Le — Growth & Marketing',
  description: 'Portfolio of Lynn Le, Growth & Marketing specialist based in Melbourne.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning style={{ margin: 0, padding: 0 }}>
        <EnvelopeProvider>
          <CustomCursor />
          <Navbar />
          {children}
        </EnvelopeProvider>
      </body>
    </html>
  )
}
