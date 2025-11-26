import Image from 'next/image';
import Link from 'next/link';

const AboutSection = () => {
  return (
    <section className="space-y-8">
      <h2 className="text-4xl font-serif italic">Hi There & Welcome to My Corner of the Web!</h2>

      <div className="space-y-6 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>
          I'm Kamil Mrówka, a web developer dedicated to crafting exceptional digital experiences.
          My approach involves embracing intuition, conducting thorough research, and leveraging
          modern technologies to build outstanding products.
        </p>

        <p>
          I have a profound appreciation for clean code, elegant design, and the principles of
          continuous learning and growth in software development.
        </p>

        <p>
          Feel free to explore my coding endeavors on{' '}
          <Link href="https://github.com" className="underline hover:text-black dark:hover:text-white">
            GitHub
          </Link>{' '}
          or connect with me on social media.
        </p>
      </div>

      <Link
        href="#"
        className="inline-block px-6 py-3 border border-slate-300 dark:border-slate-700 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        Get in Touch
      </Link>
    </section>
  );
};

export default AboutSection;
