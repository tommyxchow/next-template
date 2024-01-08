import { githubRepoUrl } from '@/lib/constants';

export default function Home() {
  return (
    <article>
      <h1>
        Welcome to{' '}
        <a className='underline' href={githubRepoUrl} target='_blank'>
          next-template
        </a>
      </h1>
    </article>
  );
}
