// app/layout.tsx

import './globals.css';
import { RootProvider } from 'fumadocs-ui/provider';
import type { Viewport } from 'next';
import type { ReactNode } from 'react';
import { geist, geistMono } from '~/lib/fonts';
import ThemeToggle from './theme';
import BackingClient from './BackingClient';

export const viewport: Viewport = {
  themeColor: '#2a2d30',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      
      <body className="flex min-h-screen flex-col">
        <RootProvider> 
          <BackingClient />
          <header className="flex justify-end p-4 relative z-10">
            <ThemeToggle />
          </header>
          
          <div className="relative z-10">{children}</div>
        </RootProvider>
      </body>
    </html>
  );
}