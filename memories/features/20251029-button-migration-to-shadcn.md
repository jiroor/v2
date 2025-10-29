# ボタンコンポーネントのshadcn/ui移行

## 日付
2025-10-29

## 実装目的
サービス内のすべてのボタンをshadcn/ui Buttonコンポーネントに移行し、コードの一貫性とメンテナンス性を向上させる。また、WCAG推奨のタッチターゲットサイズ（44px）をデフォルトで提供する。

---

## 移行内容

### 移行したコンポーネント（8ファイル）

#### タイマー系（3ファイル）
1. **CountdownTimer.tsx**
   - スタートボタン（Primary）
   - ストップボタン（Secondary）
   - リセットボタン（Secondary）

2. **Stopwatch.tsx**
   - スタートボタン（Primary）
   - ストップボタン（Secondary）
   - ラップボタン（Secondary、disabled状態あり）
   - リセットボタン（Secondary）

3. **PomodoroTimer.tsx**
   - 開始/一時停止ボタン（Primary、動的テキスト）
   - リセットボタン（Secondary）

#### テキストツール系（3ファイル）
4. **CharCounter.tsx**
   - クリアボタン（Secondary）

5. **TextDiff.tsx**
   - クリアボタン（Secondary）

6. **RandomString.tsx**
   - 生成ボタン（Primary）
   - コピーボタン（Primary）

#### その他ツール系（3ファイル）
7. **QRCodeGenerator.tsx**
   - サイズ選択ボタン×3（動的variant: active時Primary、非active時Secondary）
   - ダウンロードボタン（Primary）
   - クリアボタン（Secondary）

8. **PasswordGenerator.tsx**
   - 生成ボタン（Primary）
   - コピーボタン（Primary）

9. **ColorPicker.tsx**
   - HEXコピーボタン（Primary）
   - RGBコピーボタン（Primary）
   - HSLコピーボタン（Primary）

**合計**: 8ファイル、23個のボタンを移行

**除外**: CurrentTime.tsx（特殊なボタングループUIのため除外）

---

## Buttonコンポーネントのカスタマイズ

### サイズ調整（WCAG準拠）

shadcn/uiのデフォルト設定を以下のように変更：

```typescript
size: {
  default: "h-11 px-4 py-2", // 44px (WCAG推奨サイズ) ← 元: h-10 (40px)
  sm: "h-10 rounded-md px-3", // 40px ← 元: h-9 (36px)
  lg: "h-12 rounded-md px-8", // 48px ← 元: h-11 (44px)
  icon: "h-11 w-11",          // 44px (WCAG推奨サイズ) ← 元: h-10 w-10
},
```

**理由**:
- WCAG 2.5.5（Enhanced）推奨: 44×44px以上のタッチターゲットサイズ
- 本プロジェクトで手動実装していたアクセシビリティ要件をデフォルトで満たす

---

## 移行パターン

### パターン1: 基本的なボタン

**移行前（CSS Modules）:**
```tsx
<button onClick={handleClick} className={styles.buttonPrimary}>
  クリック
</button>
```

**移行後（shadcn/ui）:**
```tsx
<Button onClick={handleClick}>
  クリック
</Button>
```

- `className={styles.buttonPrimary}` → variant指定なし（デフォルトがPrimary）
- `className={styles.buttonSecondary}` → `variant="secondary"`

### パターン2: disabled状態のあるボタン

**移行前:**
```tsx
<button
  onClick={handleClick}
  className={styles.button}
  disabled={!isRunning}
>
  ラップ
</button>
```

**移行後:**
```tsx
<Button
  onClick={handleClick}
  disabled={!isRunning}
  variant="secondary"
>
  ラップ
</Button>
```

### パターン3: 動的variantのボタン

**移行前（QRCodeGenerator）:**
```tsx
<button
  onClick={() => setSize(256)}
  className={`${styles.button} ${size === 256 ? styles.active : ''}`}
>
  中 (256×256)
</button>
```

**移行後:**
```tsx
<Button
  onClick={() => setSize(256)}
  variant={size === 256 ? "default" : "secondary"}
>
  中 (256×256)
</Button>
```

---

## 削除したCSS（9ファイル）

すべてのCSS Modulesファイルから以下のボタン関連スタイルを削除：

### 削除対象クラス
- `.button`
- `.buttonPrimary`
- `.buttonSecondary`
- `.copyButton`
- 上記クラスの疑似クラス:
  - `:hover`
  - `:focus-visible`
  - `:disabled`
  - `:active`
  - `:hover:not(:disabled)`
- メディアクエリ内のボタンスタイル

### 保持したクラス
- `.controls` (レイアウト用)
- `.buttonGroup` (CurrentTime専用、特殊なUI)
- `.buttonGroupButton` (CurrentTime専用、特殊なUI)

### 削除したファイル別サマリー

