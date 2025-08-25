import matter from 'gray-matter';

const GIST_USER = 'neisii';
const MARKER = '<!-- astroxx: publish -->';

export type GistPost = {
  id: string;
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description?: string;
  content: string;
  url: string;
};

type GistListItem = {
  id: string;
  description: string | null;
  updated_at: string;
  html_url: string;
  files: Record<
    string,
    { filename: string; raw_url: string; language?: string }
  >;
};

function kebabCase(s: string) {
  return s
    .toLowerCase()
    .replace(/[^\w가-힣\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export async function fetchGistMarkdownPosts(): Promise<GistPost[]> {
  const listRes = await fetch(
    `https://api.github.com/users/${GIST_USER}/gists?per_page=100`
  );
  if (!listRes.ok) {
    console.error('Failed to fetch gists', await listRes.text());
    return [];
  }
  const gists = (await listRes.json()) as GistListItem[];

  const posts: GistPost[] = [];

  for (const g of gists) {
    const file = Object.values(g.files).find(
      (f) => f.filename.endsWith('.md') || f.filename.endsWith('.mdx')
    );
    if (!file) continue;

    const rawRes = await fetch(file.raw_url);
    if (!rawRes.ok) continue;
    const raw = await rawRes.text();

    // 본문에 마커 없으면 제외
    if (!raw.includes(MARKER)) continue;

    const {

