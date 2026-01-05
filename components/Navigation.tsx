import React, { useState, useEffect } from 'react'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import { Language } from '../App'

interface NavigationProps {
  currentPage: string
  setCurrentPage: (page: string) => void
  language: Language
  changeLanguage: (lang: Language) => void
  churchName: string
  location: string
}

const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  setCurrentPage,
  language,
  changeLanguage,
  churchName,
  location,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [logoClicks, setLogoClicks] = useState(0)

  // 🔐 Hidden admin access (click logo 5 times)
  useEffect(() => {
    if (logoClicks === 5) {
      setCurrentPage('admin-portal')
      setLogoClicks(0)
    }
    const timer = setTimeout(() => setLogoClicks(0), 3000)
    return () => clearTimeout(timer)
  }, [logoClicks, setCurrentPage])

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'ne', label: 'Nepali', native: 'नेपाली' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  ]

  const navItems = [
    { id: 'home', en: 'Home', ne: 'घर', hi: 'होम' },
    { id: 'about', en: 'About', ne: 'बारेमा', hi: 'बारे में' },
    { id: 'branches', en: 'Branches', ne: 'शाखाहरू', hi: 'शाखाएं' },
    { id: 'bible-training', en: 'Academy', ne: 'तालिम', hi: 'प्रशिक्षण' },
  ]

  const currentLangLabel =
    languages.find((l) => l.code === language)?.native || 'English'

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">

          {/* LOGO + NAME */}
          <div
            className="flex items-center cursor-pointer select-none"
            onClick={() => setLogoClicks((p) => p + 1)}
          >
            <img
              src="/logo.png"
              alt="Church Logo"
              className="h-10 w-10 object-contain mr-3"
            />
            <div>
              <div className="font-bold text-lg text-slate-900">
                {churchName}
              </div>
              <div className="text-xs text-gray-500">
                {location}
              </div>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`text-sm font-bold transition ${
                  currentPage === item.id
                    ? 'text-blue-700'
                    : 'text-gray-600 hover:text-blue-700'
                }`}
              >
                {item[language as keyof typeof item] || item.en}
              </button>
            ))}

            {/* LANGUAGE DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 text-sm font-bold text-gray-700"
              >
                <Globe size={14} />
                {currentLangLabel}
                <ChevronDown size={12} />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code)
                        setLangOpen(false)
                      }}
                      className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                    >
                      {lang.native}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id)
                setIsOpen(false)
              }}
              className="block w-full text-left px-6 py-4 font-bold text-gray-700 border-b"
            >
              {item[language as keyof typeof item] || item.en}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navigation
