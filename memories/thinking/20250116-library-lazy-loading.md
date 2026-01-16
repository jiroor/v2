# 外部ライブラリの遅延ローディング実装方針

## 日付
2025-01-16

## 状況
バンドルサイズ最適化の第一弾として React.lazy() によるページコンポーネントの遅延ローディングを実施し、207.77 KB → 93-95 KB (gzip) に削減した。

しかし、まだ以下の外部ライブラリが初期バンドルに含まれている：
- **html5-qrcode**: QRコードスキャン用（約25KB）
- **qrcode**: QRコード生成用（約10KB）
- **PeerJS**: カメラ映像共有用（約25KB）

これらは特定の機能でのみ使用されるため、遅延ローディングの対象として適している。

## 使用箇所の調査結果

### 1. html5-qrcode
- **使用箇所**: `src/components/Camera/QRScanner.tsx` のみ
- **使用方法**: `Html5Qrcode` クラスをインポートし、カメラでQRコードをスキャン
- **トリガー**: ユーザーがカメラビューワーで「QRコードで接続」ボタンをクリック

### 2. qrcode
- **使用箇所**:
  - `src/pages/OtherTools/QRCodeGenerator.tsx`（主要）
  - `src/pages/Camera/CameraMode.tsx`（QRコード表示）
  - `src/components/Camera/QRScanner.tsx`（依存）
- **使用方法**: `QRCode.toCanvas()` メソッドでQRコードを生成
- **トリガー**:
  - QRコード生成ページを開いた時
  - カメラモードでQRコードを表示する時

### 3. PeerJS
- **使用箇所**:
  - `src/utils/peerUtils.ts`（実装）
  - `src/hooks/usePeer.ts`（型のみ、実装は peerUtils を使用）
  - `src/pages/Camera/CameraMode.tsx`（使用）
- **使用方法**: `Peer` クラスをインポートし、WebRTC P2P通信を実現
- **トリガー**: カメラモードまたはビューワーモードを開いた時

## 検討した実装方法

### 方法A: コンポーネントレベルでの動的インポート
各コンポーネント内で `import()` を使用してライブラリを動的にロード。

**メリット**:
- 実装が局所的で理解しやすい
- エラーハンドリングをコンポーネント内で完結できる

**デメリット**:
- 複数箇所で使用される場合、重複したコードが増える
- ローディング状態の管理が複雑になる

### 方法B: ユーティリティ関数での動的インポート
ライブラリをラップするユーティリティ関数内で動的にロード。

**メリット**:
- 一箇所で管理できる
- 複数のコンポーネントから再利用しやすい
- エラーハンドリングを統一できる

**デメリット**:
- ローディング状態の管理が必要
- コンポーネント側で await を使う必要がある

### 方法C: カスタムフックでの動的インポート
カスタムフック内で動的にロードし、ローディング状態も管理。

**メリット**:
- React のパターンに沿っている
- ローディング状態の管理が自然
- 複数のコンポーネントから使いやすい

**デメリット**:
- 実装が複雑になる
- オーバーエンジニアリングのリスク

## 決定

各ライブラリの使用状況に応じて、最適な方法を選択する：

### 1. html5-qrcode → **方法A（コンポーネントレベル）**
- **理由**: 使用箇所が1箇所のみ（`QRScanner.tsx`）
- **実装**: `useEffect` 内で `import('html5-qrcode')` を使用
- **ローディング状態**: コンポーネント内の `useState` で管理

```typescript
// src/components/Camera/QRScanner.tsx
useEffect(() => {
  let scanner: any = null;

  const initScanner = async () => {
    try {
      const { Html5Qrcode } = await import('html5-qrcode');
      scanner = new Html5Qrcode(elementId);
      // スキャン開始...
    } catch (error) {
      setError('QRスキャナーの読み込みに失敗しました');
    }
  };

  initScanner();

  return () => {
    // クリーンアップ
  };
}, []);
```

### 2. qrcode → **方法A（コンポーネントレベル）**
- **理由**: 使用箇所は複数あるが、各ページで独立して使用
- **実装**: 各コンポーネントの `useEffect` 内で `import('qrcode')` を使用
- **影響箇所**:
  - `QRCodeGenerator.tsx`: テキスト入力時にQRコード生成
  - `CameraMode.tsx`: カメラモード表示時にルームIDのQRコード生成

```typescript
// src/pages/OtherTools/QRCodeGenerator.tsx
useEffect(() => {
  if (!text || !canvasRef.current) return;

  const generateQR = async () => {
    try {
      const QRCode = (await import('qrcode')).default;
      await QRCode.toCanvas(canvasRef.current, text, options);
    } catch (error) {
      console.error('QRコード生成エラー:', error);
    }
  };

  generateQR();
}, [text, size]);
```

### 3. PeerJS → **方法B（ユーティリティ関数）**
- **理由**:
  - `peerUtils.ts` が既に抽象化レイヤーとして存在
  - 複数のコンポーネントから使用される
  - Peer の初期化ロジックが複雑
- **実装**: `peerUtils.ts` の `createPeer()` 関数内で動的インポート
- **メリット**: 既存のアーキテクチャを活かせる

```typescript
// src/utils/peerUtils.ts
export const createPeer = async (roomId?: string): Promise<Peer> => {
  try {
    const { default: Peer } = await import('peerjs');

    const peer = roomId
      ? new Peer(roomId, PEER_CONFIG)
      : new Peer(PEER_CONFIG);

    return peer;
  } catch (error) {
    console.error('PeerJS の読み込みに失敗しました:', error);
    throw new Error('PeerJS の読み込みに失敗しました');
  }
};
```

**注意**: `createPeer()` を非同期関数に変更するため、呼び出し側の変更も必要：
- `usePeer.ts` の `initializePeer()` を `async` に変更
- コンポーネント側で適切にエラーハンドリング

## 期待される効果

### バンドルサイズの削減
- **html5-qrcode**: 約25KB の削減
- **qrcode**: 約10KB の削減
- **PeerJS**: 約25KB の削減
- **合計**: 約60KB の削減（gzip圧縮後）

**最終的な初期ロードサイズ**: 93-95 KB → **約33-35 KB** （推定）

### ユーザー体験への影響
- **初期ロード**: さらに高速化
- **機能使用時**: 初回のみわずかなローディング時間（数百ms）
- **2回目以降**: ブラウザキャッシュにより高速

## リスクと対策

### リスク1: エラーハンドリングの複雑化
- **対策**: 各ライブラリのロードエラーを適切にキャッチし、ユーザーにわかりやすいエラーメッセージを表示

### リスク2: 型定義の問題
- **対策**:
  - PeerJS の型定義は `import type Peer from 'peerjs'` で維持
  - 実行時のみ動的インポート

### リスク3: ローディング状態の管理
- **対策**:
  - 各コンポーネントでローディングインジケーターを表示
  - QRScanner: "QRスキャナーを読み込んでいます..."
  - QRCodeGenerator: "QRコードを生成しています..."
  - Camera: "カメラを準備しています..."

## 実装順序

1. **qrcode** - 最もシンプル、影響範囲が小さい
2. **html5-qrcode** - 使用箇所が1箇所のみ
3. **PeerJS** - 最も複雑、既存の関数をasyncに変更する必要がある

各実装後にビルドして効果を確認し、問題がないことを確認してから次に進む。

## 参考資料

- [Vite - Dynamic Import](https://vitejs.dev/guide/features.html#dynamic-import)
- [MDN - import()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)
- [React - Code Splitting](https://react.dev/reference/react/lazy)
