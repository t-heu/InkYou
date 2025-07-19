import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'InkYou - Transforme suas fotos em arte',
  description: 'InkYou é uma plataforma criativa onde qualquer pessoa pode transformar suas fotos ou ideias em ilustrações únicas nos mais diversos estilos: cartoon, gibi, HQ, caricatura, flat design e muito mais. Nosso sistema intuitivo permite que você escolha o estilo artístico desejado, envie uma imagem ou descreva o que quer ver, e pronto – a mágica acontece com a ajuda da inteligência artificial.',
  generator: 'theu',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="theme-color" content="#333" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="See" />
        <meta name="application-name" content="See" />
      </head>
      <body>{children}</body>
    </html>
  )
}