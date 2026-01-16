# AGENTS.md - 開発ワークフロー

このファイルは、Claude Code を使った開発フローを定義します。

---

## 開発モード

**Solo モード**: Claude Code が計画・実装・レビューを一貫して担当

---

## 基本ワークフロー

### 1. 計画フェーズ（Plan）

新機能や大きな変更を行う前に、計画を立てます。

**トリガー**:
- 新機能の追加
- 大きなリファクタリング
- アーキテクチャ変更

**アクション**:
```bash
# 自然言語で指示
「〇〇機能を追加したい」
```

Claude が以下を実行します：
1. `memories/features/` に機能記録を作成
2. 必要に応じて `memories/thinking/` に設計判断を記録
3. `Plans.md` にタスクを追加
4. 実装方針を説明

**成果物**:
- `memories/features/YYYYMMDD-feature-name.md`
- `memories/thinking/YYYYMMDD-decision.md`（必要に応じて）
- `Plans.md` のタスクリスト更新

---

### 2. 実装フェーズ（Work）

計画に基づいてコードを実装します。

**トリガー**:
- 「実装して」
- 「続けて」
- 「次のタスク」

**アクション**:
Claude が以下を実行します：
1. `Plans.md` のタスクを確認
2. コンポーネント、フック、スタイルを実装
3. TypeScript の型定義を追加
4. 動作確認（可能であれば chrome-devtools-mcp 使用）
5. **必ずコミット**

**成果物**:
- 実装済みコード
- Git コミット

**重要**: 実装完了 = コード変更 + 動作確認 + **コミット**

---

### 3. レビューフェーズ（Review）

実装内容をセルフレビューします。

**トリガー**:
- 「レビューして」
- 「チェックして」
- 実装完了後の自動レビュー

**アクション**:
Claude が以下を確認します：
1. コーディング規約の準拠
2. 型安全性
3. パフォーマンス（バンドルサイズ）
4. アクセシビリティ
5. セキュリティ

**成果物**:
- レビューコメント
- 修正提案（必要な場合）

---

### 4. 最適化フェーズ（Optimize）

パフォーマンス、バンドルサイズ、アクセシビリティを改善します。

**トリガー**:
- 「最適化して」
- 「バンドルサイズを減らして」
- 「パフォーマンスを改善して」

**アクション**:
Claude が以下を実行します：
1. バンドルサイズ分析
2. コード分割の提案
3. 遅延ローディングの実装
4. メモ化の追加
5. 不要な依存関係の削除

**成果物**:
- 最適化されたコード
- パフォーマンス改善レポート
- Git コミット

---

## コミットルール

### コミットタイミング

- **必須**: 機能実装が完了し、次のステップに進む前
- **必須**: 複数の機能を実装する際は、各機能ごとにコミット
- **必須**: ユーザーからの要求に対する実装が完了したとき
- **推奨**: 設計判断を記録した後
- **推奨**: 大きな変更を行った後

### コミットメッセージ形式

```
[動詞] [概要]

- [詳細1]
- [詳細2]
- [詳細3]

[追加情報]

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**例**:
```
Add bundle size optimization

- Implement lazy loading for page components
- Split large chunks using dynamic imports
- Reduce bundle size from 207KB to 95KB (gzip)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## ドキュメント更新ルール

### 必須更新タイミング

1. **機能追加・変更時**:
   - `memories/features/` に機能記録を作成
   - 必要に応じて `docs/` を更新

2. **設計判断時**:
   - `memories/thinking/` に判断記録を作成

3. **機能削除時**:
   - `memories/deleted/` に削除記録を作成

4. **タスク完了時**:
   - `Plans.md` のタスクを完了マーク

### ドキュメント優先原則

**仕様の追加・変更時は、必ずドキュメントを先に更新してから実装に進むこと**

---

## 品質保証

### コーディング規約

- **型定義**: すべての props, state に型を定義
- **CSS**: Tailwind CSS v4 使用、!important 禁止、インラインスタイル禁止
- **コンポーネント**: 関数コンポーネント + Hooks
- **命名規則**: PascalCase (コンポーネント), camelCase (関数/変数), UPPER_SNAKE_CASE (定数)

### パフォーマンス目標

- バンドルサイズ (gzip): **< 100KB**
- 初回読み込み時間: **< 1秒**
- Lighthouse Performance: **95+**

### アクセシビリティ

- WCAG 2.1 AA レベル準拠
- キーボード操作対応
- スクリーンリーダー対応

---

## よく使うコマンド

### 開発

```bash
npm run dev         # 開発サーバー起動
npm run build       # プロダクションビルド
npm run preview     # ビルド結果プレビュー
npm run type-check  # 型チェック
```

### Git

```bash
git status          # 変更確認
git add .           # すべての変更をステージング
git commit          # コミット（Claude が実行）
git log --oneline   # コミット履歴確認
```

---

## VibeCoder 向けヒント

技術に詳しくなくても、自然言語で指示できます：

| やりたいこと | 言い方 |
|-------------|--------|
| 機能追加 | 「〇〇機能を追加して」 |
| バグ修正 | 「〇〇が動かない、直して」 |
| デザイン変更 | 「〇〇をもっと大きく/小さくして」 |
| 動作確認 | 「動かして」「見せて」 |
| 最適化 | 「速くして」「軽くして」 |
| 説明 | 「〇〇ってどういう仕組み？」 |
| 続行 | 「続けて」「次」 |
| おまかせ | 「全部やって」「良い感じにして」 |

**困ったら**: 「どうすればいい？」と聞いてください。

---

## SSOT（Single Source of Truth）

### 意思決定記録

`.claude/memory/decisions.md` に重要な技術判断を記録します。

### 再利用パターン

`.claude/memory/patterns.md` によく使うパターンを記録します。

### 既存の開発ログ

`memories/` ディレクトリに過去の機能記録と設計判断が保存されています。

---

## 参照ドキュメント

- [CLAUDE.md](./CLAUDE.md) - プロジェクト設定と開発ルール
- [Plans.md](./Plans.md) - タスク管理
- [docs/README.md](./docs/README.md) - プロジェクト概要
- [docs/architecture.md](./docs/architecture.md) - アーキテクチャ設計
- [docs/design-system.md](./docs/design-system.md) - デザインシステム
