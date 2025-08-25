// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,mdx}',
  ],
  theme: { extend: {} },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;

