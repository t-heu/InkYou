import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | InkYou',
  description: 'Learn how InkYou handles your data and privacy.',
  generator: 'theu',
}
import Header from '../../../components/header';

export default function PrivacyPolicy() {
  return (
    <main className="bg-veo-bg text-white">
      <Header />

      <section className="w-full min-h-screen bg-veo-bg text-white py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

          <p className="text-gray-400 mb-4">
            Your privacy is important to us. This policy explains how InkYou collects, uses, and protects your data.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-2">1. No Image Storage</h2>
          <p className="text-gray-400">
            We do <strong>not store</strong> any images you upload. All image processing happens temporarily and is deleted immediately after the artwork is generated.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-2">2. No Personal Data Collection</h2>
          <p className="text-gray-400">
            InkYou does not collect personally identifiable information (PII) unless you explicitly provide it, for example, when contacting support.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-2">3. Cookies and Analytics</h2>
          <p className="text-gray-400">
            We may use basic analytics tools to understand general usage (e.g., page views, most used styles). No tracking cookies or third-party advertising tools are used.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-2">4. Data Security</h2>
          <p className="text-gray-400">
            While we don’t store your data, we still implement secure protocols (e.g., HTTPS) to protect your uploads during processing.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-2">5. Third-Party Services</h2>
          <p className="text-gray-400">
            If we ever use third-party services (e.g., model hosting, image processing APIs), we ensure they meet strict privacy and data handling standards.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-2">6. Contact</h2>
          <p className="text-gray-400">
            If you have questions about privacy or data usage, contact us at <a href="mailto:privacy@inkyou.ai" className="text-purple-400 underline">privacy@inkyou.ai</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
