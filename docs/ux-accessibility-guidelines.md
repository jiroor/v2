# UX・アクセシビリティガイドライン

## 日付
2025-10-29

## 目的
プロジェクト全体で一貫したUX・アクセシビリティを実現するためのルールを定義する。WCAG 2.2基準に準拠し、すべてのユーザーにとって使いやすいインターフェースを提供する。

## 1. クリック可能な要素のサイズ

### 最小タッチターゲットサイズ

**WCAG 2.2 Success Criterion 2.5.8 (Level AA)**
- **最小サイズ**: 24 × 24 CSS pixels
- **推奨サイズ**: 44 × 44 CSS pixels（WCAG 2.5.5 Enhanced）

### 実装ルール

1. **ボタン**
   - 最小: 24 × 24 px
   - 推奨: 44 × 44 px 以上
   - パディングを含めたクリック領域全体でサイズを確保

2. **チェックボックス・ラジオボタン**
   - 最小: 24 × 24 px
   - **推奨: 44 × 44 px**（タッチ領域）
   - ラベルもクリック可能にする（`<label>`でラップ）
   - **推奨テクニック**: 視覚的には24pxを保ちつつ、padding + 負のmarginでタッチ領域を44pxに拡大
     ```css
     .checkbox {
       width: 24px;
       height: 24px;
       padding: 10px;      /* 24px + 10px×2 = 44px */
       margin: -10px 0;    /* 上下のみ負のマージン、左右は0でレイアウト保持 */
     }
     ```
   - 上下のみ負のマージンを適用することで、縦方向のタッチ領域を拡大しつつ、水平方向のレイアウトは保持
   - このテクニックにより、デザインのバランスを保ちつつ、WCAGの推奨サイズを満たせる

3. **アイコンボタン**
   - アイコンサイズが小さくても、パディングで24px以上を確保
   - 例: 16px アイコン + 4px パディング = 24px ターゲット

4. **リンク**
   - テキストリンクは例外（文章中のリンク）
   - スタンドアロンのリンクは24px以上を確保

### 例外

以下の場合は24px要件の例外となる：
- 文章中のインラインリンク
- 隣接するターゲットまで24px以上の間隔がある場合
- 特定の表現が情報伝達に不可欠な場合

## 2. カーソル（ポインター）のルール

### 基本原則

**cursor: pointer を使用すべき要素**
- `<a>` タグ（リンク）
- `<button>` タグで実装されたボタン
- `role="button"` を持つ要素
- クリック可能なすべてのインタラクティブ要素

### 実装ルール

1. **ボタン**
   ```css
   button {
     cursor: pointer;
   }
   ```

2. **リンク**
   ```css
   a {
     cursor: pointer; /* デフォルトで適用されるが明示的に指定 */
   }
   ```

3. **カスタムクリック要素**
   ```css
   .clickable {
     cursor: pointer;
   }
   ```

4. **無効化された要素**
   ```css
   button:disabled {
     cursor: not-allowed;
   }
   ```

### カーソルと視覚的フィードバック

カーソル変更だけでは不十分。以下も併用：
- ホバー時の背景色変化
- ホバー時のボーダー変化
- フォーカス時のアウトライン
- アクティブ状態の視覚的フィードバック

## 3. ホバー・フォーカス状態

### ホバー状態

すべてのインタラクティブ要素に視覚的フィードバックを提供：

```css
button:hover {
  background-color: /* 変化させる */;
  border-color: /* 変化させる */;
  transition: all 0.2s ease; /* スムーズな遷移 */
}
```

### フォーカス状態

キーボードナビゲーション対応：

```css
button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* :focus-visible を使用し、マウスクリック時はアウトラインを表示しない */
```

### アクティブ状態

クリック時のフィードバック：

```css
button:active {
  transform: scale(0.98);
  /* または背景色を変化 */
}
```

## 4. タイポグラフィとコントラスト

### フォントサイズ

- **最小フォントサイズ**: 14px（本文）
- **推奨フォントサイズ**: 16px 以上
- **小さいテキスト**: 12px まで許容（ラベル、キャプション）

### カラーコントラスト

