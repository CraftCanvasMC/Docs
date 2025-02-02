import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { DocsPageProps } from 'fumadocs-ui/page';

import Image from 'next/image';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className='flex items-center gap-2'>
        <Image src='/icon.png' alt='CanvasMC Logo' width={24} height={24} />
        <span>CanvasMC Docs</span>
      </div>
    ),
  },
  disableThemeSwitch: true,
  githubUrl: 'https://github.com/CraftCanvasMC/Docs',
};

export const docsOptions: Partial<DocsPageProps> = {
  tableOfContent: {
    single: false,
    style: 'clerk',
  },
};
