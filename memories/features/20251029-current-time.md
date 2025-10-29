# 現在日時表示

## 日付
2025-10-29

## 実装目的
現在の日時をリアルタイムで表示し、タイムゾーンを選択して世界中の時刻を確認できるツール。リモートワークや国際的なコミュニケーションで便利。

## 画面構成・UI

### メイン表示エリア
- 大きな時刻表示
  - 横組み: `10:30:45`（秒あり） / `10:30`（秒なし）
  - 縦組み: 数字を縦に配置
- 日付表示
  - 横組み: `2025年10月29日（金）`
  - 縦組み: `2025 / 10 / 29 / (金)`

### 設定エリア
- **タイムゾーン選択**
  - ドロップダウンメニュー
  - 主要なタイムゾーンのみ表示（約50個）
  - デフォルト: ブラウザのタイムゾーン（取得できない場合はAsia/Tokyo）

- **レイアウト切り替え**
  - トグルボタン（横組み ⇄ 縦組み）
  - アイコン: AlignHorizontal / AlignVertical

- **秒数表示切り替え**
  - チェックボックス
  - ラベル: 「秒数を表示」

## データ構造

### State型
```typescript
interface ClockSettings {
  timezone: string              // 例: "Asia/Tokyo"
  layout: 'horizontal' | 'vertical'
  showSeconds: boolean
}
```

### タイムゾーン型
```typescript
interface TimezoneOption {
  value: string      // IANAタイムゾーン名（例: "Asia/Tokyo"）
  label: string      // 表示名（例: "東京（日本）"）
  offset: string     // UTCオフセット（例: "UTC+9"）
}
```

## 実装ファイル

- `src/hooks/useCurrentTime.ts` - リアルタイム時刻更新ロジック
- `src/utils/timezoneUtils.ts` - タイムゾーン関連ユーティリティ
- `src/pages/Timer/CurrentTime.tsx` - UIコンポーネント
- `src/pages/Timer/CurrentTime.module.css` - スタイル
- `src/App.tsx` - ルーティング追加
- `src/pages/Home.tsx` - リンク有効化

## 技術的な設計判断

### タイムゾーン取得方法
**選択した方法**: `Intl.DateTimeFormat().resolvedOptions().timeZone`
- ブラウザのタイムゾーン設定を取得
- 外部API不要（完全クライアントサイド）
- プライバシー配慮（位置情報不要）

**却下した方法**: Geolocation API → 外部APIでタイムゾーン変換
- 外部APIへの依存
- プライバシーの懸念
- オフライン動作不可

### 日時フォーマット
**使用API**: `Intl.DateTimeFormat`
- ブラウザネイティブAPI
- ロケール対応（日本語表示）
- タイムゾーン指定可能
- 外部ライブラリ不要

### タイムゾーン一覧
`Intl.supportedValuesOf('timeZone')` は600個以上のタイムゾーンを返すため、主要な約50個に絞る。

**選定基準**:
- 主要都市
- 人口の多い地域
- UTCオフセットのバリエーション
- 日本語話者が使いやすい

### リアルタイム更新
- `setInterval` で1秒ごとに更新
- `useEffect` のクリーンアップで `clearInterval`
- パフォーマンス最適化のため、時刻のみstateに保持

### レイアウト実装
**横組み**: Flexbox（row）
**縦組み**: Flexbox（column）
- CSSクラス切り替えで実装
- アニメーション: transition

## リスク・注意点

1. **タイムゾーン名の表示**
   - "Asia/Tokyo" より "東京（日本）" の方がユーザーフレンドリー
   - → マッピングテーブルを作成

2. **パフォーマンス**
   - 1秒ごとのre-renderが発生
   - → 最小限のstate更新
   - → useMemoで日時フォーマットを最適化

3. **ブラウザ互換性**
   - `Intl.supportedValuesOf` はモダンブラウザのみ
   - → フォールバック: 手動でタイムゾーン一覧を定義

4. **タイムゾーン切り替え時**
   - 即座に時刻を再計算・表示
   - → 違和感のないUX

## 完了条件

- [ ] memories/features/に現在日時表示の設計を記録
- [ ] useCurrentTimeフックを実装
- [ ] timezoneUtilsを実装（主要タイムゾーン一覧含む）
- [ ] CurrentTimeコンポーネントを実装
- [ ] App.tsxに /timer/current ルートを追加
- [ ] Home.tsxに現在日時表示リンクを追加
- [ ] chrome-devtools-mcpで動作確認
  - タイムゾーン変更で時刻が正しく更新されること
  - レイアウト切り替えが動作すること
  - 秒数表示/非表示が動作すること
- [ ] コミット
