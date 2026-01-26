import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { MantineProvider } from '@mantine/core';
import './globals.css';
import '@mantine/core/styles.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Habanero Checkout',
  description: 'Habanero Checkout',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-full`}
      >
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
