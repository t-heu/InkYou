import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | InkYou',
  description: 'Read the terms and conditions for using InkYou.',
  generator: 'theu',
}

import Header from '../../../components/header';

export default function TermsPage() {
  return (
    <main className="bg-veo-bg text-white">
      <Header />

      <section className="w-full min-h-screen bg-veo-bg text-white py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

          <p className="text-gray-400 mb-4">
            Welcome to <strong>InkYou</strong>. By accessing or using our platform, you agree to be bound by the following terms and conditions.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-2">1. Use of the Platform</h2>
          <p className="text-gray-400">
            InkYou provides a tool to transform user images or text descriptions into stylized artwork using machine learning. You may not use the service for illegal, harmful, or offensive content.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-2">2. Intellectual Property</h2>
          <p className="text-gray-400">
            All generated artworks are owned by the user, but InkYou retains rights to display anonymous samples for promotion. Do not upload content you do not have rights to.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-2">3. User Content</h2>
          <p className="text-gray-400">
            You are responsible for the images and text you upload. We reserve the right to remove content that violates our policies or legal obligations.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-2">4. Availability</h2>
          <p className="text-gray-400">
            While we strive to maintain high availability, InkYou is offered “as-is” without warranties of uptime, accuracy, or performance.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-2">5. Changes to Terms</h2>
          <p className="text-gray-400">
            These terms may be updated occasionally. Continued use of the platform means you accept the latest version.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-2">6. Contact</h2>
          <p className="text-gray-400">
            For questions or concerns, contact us at <a href="mailto:support@inkyou.ai" className="text-purple-400 underline">support@inkyou.ai</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
