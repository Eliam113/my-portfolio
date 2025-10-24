// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Eliam Mputu',
  description: 'My personal portfolio built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <nav>
            {/* Your Navbar component can go here */}
          </nav>
        </header>

        <main>{children}</main>

        <footer>
          {/* Your footer */}
        </footer>
      </body>
    </html>
  )
}
