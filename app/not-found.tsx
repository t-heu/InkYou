// pages/404.tsx
import Link from "next/link";
import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | InkYou</title>
      </Head>
      <section className="w-full min-h-screen flex items-center justify-center bg-veo-bg text-white px-6">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-400 mb-6">Oops! The page you're looking for doesn't exist.</p>

          <Link href="/" passHref>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition">
              Go Back Home
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
