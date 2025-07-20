'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function Header() {
  const t = useTranslations();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setLanguageMenuOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  const changeLanguage = (lang: string) => {
    const newPath = `/${lang}${pathname.slice(3)}`
    router.push(newPath)
  }

  return (
    <header className="sticky top-0 z-50 mx-4 md:mx-0 flex justify-center transition-all duration-300">
      <div style={{ width: '70rem' }}>
        <div className="mx-auto max-w-7xl rounded-2xl shadow-none px-7 xl:px-0 transition-all duration-300">
          <div className="flex h-[56px] items-center justify-between p-4">
            
            {/* Logo */}
            <Link href="/" className="font-normal flex space-x-1 sm:space-x-2 items-center justify-center text-sm mr-4 px-2 py-1 relative z-20">
              <Image src="/logo.svg" alt="Filfil Codeworks" width={120} height={120} className="h-12 w-12 sm:h-18 sm:w-18" />
              <span className="font-extrabold text-white text-md sm:text-lg">InkYou</span>
            </Link>

            {/* Menu (Desktop) */}
            <div className="w-full hidden md:block">
              <ul className="relative mx-auto flex w-fit rounded-full h-11 px-2 items-center justify-center">
                <li className="z-10 cursor-pointer h-full flex items-center justify-center px-4 py-2 text-sm font-medium text-[#eee] tracking-tight transition-colors duration-200">
                  <Link href="#how-it-works">{t('header_how-it-works')}</Link>
                </li>
                <li className="z-10 cursor-pointer h-full flex items-center justify-center px-4 py-2 text-sm font-medium text-[#eee]/60 hover:text-[#eeee] tracking-tight transition-colors duration-200">
                  <Link href="#styles">{t('header_styles')}</Link>
                </li>
                <li className="z-10 cursor-pointer h-full flex items-center justify-center px-4 py-2 text-sm font-medium text-[#eee]/60 hover:text-[#eeee] tracking-tight transition-colors duration-200">
                  <Link href="#plans">{t('header_plans')}</Link>
                </li>
                <li className="z-10 cursor-pointer h-full flex items-center justify-center px-4 py-2 text-sm font-medium text-[#eee]/60 hover:text-[#eeee] tracking-tight transition-colors duration-200">
                  <Link href="#contact">{t('header_contact')}</Link>
                </li>
              </ul>
            </div>

            {/* Right actions */}
            <div className="flex flex-row items-center gap-1 md:gap-3 shrink-0 relative">

              {/* Language Selector Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="flex items-center gap-1.5 p-2 rounded-md hover:bg-[#444] text-[#eee]/60 transition-all duration-300"
                >
                  <GlobeIcon />
                  <ChevronDownIcon className={`${isLanguageMenuOpen ? 'rotate-180' : ''} transition-transform duration-200`} />
                </button>

                {isLanguageMenuOpen && (
                  <ul className="absolute right-0 mt-2 w-32 rounded-md bg-[#1b1718] shadow-lg p-2 text-sm text-white z-30">
                    <li className="p-2 hover:bg-[#333] cursor-pointer">
                      <button onClick={() => changeLanguage('en')}>🇺🇸 EN</button>
                    </li>
                    <li className="p-2 hover:bg-[#333] cursor-pointer">
                      <button onClick={() => changeLanguage('pt')}>🇧🇷 PT</button>
                    </li>
                    <li className="p-2 hover:bg-[#333] cursor-pointer">
                      <button onClick={() => changeLanguage('es')}>🇪🇸 ES</button>
                    </li>
                  </ul>
                )}
              </div>

              {/* Mobile Menu Icon */}
              <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden border border-[#666] size-8 rounded-md flex items-center justify-center hover:bg-[#333]"
              >
                <MenuIcon />
              </button>
            </div>
          </div>

          {/* Mobile Menu Content */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-2 p-4 rounded-lg bg-[#1b1718] text-white z-20">
              <ul className="space-y-2 text-sm">
                <li className='hover:bg-[#333] p-2'><Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>{t('header_how-it-works')}</Link></li>
                <li className='hover:bg-[#333] p-2'><Link href="#styles" onClick={() => setMobileMenuOpen(false)}>{t('header_styles')}</Link></li>
                <li className='hover:bg-[#333] p-2'><Link href="#plans" onClick={() => setMobileMenuOpen(false)}>{t('header_plans')}</Link></li>
                <li className='hover:bg-[#333] p-2'><Link href="#contact" onClick={() => setMobileMenuOpen(false)}>{t('header_contact')}</Link></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

// Icons as components (or replace with your own system or `lucide-react`)
function GlobeIcon() {
  return (
    <svg className="size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  )
}

function ChevronDownIcon({ className = '' }) {
  return (
    <svg className={`size-4 ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg className="size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  )
}
