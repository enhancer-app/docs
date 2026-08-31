import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import logo from '../assets/logo.png';
import { DiscordIcon, XIcon } from '@/components/icons';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image src={logo} alt="Enhancer logo" width={24} height={24} className="rounded-md" />
          <span>{appName}</span>
        </>
      ),
    },
    links: [
      {
        type: 'icon',
        url: 'https://sh.enhancer.at/discord',
        icon: <DiscordIcon />,
        label: 'Discord',
        text: 'Discord',
      },
      {
        type: 'icon',
        url: 'https://sh.enhancer.at/twitter',
        icon: <XIcon />,
        label: 'X (Twitter)',
        text: 'X (Twitter)',
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
