// import { getGithubLastEdit } from 'fumadocs-core/server';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';
import { docsOptions } from '~/app/layout.config';
import { source } from '~/lib/source';

import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  // const lastUpdated = await getGithubLastEdit({
  //   owner: 'CraftCanvasMC',
  //   repo: 'Docs',
  //   path: `docs/${page.data.path}`,
  // });
  const lastUpdated = null;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      lastUpdate={lastUpdated ? new Date(lastUpdated) : undefined}
      editOnGithub={{
        owner: 'CraftCanvasMC',
        repo: 'Docs',
        sha: 'main',
        path: `docs/${page.data.path || 'index'}.mdx`,
      }}
      {...docsOptions}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
