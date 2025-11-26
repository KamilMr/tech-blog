import type { Metadata } from 'next';
import Link from 'next/link';

import { Inter } from 'next/font/google';
import ThemeToggle from '@/components/ThemeToggle';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kamil Mrówka',
  description: 'Tech Blog',
};

const Header = () => {
  return (
    <header className="w-full bg-transparent border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center py-8">
          <Link href="/" className="text-black dark:text-white hover:text-slate-600 dark:hover:text-slate-300">
            <h1 className="text-3xl font-bold">Kamil Mrówka</h1>
          </Link>
          <nav className="flex items-center space-x-8">
            <Link href="/" className="text-black dark:text-white hover:text-slate-600 dark:hover:text-slate-300 text-lg">
              Home
            </Link>
            <Link href="/about" className="text-black dark:text-white hover:text-slate-600 dark:hover:text-slate-300 text-lg">
              About
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer>
      <div className="border-t border-slate-500 dark:border-slate-700 mt-12 py-6 text-center text-slate-400 dark:text-slate-500">
        <h1> Developed by Kamil Mrówka</h1>
      </div>
    </footer>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.toggle('dark', theme === 'dark');
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} h-full flex flex-col bg-white dark:bg-[#171717] text-black dark:text-white`}>
        <Header />
        <main className="flex-1 h-[calc(100vh-80px)] overflow-y-auto">
          <div className="mx-auto max-w-2xl px-6 py-8">
            {children}
            <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}
