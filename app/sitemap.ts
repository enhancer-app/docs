import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { pageUrl } from '@/lib/shared';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return source.getPages().map((page) => ({ url: pageUrl(page.url) }));
}
