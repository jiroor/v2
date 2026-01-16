# implementation-quality.md - 実装品質保護ルール

このルールは、形骸化実装やバッドプラクティスを防ぐために設定されています。

---

## 🚨 絶対禁止事項

### 1. 形骸化実装

**禁止される行為**:
```typescript
// ❌ 何もしない実装
const handleSubmit = () => {
  // TODO: 実装する
};

// ❌ ダミーデータを返すだけ
const fetchData = async () => {
  return { success: true };
};

// ❌ エラーを握りつぶす
try {
  await riskyOperation();
} catch (error) {
  // エラーを無視
}
```

**理由**:
- 機能が動いているように見えるが、実際には何もしていない
- バグを発見しにくくなる
- 技術的負債が蓄積する

**正しい対応**:
```typescript
// ✅ 適切な実装
const handleSubmit = async () => {
  try {
    await saveData(formData);
    showSuccessMessage();
  } catch (error) {
    console.error('Save failed:', error);
    showErrorMessage('保存に失敗しました');
  }
};

// ✅ 適切なエラーハンドリング
try {
  await riskyOperation();
} catch (error) {
  console.error('Operation failed:', error);
  // ユーザーにフィードバック
  setError('操作に失敗しました。もう一度お試しください。');
}
```

---

### 2. ハードコードされた値

**禁止される行為**:
```typescript
// ❌ マジックナンバー
setTimeout(() => {
  doSomething();
}, 5000);

// ❌ ハードコードされた文字列
if (user.role === 'admin') {
  // ...
}

// ❌ ハードコードされた URL
fetch('https://example.com/api/data');
```

**理由**:
- 保守性が低い
- 変更時に漏れが発生しやすい
- 意図が不明確

**正しい対応**:
```typescript
// ✅ 定数として定義
const TIMER_INTERVAL_MS = 5000;
setTimeout(() => {
  doSomething();
}, TIMER_INTERVAL_MS);

// ✅ 定数を使用
const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

if (user.role === USER_ROLES.ADMIN) {
  // ...
}

// ✅ 環境変数や設定ファイル
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
fetch(`${API_BASE_URL}/data`);
```

---

### 3. 型安全性の無視

**禁止される行為**:
```typescript
// ❌ any の乱用
const data: any = fetchData();

// ❌ as any でエラーを回避
const value = (data as any).someProperty;

// ❌ 型定義の省略
const handleClick = (e) => {
  // e の型が不明
};

// ❌ 非 null アサーションの乱用
const element = document.getElementById('id')!;
element.innerHTML = 'text';
```

**理由**:
- TypeScript の型安全性が失われる
- バグを発見しにくくなる
- IDE の補完が効かない

**正しい対応**:
```typescript
// ✅ 適切な型定義
interface UserData {
  id: string;
  name: string;
  email: string;
}

const data: UserData = await fetchData();

// ✅ 型ガードを使用
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  // e の型が明確
};

// ✅ null チェック
const element = document.getElementById('id');
if (element) {
  element.innerHTML = 'text';
}
```

---

### 4. パフォーマンスの無視

**禁止される行為**:
```typescript
// ❌ useEffect の無限ループ
useEffect(() => {
  setCount(count + 1);
}); // 依存配列がない

// ❌ 不要な再レンダリング
const Component = () => {
  const config = { key: 'value' }; // 毎回新しいオブジェクト
  return <ChildComponent config={config} />;
};

// ❌ 同期的な重い処理
const processData = (data) => {
  // 数万件のデータを同期的に処理
  return data.map(item => heavyOperation(item));
};
```

**理由**:
- アプリケーションが遅くなる
- ユーザー体験が悪化
- バンドルサイズが肥大化

**正しい対応**:
```typescript
// ✅ 適切な依存配列
useEffect(() => {
  fetchData();
}, [userId]); // userId が変更された時のみ実行

// ✅ useMemo でメモ化
const config = useMemo(() => ({ key: 'value' }), []);

// ✅ 非同期処理
const processData = async (data) => {
  const results = [];
  for (const item of data) {
    results.push(await heavyOperation(item));
  }
  return results;
};
```

---

### 5. アクセシビリティの無視

