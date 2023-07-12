import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LocalBy',
  description: 'LocalBy',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta http-equiv="ScreenOrientation" content="autoRotate:disabled"></meta>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
