import type { Metadata } from 'next';
import Link from 'next/link';

import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kamil Mrówka',
  description: 'Tech Blog',
};

const Header = () => {
  return (
    <header>
      <div className="text-center bg-slate-800 p-8 my-6 rounded-md">
        <div className="flex justify-between items-center space-x-6">
          <Link href="/" className="text-white hover:text-slate-300">
            <h1 className="text-2xl font-bold">Kamil Mrówka</h1>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/" className="text-white hover:text-slate-300">
              Home
            </Link>
            <Link href="/about" className="text-white hover:text-slate-300">
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer>
      <div className="border-t border-slate-500 mt-12 py-6 text-center text-slate-400">
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
    <html lang="en">
      <head>
        <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <div className="mx-auto max-w-2xl px-6">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