**禁止される行為**:
```tsx
// ❌ ARIA ラベルがないボタン
<button onClick={handleClick}>
  <Icon />
</button>

// ❌ キーボード操作不可
<div onClick={handleClick}>
  クリック可能な要素
</div>

// ❌ コントラスト比が低い
<p style={{ color: '#ccc', backgroundColor: '#fff' }}>
  読みにくいテキスト
</p>
```

**理由**:
- スクリーンリーダーユーザーが使えない
- キーボードユーザーが操作できない
- WCAG 2.1 AA レベルに準拠しない

**正しい対応**:
```tsx
// ✅ ARIA ラベルを追加
<button onClick={handleClick} aria-label="閉じる">
  <CloseIcon />
</button>

// ✅ button 要素を使用
<button onClick={handleClick}>
  クリック可能な要素
</button>

// ✅ 適切なコントラスト比
<p className="text-gray-900 bg-white">
  読みやすいテキスト
</p>
```

---

## ✅ 品質保証のガイドライン

### コードレビューのチェックリスト

実装完了後、以下を確認してください：

- [ ] 型安全性が確保されている（`any` を使用していない）
- [ ] エラーハンドリングが適切に実装されている
- [ ] パフォーマンスへの影響を考慮している
- [ ] アクセシビリティに配慮している（ARIA ラベル、キーボード操作）
- [ ] マジックナンバーやハードコードされた値がない
- [ ] コードが読みやすく、理解しやすい
- [ ] ドキュメント（コメント、README）が適切に更新されている

---

### 実装の基本原則

1. **YAGNI（You Aren't Gonna Need It）**
   - 必要になるまで実装しない
   - 過剰な抽象化を避ける

2. **KISS（Keep It Simple, Stupid）**
   - シンプルに保つ
   - 複雑な実装は避ける

3. **DRY（Don't Repeat Yourself）**
   - 重複したコードを避ける
   - 再利用可能なコンポーネント・関数を作成

4. **単一責任の原則**
   - 1つの関数・コンポーネントは1つの責任のみ
   - 巨大な関数・コンポーネントを避ける

---

## 🛡️ 品質保護の実践

### 実装前のチェックリスト

新機能を実装する前に、以下を確認してください：

- [ ] 要件が明確か（`memories/features/` に記録）
- [ ] 設計判断が記録されているか（`memories/thinking/`）
- [ ] 既存のパターンを参照したか（`.claude/memory/patterns.md`）
- [ ] 既存の意思決定を参照したか（`.claude/memory/decisions.md`）
- [ ] バンドルサイズへの影響を考慮したか

---

### 実装後のチェックリスト

実装完了後、以下を確認してください：

- [ ] 型チェックが通る（`npm run type-check`）
- [ ] ビルドが通る（`npm run build`）
- [ ] 開発サーバーで動作確認した（`npm run dev`）
- [ ] バンドルサイズが目標内（< 100KB gzip）
- [ ] アクセシビリティに問題がない
- [ ] ドキュメントを更新した
- [ ] **コミットした**（必須）

---

## 📝 例外ケース

### プロトタイプ・実験的な実装

**許可される場合**:
- 技術検証のためのプロトタイプ
- ユーザーフィードバックを得るための MVP

**必須条件**:
- プロトタイプであることを明記
- 本番環境にデプロイしない
- 検証後は適切に実装し直す

**記録方法**:
```markdown
# memories/thinking/YYYYMMDD-prototype.md

## プロトタイプの目的
[何を検証するか]

## 制約
- 本番環境にデプロイしない
- 検証後は適切に実装し直す

## 検証結果
[検証結果を記録]
```

---

## 🎯 品質目標

### コード品質の指標

- **型安全性**: TypeScript エラーがゼロ
- **ビルド**: ビルドエラーがゼロ
- **バンドルサイズ**: < 100KB (gzip)
- **Lighthouse Performance**: 95+
- **アクセシビリティ**: WCAG 2.1 AA レベル準拠

---

## 💡 まとめ

**品質は後から追加できません。最初から品質を意識して実装しましょう。**

**実装の基本**:
1. 型安全性を確保
2. エラーハンドリングを適切に
3. パフォーマンスを考慮
4. アクセシビリティに配慮
5. シンプルに保つ

**困ったら**:
- 既存のパターンを参照（`.claude/memory/patterns.md`）
- 既存の意思決定を参照（`.claude/memory/decisions.md`）
- ドキュメントを確認（`docs/`, `CLAUDE.md`）
- わからない場合は質問する
