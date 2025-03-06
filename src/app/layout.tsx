import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import GlobalProvider from '@/providers/GlobalProvider';
import Main from '@/components/layout/main';
import NextTopLoader from 'nextjs-toploader';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Marvel Characters',
  description: 'Marvel Characters App',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <GlobalProvider>
          <NextTopLoader
            showSpinner={false}
            template='<div class="bar" role="bar"/>'
            showAtBottom={false}
          />
          <Header />
          <Main>{children}</Main>
        </GlobalProvider>
      </body>
    </html>
  );
}
