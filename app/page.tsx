import Link from "next/link"
import Image from "next/image"
import { CameraIcon, PaletteIcon, DownloadIcon, SparklesIcon } from "lucide-react"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-veo-bg text-white">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center bg-veo-bg border-b border-gray-800">
        <Link href="#" className="flex items-center justify-center">
          <Image
            src={`/assets/favicon.svg?height=96&width=96`}
            width="96"
            height="96"
            alt={`LOGO`}
            className="aspect-square object-cover"
          />
          <span className="ml-2 text-lg font-semibold">InkYou</span>
        </Link>
        <nav className="ml-auto flex gap-6 sm:gap-8">
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200"
          >
            Como Funciona
          </Link>
          <Link
            href="#styles"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200"
          >
            Estilos
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200"
          >
            Contato
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-32 lg:py-40 bg-veo-bg">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-6xl xl:text-7xl text-white">
                    Transforme suas fotos em arte
                  </h1>
                  <p className="max-w-[600px] text-gray-400 text-lg md:text-xl leading-relaxed">
                    Envie sua foto e escolha entre diversos estilos de desenho: gibi, cartoon, HQ, mangá e muito mais.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#upload"
                    className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200"
                  >
                    Comece Agora
                  </Link>
                  <Link
                    href="#styles"
                    className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gray-300 bg-transparent border border-gray-700 hover:bg-gray-800 hover:text-white rounded-lg transition-colors duration-200"
                  >
                    Ver Estilos
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/placeholder.svg?height=500&width=500&text=Arte+Digital"
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
        <section id="how-it-works" className="w-full py-24 md:py-32 bg-veo-bg">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-white">Como Funciona</h2>
              <p className="max-w-[800px] mx-auto text-gray-400 text-lg">
                Transformar suas fotos em arte digital é simples e rápido
              </p>
            </div>
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-center space-y-4">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-veo-card">
                    <CameraIcon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white">1. Envie sua Foto</h3>
                <p className="text-gray-400 leading-relaxed">
                  Faça o upload da foto que você deseja transformar. Aceitamos diversos formatos.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-veo-card">
                    <PaletteIcon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white">2. Escolha seu Estilo</h3>
                <p className="text-gray-400 leading-relaxed">
                  Navegue por nossa biblioteca de estilos e selecione o que mais te agrada.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-veo-card">
                    <DownloadIcon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white">3. Receba sua Arte</h3>
                <p className="text-gray-400 leading-relaxed">
                  Sua foto transformada estará pronta para download em poucos minutos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Styles */}
        <section id="styles" className="w-full py-24 md:py-32 bg-veo-bg">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-white">Estilos Disponíveis</h2>
              <p className="max-w-[800px] mx-auto text-gray-400 text-lg">
                Escolha entre diversos estilos para transformar sua foto
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[
                { name: "Gibi Clássico", desc: "Cores vibrantes e traços marcantes" },
                { name: "Cartoon", desc: "Estilo animado e expressivo" },
                { name: "HQ Realista", desc: "Detalhes e sombras de quadrinhos" },
                { name: "Mangá", desc: "Olhos grandes e linhas dinâmicas" },
                { name: "Aquarela", desc: "Efeito de pintura suave" },
                { name: "Sketch", desc: "Desenho a lápis artístico" },
                { name: "Pop Art", desc: "Cores fortes e contornos definidos" },
                { name: "Pixel Art", desc: "Estilo retrô com blocos de pixels" },
              ].map((style, index) => (
                <div key={index} className="space-y-4 group cursor-pointer">
                  <div className="overflow-hidden rounded-xl transition-transform duration-200 group-hover:scale-105">
                    <Image
                      src={`/placeholder.svg?height=200&width=200&text=${style.name}`}
                      width="200"
                      height="200"
                      alt={`Estilo ${style.name}`}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-white">{style.name}</h3>
                    <p className="text-sm text-gray-400">{style.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upload Section */}
        <section id="upload" className="w-full py-24 md:py-32 bg-veo-bg">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
            <div className="space-y-6 mb-12">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-white">Transforme sua Foto Agora</h2>
              <p className="text-gray-400 text-lg">Envie sua imagem e comece a criar sua arte personalizada</p>
            </div>
            <div className="space-y-6">
              <form className="space-y-4">
                <input
                  id="picture"
                  type="file"
                  className="w-full bg-veo-card text-white border border-gray-700 placeholder:text-gray-400 rounded-lg h-14 py-2 px-4 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary/90 file:cursor-pointer"
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-white hover:bg-primary/90 rounded-lg h-12 text-base font-medium transition-colors duration-200"
                >
                  Enviar Foto e Escolher Estilo
                </button>
              </form>
              <p className="text-xs text-gray-500">
                Ao enviar, você concorda com nossos{" "}
                <Link href="#" className="text-primary hover:text-primary/80 underline">
                  Termos de Serviço
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="w-full py-24 md:py-32 bg-veo-bg">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
            <div className="space-y-6 mb-12">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-white">Fale Conosco</h2>
              <p className="text-gray-400 text-lg">Tem alguma dúvida ou sugestão? Entre em contato conosco</p>
            </div>
            <div className="space-y-4">
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="w-full bg-veo-card text-white border border-gray-700 placeholder:text-gray-400 rounded-lg h-12 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Assunto"
                  className="w-full bg-veo-card text-white border border-gray-700 placeholder:text-gray-400 rounded-lg h-12 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <textarea
                  className="w-full min-h-[120px] bg-veo-card text-white border border-gray-700 placeholder:text-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Sua mensagem"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-primary text-white hover:bg-primary/90 rounded-lg h-12 text-base font-medium transition-colors duration-200"
                >
                  Enviar Mensagem
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
              &copy; {new Date().getFullYear()} InkYou. Todos os direitos reservados.
            </p>
            <nav className="flex gap-6">
              <Link href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200">
                Termos de Serviço
              </Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200">
                Política de Privacidade
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
