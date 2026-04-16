// ============================================
// Hustle Mania — Footer
// ============================================

import Link from 'next/link';

// Inline social SVGs (lucide-react doesn't include brand icons)
function IconInstagram({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function IconX({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-hm-surface-lowest">
      {/* Newsletter Banner */}
      <div className="bg-hm-brand-red">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h3 className="text-headline-md text-white">JOIN THE SYNDICATE</h3>
              <p className="text-sm text-white/80 mt-1">
                Early access to drops, exclusive offers, and street culture.
              </p>
            </div>
            <form
              className="flex w-full lg:w-auto gap-0"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="flex-1 lg:w-80 bg-white/10 text-white placeholder-white/50 px-5 py-3.5 text-sm font-medium uppercase tracking-wider border-0 focus:outline-none focus:bg-white/20 transition-colors"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="bg-hm-black text-white px-8 py-3.5 text-label-lg font-bold transition-colors hover:bg-white hover:text-hm-black whitespace-nowrap"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black uppercase tracking-tight text-hm-on-surface">
                HUSTLE<span className="text-hm-brand-red">MANIA</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-hm-on-surface-variant leading-relaxed max-w-xs">
              Premium oversized streetwear for those who move with intent. 
              Born from the streets, engineered for precision.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-hm-surface-high text-hm-on-surface-variant transition-all hover:bg-hm-brand-red hover:text-white"
                aria-label="Instagram"
              >
                <IconInstagram size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-hm-surface-high text-hm-on-surface-variant transition-all hover:bg-hm-brand-red hover:text-white"
                aria-label="Twitter"
              >
                <IconX size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-label-lg text-hm-on-surface font-bold mb-5">
              SHOP
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { href: '/shop', label: 'All Products' },
                { href: '/shop?category=tees', label: 'T-Shirts' },
                { href: '/shop?category=hoodies', label: 'Hoodies' },
                { href: '/shop?category=accessories', label: 'Accessories' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-hm-on-surface-variant transition-colors hover:text-hm-on-surface"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-label-lg text-hm-on-surface font-bold mb-5">
              INFO
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { href: '#', label: 'About Us' },
                { href: '#', label: 'Size Guide' },
                { href: '#', label: 'Shipping' },
                { href: '#', label: 'Returns' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-hm-on-surface-variant transition-colors hover:text-hm-on-surface"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-label-lg text-hm-on-surface font-bold mb-5">
              HELP
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { href: '#', label: 'Contact' },
                { href: '#', label: 'FAQs' },
                { href: '#', label: 'Terms' },
                { href: '#', label: 'Privacy' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-hm-on-surface-variant transition-colors hover:text-hm-on-surface"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(93, 63, 59, 0.15)' }}
        >
          <p className="text-label-sm text-hm-on-surface-variant">
            © {new Date().getFullYear()} HUSTLE MANIA. ALL RIGHTS RESERVED.
          </p>
          <p className="text-label-sm text-hm-on-surface-variant">
            BUILT WITH AGGRESSIVE PRECISION
          </p>
        </div>
      </div>
    </footer>
  );
}
