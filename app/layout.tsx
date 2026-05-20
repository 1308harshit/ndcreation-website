import type { Metadata } from "next";
import "./globals.css";
import { dmSans, inter } from "@/lib/fonts";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${BRAND.name} | ${BRAND.tagline}`,
  description: BRAND.description,
  keywords: ['AI Development', 'App Development', 'Website Development', 'SaaS', 'UI/UX Design', 'Game Development', 'Automation', 'AI Agents'],
  authors: [{ name: BRAND.name }],
  openGraph: {
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description: BRAND.description,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description: BRAND.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${dmSans.variable} ${inter.variable} antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
