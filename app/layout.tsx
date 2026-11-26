import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Provider } from '@/components/provider';
import { siteUrl } from '@/lib/shared';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Enhancer Docs',
    template: '%s - Enhancer Docs',
  },
  description:
    'Documentation for Enhancer, a free browser extension that supplements streaming platforms with valuable features.',
};

export const viewport: Viewport = {
  themeColor: '#9147FF',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
        <Script
          src="https://umami.igor.ovh/script.js"
          data-website-id="4882a0ff-21a8-45bc-a02a-288a180aec27"
          data-domains="docs.enhancer.at"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
