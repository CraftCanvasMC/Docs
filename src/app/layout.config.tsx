import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className='flex items-center gap-2 md:mb-1.5'>
        <Image src='/logo.png' alt='CanvasMC Logo' width={22} height={22} />
        <span>CanvasMC Docs</span>
      </div>
    ),
  },
  disableThemeSwitch: true,
};
