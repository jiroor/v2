# patterns.md - 再利用可能なパターンの記録

このファイルは、プロジェクトでよく使う実装パターンやベストプラクティスを記録します。

---

## 📋 パターン記録の目的

- コードの一貫性を保つ
- 新機能実装時の参考にする
- ベストプラクティスを共有
- 車輪の再発明を防ぐ

---

## 🎯 React コンポーネントパターン

### Pattern-001: カスタムフックによる状態管理

**概要**:
ページコンポーネントの状態管理は、カスタムフックに分離する。

**実装例**:
```typescript
// hooks/useTimer.ts
export const useTimer = (initialSeconds: number = 0) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || seconds <= 0) return;

    const intervalId = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, seconds]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setSeconds(initialSeconds);
    setIsRunning(false);
  };

  return { seconds, isRunning, start, pause, reset };
};

// pages/Timer/CountdownTimer.tsx
const CountdownTimer = () => {
  const [inputMinutes, setInputMinutes] = useState(5);
  const { seconds, isRunning, start, pause, reset } = useTimer(inputMinutes * 60);

  return (
    <div>
      {/* UI */}
    </div>
  );
};
```

**メリット**:
- コンポーネントが UI に集中できる
- ロジックの再利用が容易
- テストが書きやすい

**使用箇所**:
- `hooks/useTimer.ts` + `pages/Timer/CountdownTimer.tsx`
- `hooks/useStopwatch.ts` + `pages/Timer/Stopwatch.tsx`
- `hooks/usePomodoro.ts` + `pages/Timer/PomodoroTimer.tsx`
- `hooks/useCamera.ts` + `pages/Camera/CameraMode.tsx`

---

### Pattern-002: LocalStorage による永続化

**概要**:
ユーザー設定やツールの状態を LocalStorage に保存する。

**実装例**:
```typescript
// hooks/useCameraStorage.ts
export const useCameraStorage = () => {
  const saveSettings = (settings: CameraSettings) => {
    localStorage.setItem('cameraSettings', JSON.stringify(settings));
  };

  const loadSettings = (): CameraSettings | null => {
    const saved = localStorage.getItem('cameraSettings');
    return saved ? JSON.parse(saved) : null;
  };

  return { saveSettings, loadSettings };
};
```

**メリット**:
- サーバー不要
- ページリロード後も設定を保持
- プライバシーに配慮

**注意点**:
- JSON.parse のエラーハンドリングを忘れずに
- セキュリティ上の機密情報は保存しない

**使用箇所**:
- `hooks/useCameraStorage.ts`
- `hooks/usePomodoro.ts`（設定の永続化）

---

### Pattern-003: shadcn/ui コンポーネントのカスタマイズ

**概要**:
shadcn/ui コンポーネントは、Tailwind クラスを `className` prop に直接追加してカスタマイズする。

**実装例**:
```tsx
// ✅ 良い例：Tailwind クラスを直接追加
<Input
  type="number"
  value={minutes}
  onChange={(e) => setMinutes(Number(e.target.value))}
  className="w-[60px] h-10 text-center"
/>

<Button
  onClick={handleStart}
  className="h-10 px-6"
>
  開始
</Button>

// ❌ 悪い例：CSS Modules で詳細度を上げる
<Input className={styles.input} />
/* CSS: input.input[type="text"] { height: 40px; } */
```

**理由**:
- shadcn/ui は `cn()` 関数と tailwind-merge でクラス競合を自動解決
- 詳細度の問題が発生しない
- `!important` が不要

**使用箇所**:
- すべての shadcn/ui コンポーネント使用箇所

**参照**:
- `CLAUDE.md` 98-108行目
- `memories/thinking/20251029-tailwind-css-modules-specificity.md`

---

## 🛠️ ユーティリティパターン

### Pattern-004: 型安全なユーティリティ関数

**概要**:
ユーティリティ関数は、必ず TypeScript の型を定義する。

