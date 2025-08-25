import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts');

  return rss({
    // 피드 메타
    title: 'Astroxx Blog',
    description: 'Zenn 스타일의 미니 블로그',
    site: context.site, // astro.config.mjs의 site 값 사용

    // 아이템
    items: posts.map((post) => ({
      link: `/posts/${post.slug}/`,
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: (post.data as any).description ?? '', // 선택 필드면 안전하게
    })),

    // 선택: 피드 경로/언어 등 커스터마이징 가능
    stylesheet: undefined,
    customData: undefined,
  });
}

