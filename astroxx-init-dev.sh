#!/bin/bash

# ==== 변수 ====
PROJECT_NAME="astroxx"
TEMPLATE="minimal"  # 다른 템플릿도 가능: blog, docs 등

# ==== 1. 프로젝트 생성 ====
echo "📦 Astro 프로젝트 생성: $PROJECT_NAME"
pnpm create astro@latest "$PROJECT_NAME" -- --template "$TEMPLATE" --typescript --yes

cd "$PROJECT_NAME" || {
  echo "❌ 프로젝트 디렉토리 이동 실패"
  exit 1
}

# ==== 2. Tailwind + MDX 추가 ====
echo "🎨 Tailwind 설치 중..."
pnpm astro add tailwind

echo "📘 MDX 지원 추가 중..."
pnpm astro add mdx

# ==== 3. 의존성 설치 ====
echo "📦 의존성 설치..."
pnpm install

# ==== 4. 개발 서버 실행 ====
echo "🚀 개발 서버 실행 중..."
pnpm dev

