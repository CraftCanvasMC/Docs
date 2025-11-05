import Link from 'next/link';

export default function WorkInProgress() {
  return (
    <div className='not-prose flex flex-col items-center justify-center gap-2 rounded-lg bg-fd-card p-8 text-center'>
      <p className='text-fd-muted-foreground'>
        Seems like this page is not ready yet. Check back soon for updates or contribute to the project.
      </p>
      <Link
        href='https://github.com/craftcanvasmc/docs/issues'
        className='font-medium underline decoration-fd-muted-foreground underline-offset-3 transition-colors duration-200 hover:decoration-fd-foreground'
        target='_blank'
        rel='noopener noreferrer'
      >
        GitHub Issues
      </Link>
    </div>
  );
}
