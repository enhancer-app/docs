export const appName = 'Enhancer';
export const siteUrl = 'https://docs.enhancer.at';
export const docsRoute = '/';
export const docsImageRoute = '/og';
export const docsContentRoute = '/llms.mdx';

export const gitConfig = {
  user: 'enhancer-app',
  repo: 'docs',
  branch: 'main',
};

/** Absolute URL of a page; the site is exported with trailing slashes. */
export function pageUrl(path: string) {
  return siteUrl + (path.endsWith('/') ? path : `${path}/`);
}
