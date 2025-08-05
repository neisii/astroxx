import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind'; // ✅ 이게 권장
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: "static",
  base: "/astroxx/", // ✅ 레포 이름과 일치
  site: "https://neisii.github.io/astroxx",
  integrations: [mdx(),tailwind()]
});
