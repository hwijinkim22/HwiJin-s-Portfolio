'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const Navigation = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('about')

  const navigationItems = [
    { id: 'about', label: 'About Me' },
    { id: 'skills', label: 'Skills' },
    { id: 'archiving', label: 'Archiving' },
    { id: 'projects', label: 'Projects' },
  ]

  const handleNavClick = (sectionId: string) => {
    if (pathname === '/') {
      router.push(`/#${sectionId}`, { scroll: true })
    } else {
      router.push(`/#${sectionId}`)
    }
    setActiveSection(sectionId)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-black">
            Hwijin's Portfolio
          </Link>
          <div className="flex space-x-8">
            {navigationItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className={`transition-colors duration-300 hover:text-blue-600 ${
                  activeSection === id ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation