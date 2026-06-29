import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Investrow — Professional Financial Advisory & Wealth Management',
  description:
    'Investrow is an AMFI Registered Mutual Fund Distributor offering expert financial planning, portfolio management, and wealth advisory services. Start your investment journey today.',
  keywords: [
    'financial advisor',
    'mutual fund distributor',
    'AMFI registered',
    'wealth management',
    'investment planning',
    'SIP calculator',
    'portfolio management',
    'Investrow',
  ],
  authors: [{ name: 'Investrow Financial Advisory' }],
  openGraph: {
    title: 'Investrow — Professional Financial Advisory & Wealth Management',
    description:
      'AMFI Registered Mutual Fund Distributor. Expert financial planning, portfolio management & wealth advisory.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Investrow',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investrow — Professional Financial Advisory',
    description:
      'AMFI Registered Mutual Fund Distributor. Expert financial planning & wealth advisory.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFBFD' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1426' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
                document.documentElement.classList.toggle('dark', isDark);
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
