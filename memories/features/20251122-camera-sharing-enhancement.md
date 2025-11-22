# カメラ映像共有の共有機能強化

## 日付
2025-11-22

## 実装目的
カメラ映像共有機能において、ルームIDの入力が面倒という課題を解決するため、共有の利便性を向上させる。

## 背景
ユーザーから「カメラになっている端末を一覧で探す機能」の要望があったが、完全クライアントサイドの制約により、以下の理由で実現不可能：

- PeerJSには接続中のPeer一覧を取得するAPIがない
- ブラウザからのmDNS/Bonjourは不可能
- 中央サーバーなしでPeer情報を集約・共有できない

そのため、代替案として「共有の利便性向上」を実装する。

## 実装内容

### Phase 1: 共有リンク機能の強化（優先）
カメラ側に「リンクを共有」ボタンを追加し、ビューワー側への接続を簡単にする。

**機能：**
1. カメラ側にシェアボタンを追加
2. クリップボードに自動コピー
3. Web Share API対応（モバイル対応）
4. ビューワー側のURLパラメータ読み取り（既に実装済み）

**UI設計：**
- QRコードの下に「リンクを共有」ボタンを配置
- クリック時にクリップボードにコピー + トースト通知
- モバイルではネイティブ共有ダイアログを表示

### Phase 2: QRコードスキャン機能（次点）
ビューワー側でカメラのQRコードをスキャンして自動接続する。

**機能：**
1. ビューワー側に「QRコードで接続」ボタンを追加
2. `html5-qrcode`ライブラリを使用
3. スキャン結果から自動接続

**追加ライブラリ：**
- `html5-qrcode`: 約25KB（gzip）

## 画面構成・UI

### Phase 1: カメラ側
```
[QRコード表示エリア]
  ↓
[リンクを共有ボタン] ← 新規追加
```

### Phase 2: ビューワー側
```
[ルームID入力欄]  [接続ボタン]
  ↓
[QRコードで接続ボタン] ← 新規追加
  ↓
[QRスキャナーモーダル]
```

## データ構造

### Phase 1
- 共有URL: `${window.location.origin}/camera/viewer?room=${roomId}`
- クリップボードAPI: `navigator.clipboard.writeText()`
- Web Share API: `navigator.share()`

### Phase 2
- QRスキャン結果: URL文字列
- ルームID抽出: `/room=([A-Z0-9-]+)/` パターンマッチング

## 実装ファイル

### Phase 1
- `src/components/Camera/ShareButton.tsx` (新規)
- `src/utils/shareUtils.ts` (新規)
- `src/pages/Camera/CameraMode.tsx` (変更)

### Phase 2
- `src/components/Camera/QRScanner.tsx` (新規)
- `src/pages/Camera/ViewerMode.tsx` (変更)
- `package.json` (依存関係追加)

## リスク・注意点

### Phase 1
- クリップボードAPIはHTTPS必須（localhost除く）
- Web Share APIの対応ブラウザが限定的（モバイル優先）
- バンドルサイズ増加: ほぼなし（ブラウザAPI使用）

### Phase 2
- `html5-qrcode`のバンドルサイズ: 約25KB
- カメラ権限が必要（ビューワー側で）
- プロジェクト目標「バンドルサイズ < 100KB」は維持可能

## 完了条件

### Phase 1
- [x] ドキュメント作成
- [ ] ShareButtonコンポーネント作成
- [ ] shareUtilsユーティリティ関数作成
- [ ] CameraModeに統合
- [ ] 動作確認（クリップボード、Web Share API）
- [ ] コミット

### Phase 2
- [ ] html5-qrcodeライブラリ追加
- [ ] QRScannerコンポーネント作成
- [ ] ViewerModeに統合
- [ ] 動作確認（QRコードスキャン、自動接続）
- [ ] コミット

## 技術的判断

### なぜカメラ一覧化を諦めたか
- **完全クライアントサイド**: プロジェクトの設計原則（CLAUDE.md 87行目）
- **PeerJSの制約**: Peer一覧取得APIがない
- **ブラウザの制約**: mDNS/Bonjourが使用不可能

### なぜ共有強化を選んだか
- 設計原則を維持できる
- ユーザー体験を大幅に改善
- バンドルサイズへの影響が小さい
- 段階的に実装可能
