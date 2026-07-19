import Link from 'next/link';

import {getPostMetadata} from './utils';

const focusAreas = [
  {
    icon: '▣',
    title: '01 // System-Level Thinking',
    description: 'Seeing software as connected systems with trade-offs and constraints and more',
  },
  {
    icon: '◇',
    title: '02 // Using Agents Properly',
    description: 'Learning where agents help and where they don\'t',
  },
  {
    icon: '</>',
    title: '03 // Maintaining Coding Ability',
    description: 'I still write and read code',
  },
];

const stack = [
  'Node.js',
  'React',
  'pi.dev',
  'Docker',
  'Git',
  'and ...more',
];

const toIsoDate = (date: string) => {
  const [day, month, year] = date.split('/');
  return year && month && day ? `${year}-${month}-${day}` : date;
};

const Home = () => {
  const recentPosts = getPostMetadata().slice(0, 3);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-24 px-8 py-16">
      <section className="space-y-8">
        <h1 className="text-[clamp(48px,8vw,120px)] font-bold lowercase leading-[0.9] tracking-tighter text-terminal-ink">
          kamilmrowka
        </h1>
        <div className="flex items-center gap-4 text-lg text-terminal-muted md:text-xl">
          <span className="text-terminal-accent">&gt;</span>
          <p>software craftsman.</p>
          <div className="h-5 w-2.5 animate-blink bg-terminal-accent" />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-terminal-accent">
          // about
        </h2>
        <div className="max-w-3xl space-y-6 text-xl leading-relaxed text-terminal-ink md:text-2xl">
          <p>
            I’m a software developer based in Kraków. I work full-time as a
            contractor for Sets Apart, a small UK startup, where I’m currently
            developing a platform for planning, managing, and monitoring drone
            operations for an international client.
          </p>
          <p>
            I also develop my own product,{' '}
            <a
              href="https://www.prostezapisy.pl"
              target="_blank"
              rel="noreferrer"
              className="text-terminal-accent underline-offset-4 hover:underline"
            >
              ProsteZapisy.pl
            </a>
            , a simple online booking system.
          </p>
          <p>
            This is my dev blogging page. To learn more about me, see{' '}
            <a
              href="https://www.kamilmrowka.com"
              target="_blank"
              rel="noreferrer"
              className="text-terminal-accent underline-offset-4 hover:underline"
            >
              my main page
            </a>
            .
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-terminal-accent">
          // focus
        </h2>
        <div className="grid grid-cols-1 gap-px border border-terminal-line bg-terminal-line md:grid-cols-3">
          {focusAreas.map(area => (
            <article
              key={area.title}
              className="space-y-4 bg-terminal-surface p-8 transition-colors hover:bg-[#1c2128]"
            >
              <div className="text-2xl font-bold text-terminal-accent">
                {area.icon}
              </div>
              <h3 className="text-lg font-bold">{area.title}</h3>
              <p className="text-sm leading-relaxed text-terminal-muted">
                {area.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-terminal-accent">
          // stack
        </h2>
        <ul className="flex flex-wrap gap-2">
          {stack.map(item => (
            <li
              key={item}
              className="border border-terminal-line bg-terminal-surface px-4 py-2 text-sm transition-colors hover:border-terminal-accent hover:text-terminal-accent"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-6">
          <h2 className="text-xs uppercase tracking-widest text-terminal-accent">
            // writing
          </h2>
          <Link
            href="/posts"
            className="flex items-center gap-2 text-xs text-terminal-muted transition-colors hover:text-terminal-accent"
          >
            all posts <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="flex flex-col divide-y divide-terminal-line border border-terminal-line">
          {recentPosts.map((post, index) => {
            const primaryTag = post.tags?.[0] || 'writing';

            return (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="group flex flex-col justify-between gap-4 bg-terminal-surface p-8 transition-colors hover:bg-[#1c2128] md:flex-row md:items-center"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    {index === 0 && (
                      <span className="border border-terminal-accent px-2 py-0.5 text-[10px] uppercase tracking-widest text-terminal-accent">
                        featured
                      </span>
                    )}
                    <span className="text-[10px] uppercase tracking-widest text-terminal-muted">
                      {primaryTag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold leading-snug transition-colors group-hover:text-terminal-accent md:text-lg">
                    {post.title}
                  </h3>
                  <p className="max-w-xl text-sm leading-relaxed text-terminal-muted">
                    {post.subtitle}
                  </p>
                </div>
                <div className="flex shrink-0 flex-row items-center gap-4 text-xs text-terminal-muted md:flex-col md:items-end md:gap-2">
                  <span className="whitespace-nowrap">{toIsoDate(post.date)}</span>
                  <span>read</span>
                  <span className="transition-all group-hover:translate-x-1 group-hover:text-terminal-accent">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
