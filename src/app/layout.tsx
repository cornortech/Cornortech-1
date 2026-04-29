import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DisableInspect from '@/components/DisableInspect';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cornor Tech Pvt. Ltd. | Where Tech Meets Solution | Tilottama, Butwal, Nepal",
    template: '%s | Cornor Tech',
  },
  description: "CornorTech turns ideas into powerful digital solutions. We deliver creative, reliable, and scalable tech services.",
  keywords: [
    'web development Nepal',
    'mobile app development',
    'UI UX design',
    "digital merketing agency",
    'cloud solutions',
    'e-commerce development',
    'Cornor Tech',
    'software company Nepal',
  ],
  authors: [{ name: 'Cornor Tech printTreeView. Ltd' }],
  creator: 'Cornor Tech Pvt. Ltd',
  metadataBase: new URL('https://cornortech.com'), // real domain
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  // when it shared on social media
  openGraph: {
    title: 'Cornor Tech Pvt. Ltd | Web Development $ Digital Solutions',
    description: 'PM-led tech teams for web, mobile, design, and digital marketing.',
    url: 'https://cornortech.com',
    siteName: 'Cornor Tech',
    images: [
      {
        url: '/logo.png', // For search engine
        width: 1200,
        height: 630,
        alt: 'Cornor Tech Pvt. Ltd',
      },
    ],
    locale: 'en_NP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cornor Tech Pvt. Ltd',
    description: 'PM-led tech teams for web, mobile, design, and digital marketing.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <DisableInspect />   

        {children}

      </body>
    </html>
  );
}

