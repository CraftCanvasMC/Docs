import './globals.css';
import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';
import { geist, geistMono } from '~/lib/fonts';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className='dark flex min-h-screen flex-col'>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
