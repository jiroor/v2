# ルーレット実装のアプローチ検討

## 日付
2025-10-29

## 状況
ルーレット機能を実装するにあたり、円形の描画方法とアニメーション手法について複数の選択肢がある。最適なアプローチを決定する必要がある。

## 検討した選択肢

### 1. Canvas API による描画
**メリット**:
- 複雑なグラフィックスの描画が高速
- ピクセル単位での細かい制御が可能
- 画像エクスポートが容易

**デメリット**:
- Reactの宣言的UIと相性が悪い
- アクセシビリティが低い（スクリーンリーダー非対応）
- レスポンシブ対応に手間がかかる
- 再描画のロジックが複雑

### 2. SVG による描画
**メリット**:
- Reactの宣言的記述と相性が良い
- DOM要素として扱えるためアクセシビリティが高い
- CSSでのスタイリング・アニメーションが容易
- レスポンシブ対応が簡単（viewBoxで自動スケール）
- デバッグしやすい

**デメリット**:
- 要素数が多いと描画負荷が高くなる可能性
- 複雑なグラフィックスの描画は記述が冗長

### 3. CSS のみでの実装（円形をdivで構成）
**メリット**:
- 追加ライブラリ不要
- CSSアニメーションとの統合が最もスムーズ

**デメリット**:
- 扇形の描画が非常に複雑（clip-pathやtransformの組み合わせ）
- ブラウザ間の互換性に問題が出る可能性
- 保守性が低い

## 決定
**SVGによる描画を採用**

## 理由

1. **プロジェクトの設計原則との一致**
   - シンプルさと保守性を重視
   - アクセシビリティへの配慮

2. **Reactとの相性**
   - 宣言的な記述でコンポーネント化しやすい
   - 状態変化に応じた再描画がReactの仕組みで自然に行える

3. **項目数の制限**
   - 最大20項目程度なら、SVGの描画負荷は問題にならない
   - 実用上、それ以上の項目数は視認性の観点からも不適切

4. **レスポンシブ対応**
   - viewBoxを使うことで、画面サイズに応じた自動スケールが可能
   - モバイル対応が容易

5. **アニメーション実装**
   - CSS `transform: rotate()` で回転実装
   - `transition` プロパティでイージング制御が簡単
   - GPU加速により滑らかなアニメーション

## 扇形の描画方法

SVGの `path` 要素と `d` 属性を使用して扇形を描画：

```typescript
const createArc = (
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(centerX, centerY, radius, endAngle)
  const end = polarToCartesian(centerX, centerY, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

  return [
    'M', centerX, centerY,
    'L', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    'Z'
  ].join(' ')
}
```

## 回転アニメーションの実装

1. **最終停止角度の決定**
   ```typescript
   const winnerIndex = Math.floor(Math.random() * items.length)
   const anglePerItem = 360 / items.length
   const targetAngle = 360 * 5 + (winnerIndex * anglePerItem) // 5回転 + 目標角度
   ```

2. **CSS Transitionでの回転**
   ```css
   .roulette {
     transition: transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99);
   }
   ```

3. **イージング関数**
   - `cubic-bezier(0.17, 0.67, 0.12, 0.99)` でゆっくり減速する動き

## 懸念点

### 項目数が多い場合のパフォーマンス
- 対策: 最大20項目に制限
- 20項目程度ならSVGの描画負荷は問題なし

### テキストの配置
- 扇形の中央にテキストを配置する計算が複雑
- 対策: 極座標変換のユーティリティ関数を用意

### 小さい扇形でのテキスト視認性
- 項目数が多いとラベルが読みづらくなる
- 対策:
  - 項目数に応じてフォントサイズを調整
  - または、ホバー時にツールチップ表示

## 次のステップ

1. ユーティリティ関数の実装（`rouletteUtils.ts`）
2. SVG描画コンポーネントの実装
3. アニメーション制御ロジックの実装
4. 項目管理UIの実装