**実装例**:
```typescript
// utils/textUtils.ts
export const countCharacters = (text: string): number => {
  return text.length;
};

export const countWords = (text: string): number => {
  return text.trim().split(/\s+/).filter(Boolean).length;
};

export const countLines = (text: string): number => {
  return text.split('\n').length;
};

// 型定義も明示
export interface TextStats {
  characters: number;
  words: number;
  lines: number;
}

export const getTextStats = (text: string): TextStats => {
  return {
    characters: countCharacters(text),
    words: countWords(text),
    lines: countLines(text),
  };
};
```

**メリット**:
- 型安全性の確保
- IDE の補完が効く
- バグを早期に発見

**使用箇所**:
- `utils/textUtils.ts`
- `utils/colorUtils.ts`
- `utils/randomStringUtils.ts`
- `utils/cameraUtils.ts`

---

### Pattern-005: エラーハンドリングパターン

**概要**:
ユーザーに影響するエラーは、適切にハンドリングして UI に表示する。

**実装例**:
```typescript
// hooks/useCamera.ts
const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode }
    });
    videoRef.current!.srcObject = stream;
    setError(null);
  } catch (err) {
    console.error('Camera error:', err);
    setError('カメラにアクセスできませんでした。権限を確認してください。');
  }
};
```

**メリット**:
- ユーザーに適切なフィードバック
- デバッグが容易
- アプリのクラッシュを防ぐ

**使用箇所**:
- `hooks/useCamera.ts`
- `hooks/usePeer.ts`
- クリップボード API 使用箇所

---

## 📱 アクセシビリティパターン

### Pattern-006: キーボードショートカット

**概要**:
主要な操作にキーボードショートカットを提供する。

**実装例**:
```typescript
// hooks/useKeyboardShortcut.ts
export const useKeyboardShortcut = (
  key: string,
  callback: () => void,
  deps: any[] = []
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === key && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          return;
        }
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, deps);
};

// 使用例
const CountdownTimer = () => {
  const { start, pause } = useTimer();

  useKeyboardShortcut(' ', () => {
    isRunning ? pause() : start();
  }, [isRunning]);
};
```

**メリット**:
- キーボードユーザーの利便性向上
- アクセシビリティ向上
- パワーユーザーの効率化

**使用箇所**:
- `hooks/useKeyboardShortcut.ts`
- タイマー系ページ（スペースキーで開始/停止）

---

### Pattern-007: ARIA ラベルの追加

**概要**:
アイコンボタンやインタラクティブな要素には、ARIA ラベルを追加する。

**実装例**:
```tsx
<Button
  onClick={handleStart}
  aria-label="タイマーを開始"
>
  <Play className="h-4 w-4" />
</Button>

<input
  type="range"
  min="0"
  max="100"
  value={volume}
  onChange={(e) => setVolume(Number(e.target.value))}
  aria-label="音量調整"
/>
```

**メリット**:
- スクリーンリーダー対応
- WCAG 2.1 AA レベル準拠
- ユーザビリティ向上

**使用箇所**:
- すべてのアイコンボタン
- インタラクティブな要素

**参照**:
- `docs/ux-accessibility-guidelines.md`
- `docs/shadcn-ui-accessibility.md`

---

## 🎨 スタイリングパターン

### Pattern-008: レスポンシブデザイン

**概要**:
モバイルファーストでレスポンシブデザインを実装する。

**実装例**:
```tsx
<div className="
  w-full
  max-w-md
  mx-auto
  p-4
  sm:p-6
  md:p-8
">
  <h1 className="
    text-2xl
    sm:text-3xl
    md:text-4xl
    font-bold
  ">
    タイトル
  </h1>
</div>
```

**Tailwind ブレークポイント**:
- デフォルト: モバイル（< 640px）
- `sm:`: タブレット（≥ 640px）
- `md:`: デスクトップ（≥ 768px）
- `lg:`: 大画面（≥ 1024px）

**メリット**:
- モバイルユーザーの体験を優先
- 自然なレスポンシブ対応
- メンテナンスが容易

