import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { RootProvider } from 'fumadocs-ui/provider';

import type { ReactNode } from 'react';

import { Geist, Geist_Mono } from 'next/font/google';

import { source } from '../lib/source';
import './global.css';
import { baseOptions } from './layout.config';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={`${geist.className} ${geistMono.variable}`} suppressHydrationWarning>
      <body className='flex min-h-screen flex-col'>
        <RootProvider>
          <DocsLayout tree={source.pageTree} {...baseOptions}>
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}