| ファイル | 削除したクラス |
|---------|--------------|
| CountdownTimer.module.css | `.buttonPrimary`, `.buttonSecondary` + 疑似クラス |
| Stopwatch.module.css | `.buttonPrimary`, `.buttonSecondary` + 疑似クラス |
| PomodoroTimer.module.css | `.button`, `.buttonSecondary` + 疑似クラス |
| CharCounter.module.css | `.buttonSecondary` + 疑似クラス |
| TextDiff.module.css | `.buttonSecondary` + 疑似クラス |
| RandomString.module.css | `.button`, `.copyButton` + 疑似クラス |
| QRCodeGenerator.module.css | `.button`, `.buttonSecondary` + 疑似クラス |
| PasswordGenerator.module.css | `.button`, `.copyButton` + 疑似クラス |
| ColorPicker.module.css | `.copyButton` + 疑似クラス |

---

## バンドルサイズへの影響

### ビルド前（Tailwind CSS導入直後）
- CSS: 6.14 KB (gzip)
- JavaScript (main): 22.47 KB (gzip)
- JavaScript (React vendor): 52.12 KB (gzip)
- **合計: 80.73 KB**

### ビルド後（Button移行完了）
- CSS: 6.49 KB (gzip) ← **+0.35 KB**
- JavaScript (main): 31.47 KB (gzip) ← **+9.00 KB**
- JavaScript (React vendor): 52.12 KB (gzip) ← 変更なし
- **合計: 90.08 KB** ← **+9.35 KB**

### 分析
- **増加分**: +9.35 KB
- **原因**:
  - Radix UI Slot: 約3-4 KB
  - class-variance-authority: 約2-3 KB
  - Buttonコンポーネント本体: 約3-4 KB
- **100KB制約**: ✅ 満たしている（余裕: 9.92 KB）
- **CSS削減効果**: -0.35 KBの削減には至らなかったが、ほぼ同等を維持

---

## メリット

### 1. アクセシビリティの向上
- **自動的にWCAG準拠**: デフォルトで44pxのタッチターゲットサイズ
- **focus-visible**: キーボードナビゲーション時のフォーカス表示
- **disabled状態**: 適切なカーソルと透明度設定
- **手動実装不要**: 以前は各CSSファイルで個別に実装していた

### 2. コードの一貫性
- **統一されたAPI**: すべてのボタンが同じコンポーネントを使用
- **variant指定**: Primary/Secondaryの区別が明確
- **カスタマイズ可能**: 必要に応じてsize, variant, disabledを指定

### 3. メンテナンス性の向上
- **集約されたスタイル**: ボタンスタイルが1ファイル（button.tsx）に集約
- **CSS重複の削減**: 9ファイルに分散していたボタンスタイルを削除
- **型安全性**: TypeScriptの型チェックが効く

### 4. 将来の拡張性
- **新しいvariantの追加**: 1箇所の変更で全体に反映
- **テーマ変更**: Tailwind CSS設定で一括変更可能
- **他のコンポーネントへの展開**: Inputなど他のコンポーネントも同様に移行可能

---

## 今後の課題

### 1. 他のコンポーネントの移行
- Input（入力フィールド）
- Select（セレクトボックス）
- Textarea（テキストエリア）
- Checkbox（チェックボックス）

### 2. CurrentTime.tsxの移行検討
- 現在は特殊なボタングループUIを使用
- shadcn/uiの`Toggle Group`コンポーネントへの移行を検討

### 3. バンドルサイズの最適化
- 残り余裕: 9.92 KB
- 他のコンポーネント追加時のサイズ監視

---

## リスク・注意点

### 1. バンドルサイズの増加
- **現状**: +9.35 KB（許容範囲内）
- **対策**: 他のコンポーネント追加時は慎重に
- **監視**: 定期的にビルドサイズをチェック

### 2. 既存スタイルとの共存
- **現状**: CurrentTime.tsxは独自ボタンスタイルを維持
- **対策**: 段階的に移行、混在は一時的

### 3. shadcn/uiの更新
- **現状**: コピー&ペースト方式のため手動更新
- **対策**: 定期的に公式リポジトリをチェック

---

## 完了条件

- [x] shadcn/ui Buttonコンポーネントをインストール
- [x] ButtonコンポーネントをWCAG準拠サイズに調整
- [x] タイマー系3ファイルのボタンを移行
- [x] テキストツール系3ファイルのボタンを移行
- [x] その他ツール系3ファイルのボタンを移行
- [x] 9ファイルのCSS Modulesからボタンスタイルを削除
- [x] バンドルサイズを確認（100KB制約を満たす）
- [x] ドキュメント作成

---

## 参考資料

- [shadcn/ui Button](https://ui.shadcn.com/docs/components/button)
- [Radix UI Slot](https://www.radix-ui.com/primitives/docs/utilities/slot)
- [class-variance-authority](https://cva.style/docs)
- [WCAG 2.5.5 Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)
