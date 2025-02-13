import { remarkMermaid } from '@theguild/remark-mermaid';
import { remarkAdmonition } from 'fumadocs-core/mdx-plugins';
import { defineConfig, defineDocs, frontmatterSchema } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const { docs, meta } = defineDocs({
  dir: 'docs',
  docs: {
    schema: frontmatterSchema.extend({
      authors: z.array(z.string()).optional(),
    }),
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMermaid, remarkAdmonition],
  },
});
