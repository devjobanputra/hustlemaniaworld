// ============================================
// Hustle Mania — Root Layout
// ============================================

import type { Metadata } from 'next';
import './globals.css';
import ClientProviders from '@/components/providers/ClientProviders';

export const metadata: Metadata = {
  title: 'HUSTLE MANIA — Premium Oversized Streetwear',
  description:
    'Born from the streets, engineered for precision. Shop oversized tees, hoodies, and accessories from Hustle Mania — the premium streetwear brand for those who move with intent.',
  keywords: ['streetwear', 'oversized', 'hustle mania', 'urban fashion', 'premium tees', 'hoodies'],
  openGraph: {
    title: 'HUSTLE MANIA — Premium Oversized Streetwear',
    description: 'Born from the streets, engineered for precision.',
    type: 'website',
  },
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-hm-bg text-hm-on-surface font-sans antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* All existing UI — sits above the 3D canvas at z-10 */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <ClientProviders>{children}</ClientProviders>
        </div>
      </body>
    </html>
  );
}
