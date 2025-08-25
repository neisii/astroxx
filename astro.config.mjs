import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rss from '@astrojs/rss';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';


export default defineConfig({
  output: "static",
  base: "/astroxx/", // 레포 이름과 일치
  site: "https://neisii.github.io/astroxx",
  integrations: [
    mdx(),
    tailwind(),
    sitemap({
      // 필요시 특정 URL 제외(예: 404 페이지 등)
      filter: (pageUrl) => !pageUrl.endsWith('/404/'),
      changefreq: 'weekly',
      priority: 0.7,
      // 페이지별 세밀조정이 필요하면 serialize에서 분기 가능
      serialize(item) {
        // 포스트는 우선순위 살짝 높게
        if (item.url.includes('/posts/')) item.priority = 0.8;
        return item;
      },
    }),
  ],
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append', properties: { class: 'anchor' } }],
    ],
  },

});