**使用箇所**:
- すべてのページコンポーネント

---

### Pattern-009: CSS Modules は最小限に

**概要**:
CSS Modules は、Tailwind で表現できない複雑なアニメーションやトランジションにのみ使用する。

**実装例**:
```css
/* components/UpdatePrompt.module.css */
@keyframes slideIn {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.prompt {
  animation: slideIn 0.3s ease-out;
}
```

**原則**:
- 基本的なスタイルは Tailwind を使用
- CSS Modules は複雑なアニメーションのみ
- `!important` は使用しない
- グローバルリセット（`* { margin: 0; }`）は禁止

**使用箇所**:
- `components/UpdatePrompt.module.css`（アニメーション）

**参照**:
- `CLAUDE.md` 398-410行目（Tailwind CSS v4 使用時の重要ルール）

---

## 🚀 パフォーマンスパターン

### Pattern-010: React.lazy によるコード分割

**概要**:
ページコンポーネントは React.lazy で遅延ローディングする。

**実装例**:
```typescript
// App.tsx
import { lazy, Suspense } from 'react';

const CountdownTimer = lazy(() => import('./pages/Timer/CountdownTimer'));
const Stopwatch = lazy(() => import('./pages/Timer/Stopwatch'));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/timer/countdown" element={<CountdownTimer />} />
        <Route path="/timer/stopwatch" element={<Suspense />} />
      </Routes>
    </Suspense>
  );
};
```

**メリット**:
- 初回ロードサイズの削減
- ページ遷移時のみ必要なコードを読み込む
- Core Web Vitals の改善

**注意点**:
- 必ず `Suspense` でラップする
- ローディング UI を提供する

**使用予定箇所**:
- すべてのページコンポーネント（バンドルサイズ最適化で実装予定）

---

### Pattern-011: useMemo/useCallback の使用

**概要**:
高コストな計算やコールバックは、メモ化する。

**実装例**:
```typescript
// 高コストな計算
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.value - b.value);
}, [data]);

// コールバック
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);
```

**使用すべきケース**:
- 高コストな計算（ソート、フィルタリング、複雑な変換）
- 子コンポーネントに渡すコールバック

**使用すべきでないケース**:
- 単純な計算（足し算、文字列結合など）
- 一度だけ実行される処理

**使用箇所**:
- `pages/TextTools/TextDiff.tsx`（差分計算）
- `pages/Home.tsx`（ツールアイコンのマップ）

---

## 🔐 セキュリティパターン

### Pattern-012: クリップボード API の安全な使用

**概要**:
クリップボード API は、HTTPS 環境でのみ使用可能。エラーハンドリングを忘れずに。

**実装例**:
```typescript
// utils/shareUtils.ts
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
};

// 使用例
const handleCopy = async () => {
  const success = await copyToClipboard(roomId);
  if (success) {
    alert('コピーしました');
  } else {
    alert('コピーに失敗しました');
  }
};
```

**注意点**:
- HTTPS 必須（localhost は除く）
- ユーザーのジェスチャー（クリック等）が必要
- エラーハンドリングを必ず実装

**使用箇所**:
- `utils/shareUtils.ts`
- `components/Camera/ShareButton.tsx`

---

## 📝 更新履歴

| 日付 | 変更内容 |
|------|---------|
| 2025-01-16 | patterns.md 初回作成、既存の主要なパターンを記録 |

---

## 💡 パターン記録のテンプレート

新しいパターンを追加する際は、以下のテンプレートを使用してください：

```markdown
### Pattern-[番号]: [パターン名]

**概要**:
[このパターンが何をするか、なぜ使うか]

**実装例**:
\`\`\`typescript
// コード例
\`\`\`

**メリット**:
- メリット1
- メリット2

**注意点**:（必要に応じて）
- 注意点1
- 注意点2

**使用箇所**:
- ファイルパス1
- ファイルパス2

**参照**:（必要に応じて）
- 関連ドキュメントへのリンク
```
