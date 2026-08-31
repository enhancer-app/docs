import { createMDX } from 'fumadocs-mdx/next';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const buildConfig = {
  output: 'export',
  // GitHub Pages project site is served from a subpath: /docs
  basePath: '/docs',
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

/** @type {import('next').NextConfig} */
const devConfig = {
  basePath: buildConfig.basePath,
  trailingSlash: buildConfig.trailingSlash,
  reactStrictMode: true,
  images: buildConfig.images,
  async redirects() {
    return [
      {
        // convenience in dev: the bare origin lands on the docs home
        source: '/',
        destination: '/docs',
        permanent: false,
        basePath: false,
      },
    ];
  },
};

export default (phase) => {
  const config =
    phase === PHASE_DEVELOPMENT_SERVER ? devConfig : buildConfig;

  return withMDX(config);
};
