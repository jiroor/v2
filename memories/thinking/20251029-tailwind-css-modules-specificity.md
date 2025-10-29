# TailwindとCSS Modulesの詳細度問題と対策

## 日付
2025-10-29

## 状況
プロジェクトでshadcn/ui（Tailwind使用）とCSS Modulesを併用しているため、スタイルの詳細度制御に問題が発生しています。

### 具体的な問題
1. **InputコンポーネントのTailwindクラス**: `h-10 w-full` など（詳細度: 0,0,1,0）
2. **CSS ModulesのクラスWeather**: `.colorInput` など（詳細度: 0,0,1,0）
3. **結果**: 同じ詳細度のため、記述順序（カスケード）で決まる→Tailwindが後に読み込まれるとCSS Modulesが負ける

## 検討した選択肢

### 1. `!important` を使用
**メリット**:
- 確実にスタイルを上書きできる

**デメリット**:
- メンテナンス性が悪い
- CSS設計のアンチパターン
- 詳細度の戦争（!important地獄）を引き起こす

### 2. インラインスタイルを使用
**メリット**:
- 最も高い優先度（詳細度: 1,0,0,0）

**デメリット**:
- JSXが汚れる
- スタイルの一元管理ができない
- パフォーマンス面でも不利

### 3. CSS Modulesの詳細度を上げる
**メリット**:
- 適切なCSS設計を維持
- メンテナンス性が高い
- 意図が明確

**デメリット**:
- セレクターが長くなる

## 決定（修正版）
**選択肢4: Tailwindクラスを直接className propに追加（shadcn/ui公式推奨）**

### 調査結果
shadcn/uiの公式ドキュメントとVercel Academyの推奨方法を調査した結果、以下が判明：

1. **cn()関数とtailwind-merge**: shadcn/uiは内部で`cn()`関数を使用し、Tailwindクラスの競合を自動解決
2. **クラスの優先順位**: 後から渡されたクラスが優先される（tailwind-mergeの仕組み）
3. **公式の推奨レベル**: Level 1カスタマイズ = classNameにTailwindクラスを追加

### 実装方法
```tsx
// ❌ 当初の方法（CSS Modulesで詳細度を上げる）
<Input className={styles.colorInput} />
/* CSS */
input.colorInput[type="color"] {
  width: 60px;
  height: 40px;
}

// ✅ 正しい方法（Tailwindクラスを直接追加）
<Input className="w-[60px] h-10 cursor-pointer flex-shrink-0" />
```

**利点**:
- shadcn/uiの設計思想に沿っている
- tailwind-mergeが自動的にクラス競合を解決
- CSSファイルが不要でコンポーネントが自己完結
- 詳細度の問題が発生しない

## 理由
1. **CSS設計の原則を守る**: `!important` やインラインスタイルは避けるべき
2. **保守性**: セレクターを見れば意図が明確
3. **拡張性**: 将来的な変更にも対応しやすい
4. **パフォーマンス**: CSS Modulesはビルド時に最適化される

## 長期的な対策

### オプション1: Tailwindのみに統一
**メリット**:
- 詳細度の問題が発生しない
- ユーティリティファーストで開発が早い

**デメリット**:
- プロジェクトの設計原則（ミニマルデザイン、CSS Modules使用）に反する
- 大規模な移行作業が必要
- バンドルサイズ増加の懸念

### オプション2: CSS Modulesのみに統一
**メリット**:
- 詳細度の問題が発生しない
- スコープ化されたスタイル管理

**デメリット**:
- shadcn/uiを使えなくなる
- 全コンポーネントを自作する必要がある
- 開発速度が低下

### オプション3: レイヤー化（@layer）の活用
Tailwind CSS v3の`@layer`ディレクティブを使用して、CSS Modulesのスタイルをより高い優先度に配置。

```css
@layer components {
  input.colorInput[type="color"] {
    width: 60px;
  }
}
```

ただし、CSS Modulesとの統合が複雑になる可能性がある。

## 現時点の方針
- **短期**: 詳細度を上げる方法で対応（実装済み）
- **中期**: 状況を監視し、問題が頻発する場合は再検討
- **長期**: プロジェクトの規模が大きくなった段階でスタイリング戦略を見直し

## ルール化
CLAUDE.mdに以下を追記：
- `!important` は絶対に使用しない
- インラインスタイル（style属性）は使用しない
- CSS Modulesでshadcn/uiのスタイルを上書きする場合は、詳細度を明示的に上げる
