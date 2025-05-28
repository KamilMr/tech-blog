import Image from 'next/image';
import Link from 'next/link';

import { PostMetadata } from './PostMetadata';
import flagEng from '../../public/flag-for-flag-united-kingdom-svgrepo-com.svg';
import flagPl from '../../public/flag-for-poland-svgrepo-com.svg';

const PostPreview = (props: PostMetadata) => {
  return (
    <div className="border border-slate-300 p-4 rounded-md shadow-sm bg-white relative">
      {/* <Image
        src={props.language === 'English' ? flagEng : flagPl}
        alt="English language"
        height={20}
        className="absolute top-1 right-2 transform translate-x-1/3 -translate-y-1.5 rounded-md"
      /> */}
      <p className="text-sm text-slate-400">{props.date}</p>
      <Link href={`/posts/${props.slug}`}>
        <h1 className="text-violet-600 hover:underline  mb-4">{props.title}</h1>
      </Link>
      <p className="text-slate-700">{props.subtitle}</p>
    </div>
  );
};
export default PostPreview;
