# Tailwind CSS + shadcn/ui セットアップ

## 日付
2025-10-29

## 実装目的
軽量でアクセシビリティに優れたUIライブラリ（shadcn/ui + Tailwind CSS）を導入し、開発効率とコード品質を向上させる。バンドルサイズ100KB未満の制約を維持しながら、手動で実装していたアクセシビリティ対応を自動化する。

---

## 導入したライブラリ

### Tailwind CSS v4.1.16
- **公式サイト**: https://tailwindcss.com/
- **特徴**: CSS-first な設定、Rust製の高速エンジン、JIT（Just-In-Time）コンパイル
- **バンドルサイズ影響**: 約6KB (gzip後)

### shadcn/ui
- **公式サイト**: https://ui.shadcn.com/
- **特徴**: コピー&ペースト方式のコンポーネント集、Radix UI + Tailwind CSS ベース
- **バンドルサイズ影響**: 使用するコンポーネントのみ（完全なTree-shaking）

### 関連パッケージ
- `@tailwindcss/postcss`: Tailwind CSS v4のPostCSSプラグイン
- `clsx`: クラス名の条件付き結合
- `tailwind-merge`: Tailwind CSSクラスの重複削除
- `terser`: JavaScriptミニファイア

---

## セットアップ内容

### 1. インストールしたパッケージ

```bash
# Tailwind CSS関連
npm install -D tailwindcss @tailwindcss/postcss autoprefixer

# shadcn/ui関連
npm install clsx tailwind-merge

# ビルド関連
npm install -D terser
```

### 2. 作成・更新したファイル

#### `/postcss.config.js`（新規作成）
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

PostCSSの設定。Tailwind CSS v4では`@tailwindcss/postcss`を使用。

#### `/tailwind.config.js`（新規作成）
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
}
```

Tailwind CSS v4では、`content`のみを指定。テーマやプラグインの設定はCSSファイル内で行う。

#### `/src/index.css`（新規作成）
```css
@import "tailwindcss";

@theme {
  --font-family-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;

  /* Light mode colors */
  --color-background: oklch(100% 0 0);
  --color-foreground: oklch(9.8% 0 0);
  --color-card: oklch(100% 0 0);
  --color-card-foreground: oklch(9.8% 0 0);
  --color-popover: oklch(100% 0 0);
  --color-popover-foreground: oklch(9.8% 0 0);
  --color-primary: oklch(20% 0 0);
  --color-primary-foreground: oklch(98% 0 0);
  --color-secondary: oklch(96% 0 0);
  --color-secondary-foreground: oklch(20% 0 0);
  --color-muted: oklch(96% 0 0);
  --color-muted-foreground: oklch(45% 0 0);
  --color-accent: oklch(96% 0 0);
  --color-accent-foreground: oklch(20% 0 0);
  --color-destructive: oklch(60% 0.22 25);
  --color-destructive-foreground: oklch(98% 0 0);
  --color-border: oklch(90% 0 0);
  --color-input: oklch(90% 0 0);
  --color-ring: oklch(9.8% 0 0);

  --radius: 0.5rem;
}

