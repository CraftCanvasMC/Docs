import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';
import { icons } from 'lucide-react';
import type React from 'react';
import { docs, meta } from '~/.source';

export const source = loader({
  baseUrl: '/',
  source: createMDXSource(docs, meta),
  icon: (icon: string | undefined) => {
    const Icon = icon && (icons as Record<string, React.ComponentType>)[icon];
    return Icon ? <Icon /> : undefined;
  },
});
