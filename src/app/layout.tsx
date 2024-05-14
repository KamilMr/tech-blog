import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kamil Mrówka',
  description: 'Tech Blog',
};

const Header = () => {
  return (
    <header>
      <div className="text-center bg-slate-800 p-8 my-6 rounded-md">
        <Link href="/">
          <h1 className="text-2xl font-bold text-white mt-4">Kamil Mrówka</h1>
        </Link>
        {/*<p className="text-slate-300">Witam na moim blogu</p>{' '}*/}
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer>
      <div className="border-t border-slate-500 mt-12 py-6 text-center text-slate-400">
        <h1> Develop by Kamil Mrówka</h1>
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
