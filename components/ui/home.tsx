"use client"

import { useTranslations } from 'next-intl'
import Link from "next/link"
import Image from "next/image"
import { CameraIcon, PaletteIcon, DownloadIcon } from "lucide-react"

import { styles } from "../../constants/styles";

import Form from '../form';
import Header from '../header';

export default function Home() {
  const t = useTranslations();

  return (
    <div className="flex flex-col min-h-screen bg-veo-bg text-white">
      {/* Header */}
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-32 lg:py-40 bg-veo-bg">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-6xl xl:text-7xl text-white">
                    {t('home_title')}
                  </h1>
                  <p className="max-w-[600px] text-gray-400 text-lg md:text-xl leading-relaxed">
                    {t('home_desc')}
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#upload"
                    className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200"
                  >
                    {t('home_btn1')}
                  </Link>
                  <Link
                    href="#styles"
                    className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gray-300 bg-transparent border border-gray-700 hover:bg-gray-800 hover:text-white rounded-lg transition-colors duration-200"
                  >
                    {t('home_btn2')}
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/assets/cartoon.png"
                  width="500"
                  height="500"
                  alt="Exemplo de foto transformada em arte"
                  className="aspect-square overflow-hidden rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="w-full py-12 md:py-32 bg-veo-bg">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-white">{t('home_sec_1_title')}</h2>
              <p className="max-w-[800px] mx-auto text-gray-400 text-lg">
                {t('home_sec_1_desc')}
              </p>
            </div>
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-center space-y-4">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-veo-card">
                    <CameraIcon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white">{t('home_sec_1_step1')}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {t('home_sec_1_step1_desc')}
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-veo-card">
                    <PaletteIcon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white">{t('home_sec_1_step2')}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {t('home_sec_1_step2_desc')}
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-veo-card">
                    <DownloadIcon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white">{t('home_sec_1_step3')}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {t('home_sec_1_step3_desc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Styles */}
        <section id="styles" className="w-full py-12 md:py-32 bg-veo-bg">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-white">{t('home_sec_2_title')}</h2>
              <p className="max-w-[800px] mx-auto text-gray-400 text-lg">
                {t('home_sec_2_desc')}
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {styles.map((style, index) => (
                <div key={index} className="space-y-4 group cursor-pointer">
                  <div className="overflow-hidden rounded-xl transition-transform duration-200 group-hover:scale-105">
                    <Image
                      src={`/assets/${style.link}`}
                      width="200"
                      height="200"
                      alt={`Style ${style.name}`}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-white">{t(style.name)}</h3>
                    <p className="text-sm text-gray-400">{t(style.desc)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upload Section */}
        <Form />

        {/* Contact */}
        <section id="contact" className="w-full py-12 md:py-32 bg-veo-bg">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
            <div className="space-y-6 mb-12">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-white">{t('home_sec_contact_title')}</h2>
              <p className="text-gray-400 text-lg">{t('home_sec_contact_desc')}</p>
            </div>
            <div className="space-y-4">
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder={t('home_sec_contact_input_email')}
                  className="w-full bg-veo-card text-white border border-gray-700 placeholder:text-gray-400 rounded-lg h-12 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder={t('home_sec_contact_input_subject')}
                  className="w-full bg-veo-card text-white border border-gray-700 placeholder:text-gray-400 rounded-lg h-12 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <textarea
                  className="w-full min-h-[120px] bg-veo-card text-white border border-gray-700 placeholder:text-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder={t('home_sec_contact_input_text')}
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-primary text-white hover:bg-primary/90 rounded-lg h-12 text-base font-medium transition-colors duration-200"
                >
                  {t('home_sec_contact_btn')}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-6 border-t border-gray-800 bg-veo-bg">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} InkYou. {t('footer_copy')}
            </p>
            <nav className="flex gap-6">
              <Link href="/terms" className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200">
                {t('footer_terms')}
              </Link>
              <Link href="/privacy" className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200">
                {t('footer_privacy')}
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
