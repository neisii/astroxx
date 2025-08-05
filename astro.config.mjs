import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind'; // ✅ 이게 권장
import mdx from '@astrojs/mdx';

export default defineConfig({
  base: "/astroxx/",
  integrations: [mdx(),tailwind()]
});