**WCAG 2.2 Success Criterion 1.4.3 (Level AA)**
- **通常テキスト**: 4.5:1 以上
- **大きいテキスト**: 3:1 以上（18px以上 or 14px太字以上）
- **UIコンポーネント**: 3:1 以上（ボーダー、アイコンなど）

### 実装チェック

- 背景色とテキスト色のコントラスト比を確認
- ボタンの背景色とテキスト色のコントラスト比を確認
- 無効化状態でもコントラストを保つ

## 5. フォーム要素

### ラベル

```html
<!-- ラベルとフォーム要素を関連付ける -->
<label for="email">メールアドレス</label>
<input type="email" id="email" name="email">

<!-- またはラップする -->
<label>
  メールアドレス
  <input type="email" name="email">
</label>
```

### プレースホルダー

- プレースホルダーだけに頼らない
- 必ずラベルを併用
- プレースホルダーは入力例や補足情報として使用

### エラー表示

- エラーメッセージは明確に表示
- `aria-invalid="true"` を使用
- エラー時は色だけに頼らず、テキストやアイコンも併用

## 6. レスポンシブデザイン

### タッチデバイス対応

- タッチターゲットは最低24px、推奨44px
- タッチターゲット間の間隔を8px以上確保
- ホバー状態だけでなくタップ状態も考慮

### ブレークポイント

```css
/* モバイル */
@media (max-width: 768px) {
  /* タッチターゲットを大きく */
  button {
    min-height: 44px;
    padding: 12px 16px;
  }
}
```

## 7. キーボードナビゲーション

### Tab順序

- 論理的なタブ順序を保つ
- `tabindex` を不用意に使用しない
- `tabindex="-1"` でプログラム的にフォーカス可能に

### キーボードショートカット

- Enter: ボタンの実行
- Space: ボタンの実行、チェックボックスのトグル
- Escape: モーダルやドロップダウンを閉じる
- 矢印キー: リスト内の移動

## 8. ARIAラベルとロール

### 適切なARIA属性

```html
<!-- ボタン -->
<button aria-label="メニューを開く">
  <MenuIcon />
</button>

<!-- 無効化されたボタン -->
<button disabled aria-disabled="true">
  送信
</button>

<!-- トグルボタン -->
<button aria-pressed="false">
  通知をオン
</button>
```

### セマンティックHTML優先

- ARIAを追加する前に、適切なHTML要素を使用
- `<button>` が適切なら `<div role="button">` を使わない
- `<nav>`, `<main>`, `<header>` などを活用

## 9. このプロジェクトでのチェックリスト

### すべてのボタン

- [ ] `cursor: pointer` が設定されている
- [ ] 最小サイズ 24 × 24 px（推奨 44 × 44 px）
- [ ] ホバー状態の視覚的フィードバック
- [ ] フォーカス状態のアウトライン
- [ ] アクティブ状態のフィードバック

### すべてのリンク

- [ ] `cursor: pointer` が設定されている（通常デフォルト）
- [ ] ホバー時の視覚的変化
- [ ] 訪問済みリンクの区別（必要に応じて）

### すべてのフォーム要素

- [ ] ラベルが適切に関連付けられている
- [ ] クリック領域が十分に大きい（チェックボックス、ラジオボタン）
- [ ] フォーカス時のアウトライン
- [ ] エラー状態の明確な表示

### すべてのインタラクティブ要素

- [ ] キーボードでアクセス可能
- [ ] 視覚的フィードバック（ホバー、フォーカス、アクティブ）
- [ ] 適切なARIA属性（必要に応じて）
- [ ] カラーコントラスト比が適切

## 10. ツール

### コントラストチェック

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Chrome DevTools の Lighthouse（アクセシビリティ監査）

### タッチターゲットサイズチェック

- Chrome DevTools の要素検証
- 実際のモバイルデバイスでテスト

### キーボードナビゲーションテスト

- Tab キーで全要素を巡回
- Enter / Space で操作可能か確認

## 参考資料

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [WCAG 2.5.8: Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [WCAG 2.5.5: Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)
- [MDN Web Docs: Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
