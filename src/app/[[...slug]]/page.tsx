import { getGithubLastEdit } from 'fumadocs-core/server';
import { Callout } from 'fumadocs-ui/components/callout';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import WorkInProgress from '~/components/work-in-progress';
import { source } from '~/lib/source';
import { baseOptions } from '../layout.config';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  const lastUpdated = await getGithubLastEdit({
    owner: 'CraftCanvasMC',
    repo: 'Docs',
    path: `docs/${page.data._file.path}`,
  });

  return (
    <DocsLayout tree={source.pageTree} {...baseOptions}>
      <DocsPage
        toc={page.data.toc}
        full={page.data.full}
        editOnGithub={{ owner: 'CraftCanvasMC', repo: 'Docs', sha: 'main', path: `docs/${page.data._file.path}` }}
        lastUpdate={lastUpdated ? new Date(lastUpdated) : undefined}
        tableOfContent={{
          single: false,
          style: 'clerk',
        }}
      >
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription className='mb-0'>{page.data.description}</DocsDescription>
        <div className='mb-6 flex flex-col gap-2'>
          {page.data.authors && (
            <div className='flex items-center gap-2'>
              <span className='text-fd-muted-foreground'>Authors:</span>
              {page.data.authors.map(author => (
                <Link
                  key={author}
                  href={`https://github.com/${author}`}
                  className='flex items-center gap-1.5 font-medium underline decoration-2 underline-offset-3 transition-opacity duration-200 hover:opacity-80'
                >
                  <Image
                    src={`https://github.com/${author}.png`}
                    alt={`${author}'s avatar`}
                    width={20}
                    height={20}
                    className='h-5 w-5 rounded-full'
                  />
                  {author}
                </Link>
              ))}
            </div>
          )}
          <div className='flex items-center gap-2'>
            <span className='text-fd-muted-foreground'>Reading time:</span>
            <span>
              {Math.ceil(
                page.data.structuredData.contents.reduce((acc, curr) => acc + curr.content.split(/\s+/).length, 0) /
                  200,
              )}{' '}
              min read
            </span>
          </div>
        </div>
        <DocsBody>
          <hr />
          <MDX
            components={{
              ...defaultMdxComponents,
              WorkInProgress,
              Step,
              Steps,
              Callout,
              Tab,
              Tabs,
            }}
          />
        </DocsBody>
      </DocsPage>
    </DocsLayout>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
