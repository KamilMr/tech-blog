import type {Metadata} from 'next';
import Link from 'next/link';
import {JetBrains_Mono} from 'next/font/google';

import './globals.css';

const jetBrainsMono = JetBrains_Mono({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'dev.kamilmrowka',
  description: 'Backend engineer. Product thinker. Software craftsman.',
};

const Header = () => {
  return (
    <header className="w-full border-b border-terminal-line px-8 py-6">
      <div className="flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 text-terminal-ink">
          <span className="text-terminal-accent animate-pulse">●</span>
          <span className="text-sm tracking-tight">kamil@dev:~$</span>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-4 text-xs uppercase tracking-widest">
            <Link
              href="/"
              className="text-terminal-muted transition-colors hover:text-terminal-accent"
            >
              home
            </Link>
            <Link
              href="/posts"
              className="text-terminal-muted transition-colors hover:text-terminal-accent"
            >
              blog
            </Link>
          </nav>

          <div className="hidden gap-2 sm:flex" aria-hidden="true">
            <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
          </div>
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="w-full border-t border-terminal-line px-8 py-10">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <a
          href="mailto:kamil@dev"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-3 border border-terminal-line px-4 py-2 transition-all hover:border-terminal-accent hover:bg-terminal-accent hover:text-terminal-bg"
        >
          <span className="text-terminal-accent group-hover:text-terminal-bg">&gt;</span>
          <span className="text-sm">mailto: kamil@dev</span>
        </a>

        <div className="flex items-center gap-5 text-sm">
          <a
            href="https://github.com/KamilMr"
            target="_blank"
            rel="noreferrer"
            className="text-terminal-muted transition-colors hover:text-terminal-accent"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/kmwebdev"
            target="_blank"
            rel="noreferrer"
            className="text-terminal-muted transition-colors hover:text-terminal-accent"
          >
            LinkedIn
          </a>
        </div>

        <p className="text-xs text-terminal-muted">© 2025 kamil mrowka</p>
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
    <html lang="en" className="dark h-full">
      <body
        className={`${jetBrainsMono.className} terminal-grid selection-green flex min-h-screen flex-col text-terminal-ink`}
      >
        <Header />
        <main className="w-full flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
