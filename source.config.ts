import { defineConfig, defineDocs, frontmatterSchema } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const { docs, meta } = defineDocs({
  dir: 'docs',
  docs: {
    schema: frontmatterSchema.extend({
      path: z.string().optional(),
      // authors: z
      //   .array(
      //     z
      //       .string()
      //       .regex(/^[a-zA-Z0-9]+$/) // only allow alphanumeric
      //       .transform((s) => s.toLowerCase()),
      //   )
      //   .transform((arr) => [...new Set(arr)]), // remove duplicates
    }),
  },
});

export default defineConfig();
