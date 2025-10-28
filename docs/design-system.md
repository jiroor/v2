# デザインシステム

## デザインコンセプト

**ミニマリズム**: 必要最小限の要素で最大の機能性を実現

### 原則
1. **シンプル**: 余計な装飾を排除
2. **直感的**: 説明不要で操作可能
3. **一貫性**: 全ツールで統一されたUI
4. **レスポンシブ**: どのデバイスでも快適

## カラーパレット

### プライマリカラー

```css
/* メインカラー */
--color-bg-primary: #ffffff;        /* 背景 */
--color-text-primary: #1a1a1a;      /* メインテキスト */
--color-text-secondary: #6b7280;    /* サブテキスト */

/* アクセントカラー */
--color-accent: #0066cc;            /* リンク、ボタン */
--color-accent-hover: #0052a3;      /* ホバー時 */

/* ボーダー・区切り線 */
--color-border-light: #e5e7eb;      /* 薄いボーダー */
--color-border: #d1d5db;            /* 通常ボーダー */

/* 背景色バリエーション */
--color-bg-secondary: #f9fafb;      /* カード背景 */
--color-bg-hover: #f3f4f6;          /* ホバー背景 */

/* フィードバックカラー */
--color-success: #10b981;           /* 成功 */
--color-error: #ef4444;             /* エラー */
--color-warning: #f59e0b;           /* 警告 */
--color-info: #3b82f6;              /* 情報 */
```

### カラー使用例

| 用途 | カラー | 使用箇所 |
|------|--------|---------|
| ページ背景 | `--color-bg-primary` | body |
| カード背景 | `--color-bg-secondary` | ツールカード |
| テキスト | `--color-text-primary` | 見出し、本文 |
| サブテキスト | `--color-text-secondary` | 説明文 |
| ボタン | `--color-accent` | プライマリボタン |
| ボーダー | `--color-border-light` | 入力欄、区切り線 |

## タイポグラフィ

### フォントファミリー

```css
--font-family-base: -apple-system, BlinkMacSystemFont,
                    "Segoe UI", "Noto Sans JP",
                    sans-serif;

--font-family-mono: "SF Mono", "Consolas",
                    "Courier New", monospace;
```

### フォントサイズ

```css
--font-size-xs: 12px;    /* 0.75rem */
--font-size-sm: 14px;    /* 0.875rem */
--font-size-base: 16px;  /* 1rem - ベース */
--font-size-lg: 18px;    /* 1.125rem */
--font-size-xl: 20px;    /* 1.25rem */
--font-size-2xl: 24px;   /* 1.5rem */
--font-size-3xl: 30px;   /* 1.875rem */
```

### 行間

```css
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

### フォントウェイト

```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### 使用例

```css
/* 大見出し */
h1 {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

/* 中見出し */
h2 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
}

/* 本文 */
body {
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
}
```

## スペーシング

### スペーシングスケール

```css
--spacing-0: 0;
--spacing-1: 4px;     /* 0.25rem */
--spacing-2: 8px;     /* 0.5rem */
--spacing-3: 12px;    /* 0.75rem */
--spacing-4: 16px;    /* 1rem */
--spacing-5: 20px;    /* 1.25rem */
--spacing-6: 24px;    /* 1.5rem */
--spacing-8: 32px;    /* 2rem */
--spacing-10: 40px;   /* 2.5rem */
--spacing-12: 48px;   /* 3rem */
--spacing-16: 64px;   /* 4rem */
```

### マージン・パディング基準

| 用途 | サイズ |
|------|--------|
| 要素間の最小間隔 | `--spacing-2` (8px) |
| 通常の要素間隔 | `--spacing-4` (16px) |
| セクション間隔 | `--spacing-8` (32px) |
| カード内パディング | `--spacing-6` (24px) |
| ボタン内パディング | `--spacing-3` `--spacing-5` |

## レイアウト

### コンテナ幅

```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
```

### ブレークポイント

```css
/* モバイル */
@media (min-width: 640px) { /* sm */ }

/* タブレット */
@media (min-width: 768px) { /* md */ }

/* デスクトップ */
@media (min-width: 1024px) { /* lg */ }

/* 大画面 */
@media (min-width: 1280px) { /* xl */ }
```

### グリッドシステム

基本的にFlexboxを使用

```css
/* ツールカード一覧 */
.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-6);
}
```

## コンポーネント

### ボタン

```css
/* プライマリボタン */
.button-primary {
  padding: var(--spacing-3) var(--spacing-5);
  background: var(--color-accent);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background 0.2s;
}

.button-primary:hover {
  background: var(--color-accent-hover);
}

/* セカンダリボタン */
.button-secondary {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}

.button-secondary:hover {
  background: var(--color-bg-hover);
}
```

### インプット

```css
.input {
  padding: var(--spacing-3) var(--spacing-4);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  transition: border-color 0.2s;
}

.input:focus {
  outline: none;
  border-color: var(--color-accent);
}
```

### カード

```css
.card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
```

## ボーダーラディウス

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;  /* 完全な円形 */
```

## シャドウ

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
```

### 使用例

| 要素 | シャドウ |
|------|---------|
| カード | `--shadow-sm` |
| カードホバー | `--shadow-md` |
| モーダル | `--shadow-xl` |
| ドロップダウン | `--shadow-lg` |

## アニメーション

### トランジション

```css
--transition-fast: 0.15s ease;
--transition-normal: 0.2s ease;
--transition-slow: 0.3s ease;
```

### 基本アニメーション

```css
/* ホバーエフェクト */
.hover-lift {
  transition: transform var(--transition-normal);
}

.hover-lift:hover {
  transform: translateY(-2px);
}

/* フェードイン */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn var(--transition-normal);
}
```

## アイコン

### サイズ

```css
--icon-xs: 12px;
--icon-sm: 16px;
--icon-md: 20px;
--icon-lg: 24px;
--icon-xl: 32px;
```

### アイコンライブラリ

SVGアイコンを直接使用（外部ライブラリ不要）

## レスポンシブデザイン

### モバイルファースト

```css
/* デフォルト: モバイル */
.container {
  padding: var(--spacing-4);
}

/* タブレット以上 */
@media (min-width: 768px) {
  .container {
    padding: var(--spacing-6);
  }
}

/* デスクトップ以上 */
@media (min-width: 1024px) {
  .container {
    padding: var(--spacing-8);
  }
}
```

### タッチターゲットサイズ

- 最小タッチサイズ: 44px × 44px
- ボタン推奨サイズ: 48px以上の高さ

## アクセシビリティ

### コントラスト比

- 通常テキスト: 4.5:1 以上
- 大きいテキスト: 3:1 以上

### フォーカス表示

```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

## ツール別デザイン

### タイマー

- 大きな数字表示 (60px以上)
- 円形プログレスバー
- 目立つスタート/ストップボタン

### テキストツール

- 左右2カラムレイアウト (入力/出力)
- 等幅フォント使用
- 行番号表示オプション

### QRコード生成

- 中央配置のQRコード表示
- ダウンロードボタンを目立たせる
- プレビューサイズ調整可能

## 実装例

```css
/* グローバルスタイル */
:root {
  /* カラー */
  --color-bg-primary: #ffffff;
  --color-text-primary: #1a1a1a;
  --color-accent: #0066cc;

  /* スペーシング */
  --spacing-4: 16px;

  /* タイポグラフィ */
  --font-size-base: 16px;

  /* その他 */
  --radius-md: 8px;
  --transition-normal: 0.2s ease;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  background: var(--color-bg-primary);
  line-height: var(--line-height-normal);
}
```