* {
  border-color: var(--color-border);
}

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
}
```

**Tailwind CSS v4の新機能**:
- `@import "tailwindcss"`: 従来の`@tailwind base/components/utilities`を置き換え
- `@theme`: CSS変数でテーマを定義
- `oklch()`: 新しいカラーフォーマット（知覚的に均一な色空間）

#### `/src/lib/utils.ts`（新規作成）
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

shadcn/uiコンポーネントで使用するユーティリティ関数。クラス名の条件付き結合とTailwind CSSクラスの重複削除を行う。

#### `/components.json`（新規作成）
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

shadcn/ui CLIの設定ファイル。

#### `/src/vite-env.d.ts`（新規作成）
```typescript
/// <reference types="vite/client" />

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}
```

CSS Modulesの型定義。TypeScriptのビルドエラーを回避。

#### `/tsconfig.json`（更新）
```json
{
  "compilerOptions": {
    // ... 既存の設定 ...

    /* Path Aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },

    // ... 既存の設定 ...
  }
}
```

`@/`エイリアスの追加。shadcn/uiコンポーネントで使用。

#### `/vite.config.ts`（更新）
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
```

Viteの設定に`@/`エイリアスを追加。

#### `/src/main.tsx`（更新）
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'  // 追加
import './App.module.css'
```

`index.css`をインポートしてTailwind CSSを有効化。

---

## バンドルサイズ分析

### ビルド前（Tailwind CSS導入前の最終ビルド）
データなし（未測定）

### ビルド後（Tailwind CSS v4 + shadcn/ui設定完了）
```
dist/index.html                         0.61 kB │ gzip:  0.41 kB
dist/assets/index-QvCDWuiF.css         38.19 kB │ gzip:  6.14 kB
dist/assets/index-uZMJhLYJ.js          64.51 kB │ gzip: 22.47 kB
dist/assets/react-vendor-DaWJ9c0R.js  160.28 kB │ gzip: 52.12 kB
```

#### 合計バンドルサイズ
- **CSS**: 6.14 KB (gzip)
- **JavaScript (main)**: 22.47 KB (gzip)
- **JavaScript (React vendor)**: 52.12 KB (gzip)
- **合計**: **80.73 KB (gzip)**

#### 結果
✅ **100KB制約を満たす**（19.27KB の余裕）

### Tailwind CSSの影響
- CSS: 6.14 KB（予測: 5-10KB → **実測値は予測範囲内**）
- 未使用のクラスはすべて削除され、極めて軽量

---

## Tailwind CSS v4 の新機能と変更点

### 1. CSS-first な設定
- **従来（v3）**: JavaScriptファイル（`tailwind.config.js`）で設定
- **v4**: CSSファイル（`@theme`ブロック）で設定

**メリット**:
- 設定ファイルが不要（オプション）
- CSSネイティブな書き方
- ホットリロードが高速

### 2. `@import "tailwindcss"`
- **従来（v3）**:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- **v4**:
  ```css
  @import "tailwindcss";
  ```

### 3. `oklch()`カラーフォーマット
- **従来**: `hsl()`, `rgb()`
- **v4**: `oklch()` (OKLCH色空間)

**メリット**:
- 知覚的に均一な色空間
- より自然なグラデーション
- アクセシビリティの向上

### 4. PostCSSプラグインの分離
- **従来**: `tailwindcss`
- **v4**: `@tailwindcss/postcss`

### 5. ネイティブPurge機能
- 外部プラグイン不要
- ビルド時間が5倍高速化（公称）

---

## shadcn/uiの使い方

### コンポーネントの追加
```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add dialog
# など
```

### 使用例
```tsx
import { Button } from "@/components/ui/button"

export function MyComponent() {
  return <Button>クリック</Button>
}
```

**メリット**:
- ソースコードを所有（自由にカスタマイズ可能）
- npmパッケージに依存しない
- Tree-shakingが完璧

---

## 今後の移行計画

### Phase 1: 新規コンポーネント（優先度: 高）
新しく作成するコンポーネントはshadcn/uiを使用

### Phase 2: 段階的移行（優先度: 中）
既存のコンポーネントを以下の優先順位で移行：
1. ボタン（Button）
2. 入力フォーム（Input, Textarea, Select）
3. ダイアログ（Dialog）
4. その他のコンポーネント

### Phase 3: CSS Modules削減（優先度: 低）
Tailwind CSSで置き換え可能な部分を特定し、CSS Modulesを削減

### Phase 4: バンドルサイズ最適化（優先度: 低）
最終的なバンドルサイズを分析し、さらなる最適化を実施

---

## リスク・注意点

### 1. Tailwind CSS v4はまだ新しい
- v3からの移行が必要な場合がある
- コミュニティの情報が少ない

**対策**: 公式ドキュメントを参照、v3の知識も活用

### 2. CSS Modulesとの共存
- 一部のコンポーネントはCSS Modulesを使用
- Tailwind CSSとCSS Modulesが混在

**対策**: 段階的に移行、混在は一時的

### 3. shadcn/uiのコンポーネント更新
- コピー&ペースト方式のため、更新は手動

**対策**: 定期的に公式リポジトリをチェック、必要に応じて更新

### 4. カラーコントラスト
- Tailwind CSSのデフォルトカラーはWCAG準拠とは限らない

**対策**: `@theme`でWCAG準拠のカラーを設定（完了）

---

## 完了条件

- [x] Tailwind CSS v4 をインストール
- [x] PostCSS 設定
- [x] `index.css` で Tailwind CSS を読み込み
- [x] `@theme` で WCAG準拠のカラーを設定
- [x] shadcn/ui の設定ファイル作成
- [x] `@/` エイリアスの設定
- [x] `lib/utils.ts` の作成
- [x] ビルド成功確認
- [x] バンドルサイズ測定（100KB未満）
- [x] ドキュメント作成

---

## 参考資料

- [Tailwind CSS v4 公式ドキュメント](https://tailwindcss.com/docs)
- [shadcn/ui 公式サイト](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [OKLCH Color Picker](https://oklch.com/)
