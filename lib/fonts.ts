import { DM_Sans, Inter } from 'next/font/google';

// Body fonts
export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Note: Syne, Clash Display, Satoshi Bold are custom fonts
// They will be loaded via CSS @font-face or external CDN
