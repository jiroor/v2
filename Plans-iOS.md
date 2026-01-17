# Plans-iOS.md - iOS移植タスク管理

このファイルは、Web版カメラ共有機能のiOS移植プロジェクトのタスクと進捗を管理します。

---

## 🎯 プロジェクト: カメラ共有機能 iOS移植

### 概要
- **目的**: Web版のカメラ共有機能をiOSネイティブアプリとして移植し、ローカルネットワークでの完全動作を実現
- **対象**: iPhoneユーザー（iOS 15.0以上）
- **参考**: 既存Web版（PeerJS + WebRTC）
- **スコープ**: Phase 1でWeb版互換、Phase 2でローカル化完成

### 技術スタック
- **言語**: Swift 5.9+
- **UI**: SwiftUI
- **カメラ**: AVFoundation
- **デバイス検索**: Network.framework (Bonjour/mDNS)
- **WebRTC**: GoogleWebRTC.framework
- **QRコード**: Vision.framework
- **開発環境**: Xcode 15+

### 主な要件（ユーザーからの質問）
1. ✅ **ローカルデバイス検索**: カメラモードの端末を他の端末から探せる → Bonjour/mDNSで実現可能
2. ✅ **ローカル完結通信**: 映像・音声をローカルで完結 → WebRTC P2P + ローカルシグナリングで実現可能

---

## 🔴 Phase 1: プロジェクト初期化 & 基本機能 `cc:TODO`

### 1.1 プロジェクト初期化 ✅

- [x] XcodeGenでプロジェクト作成（SwiftUI App）
  - Bundle Identifier: com.rakit.CameraSharing
  - Deployment Target: iOS 15.0
  - project.yml で構成管理
- [x] 基本構造セットアップ
  - Info.plist にカメラ・マイク・ローカルネットワーク権限説明を追加
  - Bonjour サービス名（_rakit-camera._tcp）を設定
- [x] プロジェクト構造定義
  ```
  CameraSharing/
  ├── Models/          # データモデル
  ├── Views/           # SwiftUI ビュー
  ├── Services/        # WebRTC, Bonjour等のサービス層
  ├── Utilities/       # ヘルパー関数
  └── Resources/       # アセット
  ```
- [x] 初期ファイル作成
  - CameraSharingApp.swift: アプリエントリーポイント
  - HomeView.swift: ホーム画面（カメラモード/ビューワーモード選択）
  - CameraDevice.swift: データモデル
- [x] .gitignore設定（Xcode一時ファイル）
- [x] 初回コミット

**次のタスク**: Phase 1.2 - 依存関係セットアップ（GoogleWebRTC）

### 1.2 カメラアクセス実装

- [ ] `CameraService.swift` 作成
  - AVCaptureSession の管理
  - カメラデバイスの列挙（フロント・リア）
  - 解像度設定（360p, 480p, 720p, 1080p, 4K）
  - プレビュー用の AVCaptureVideoPreviewLayer
- [ ] 権限管理
  - カメラ・マイク権限リクエスト
  - 権限拒否時のエラーハンドリング
- [ ] プレビュー画面作成
  - カメラ映像をリアルタイム表示
  - カメラ切り替えボタン
  - 解像度選択UI

### 1.3 WebRTC統合 `[feature:tdd]`

**テストケース設計（実装時に詳細確認）**:
- 正常系: PeerConnection確立成功
- 異常系: ネットワーク切断時の再接続
- エッジケース: シグナリング失敗時のフォールバック

**実装タスク**:
- [ ] `WebRTCService.swift` 作成
  - RTCPeerConnectionFactory 初期化
  - STUN サーバー設定（Google STUN）
  - Offer/Answer の SDP 生成・交換
  - ICE Candidate 管理
- [ ] テストファイル作成: `WebRTCServiceTests.swift`
- [ ] メディアストリーム管理
  - ローカルストリームの作成（カメラ + マイク）
  - リモートストリームの受信
  - トラック（audio/video）の有効化・無効化
- [ ] WebRTC接続状態の監視
  - connecting, connected, disconnected, failed
  - 状態変化時のコールバック

### 1.4 PeerJS互換シグナリング `[feature:tdd]`

**テストケース設計（実装時に詳細確認）**:
- 正常系: ルームID生成・接続
- 境界条件: 同一ルームIDの衝突処理
- 異常系: シグナリングサーバー接続失敗

**実装タスク**:
- [ ] `SignalingService.swift` 作成
  - WebSocket接続（cloud.peerjs.com または独自サーバー）
  - ルームID生成（12文字、Web版互換）
  - Offer/Answer/ICE Candidate の送受信
- [ ] テストファイル作成: `SignalingServiceTests.swift`
- [ ] メッセージプロトコル実装
  - PeerJSメッセージフォーマットに準拠
  - JSON エンコード・デコード
- [ ] エラーハンドリング
  - タイムアウト処理
  - 再接続ロジック

### 1.5 QRコード生成・スキャン

- [ ] `QRCodeGenerator.swift` 作成
  - ルームIDからQRコード画像を生成
  - UIImage として返す
- [ ] `QRCodeScanner.swift` 作成
  - AVCaptureSession でカメラからQRコードを読み取り
  - ルームIDを抽出
  - Vision.framework の VNDetectBarcodesRequest を使用
- [ ] QRコード表示UI（カメラモード）
- [ ] QRコードスキャンUI（ビューワーモード）

### 1.6 UI実装（基本）

- [ ] `CameraModeView.swift` 作成
  - カメラプレビュー
  - ルームID表示
  - QRコード表示
  - 配信開始/停止ボタン
  - ビューワー数表示
- [ ] `ViewerModeView.swift` 作成
  - ルームID入力フィールド
  - QRコードスキャンボタン
  - リモートストリーム表示
  - 接続状態表示
- [ ] `HomeView.swift` 作成
  - カメラモード / ビューワーモード の選択画面
- [ ] ナビゲーション実装

### 1.7 動作確認 & デバッグ

- [ ] カメラモードでルームID生成を確認
- [ ] ビューワーモードでルームID入力→接続を確認
- [ ] 映像・音声が正しく送受信されることを確認
- [ ] QRコード読み取りが動作することを確認
- [ ] メモリリーク確認（Instruments）
- [ ] Phase 1 完了コミット

---

## 🟡 Phase 2: ローカル化（Bonjour + ローカルシグナリング） `cc:TODO`

### 2.1 Bonjourデバイス検索 `[feature:tdd]`

**テストケース設計（実装時に詳細確認）**:
- 正常系: 同一Wi-Fi内のデバイスを発見
- 境界条件: 複数デバイスが同時に公開されている場合
- 異常系: Wi-Fi切断時の挙動
- エッジケース: サービス名の重複

**実装タスク**:
- [ ] `BonjourService.swift` 作成
  - カメラモード: サービス公開（`_rakit-camera._tcp`）
  - ビューワーモード: サービス検索（NWBrowser）
  - デバイスリストの管理
- [ ] テストファイル作成: `BonjourServiceTests.swift`
- [ ] サービス情報のTXTレコード
  - デバイス名
  - 解像度
  - ルームID（オプション）
- [ ] デバイス検索UI
  - 検出されたデバイス一覧表示
  - タップで接続

### 2.2 ローカルシグナリング実装 `[feature:tdd]`

**テストケース設計（実装時に詳細確認）**:
- 正常系: ローカルネットワーク内でSDP交換成功
- 境界条件: 同時に複数の接続リクエスト
- 異常系: 接続先デバイスが突然切断
- エッジケース: NAT越えが必要なケース（失敗として扱う）

**実装タスク**:
- [ ] `LocalSignalingService.swift` 作成
  - P2P シグナリング（Bonjour経由でエンドポイント交換）
  - または、簡易HTTPサーバー（カメラモード側で起動）
  - SDP Offer/Answer の送受信
  - ICE Candidate の送受信
- [ ] テストファイル作成: `LocalSignalingServiceTests.swift`
- [ ] WebRTCServiceとの統合
  - シグナリング方式の切り替え（PeerJS / ローカル）
  - 設定画面で選択可能に

### 2.3 オフラインモード実装 `[feature:tdd]`

**テストケース設計（実装時に詳細確認）**:
- 正常系: インターネット未接続状態で動作
- 境界条件: Wi-Fiのみ、モバイルデータなし
- 異常系: Wi-Fi切断時の挙動

**実装タスク**:
- [ ] インターネット接続状態の検出
- [ ] オフライン時の自動ローカルモード切り替え
- [ ] STUNサーバー不要化
  - mDNS ICE Candidate の優先
  - ローカルIPアドレスの直接交換
- [ ] テストファイル作成: `OfflineModeTests.swift`

### 2.4 設定画面（詳細）

- [ ] `SettingsView.swift` 作成
  - シグナリング方式選択（PeerJS / ローカル）
  - デフォルト解像度
  - デフォルトカメラ（フロント / リア）
  - デバイス名編集
  - デバッグモード（ログ表示）
- [ ] UserDefaults での設定永続化

### 2.5 動作確認 & デバッグ

- [ ] Bonjourデバイス検索が動作することを確認
- [ ] ローカルシグナリングで接続できることを確認
- [ ] **完全オフライン（インターネット未接続）で動作することを確認**
- [ ] 複数デバイス間での同時接続を確認
- [ ] メモリリーク確認（Instruments）
- [ ] Phase 2 完了コミット

---

## 🟢 Phase 3: リリース準備（MVP） `cc:TODO`

**目的**: Phase 2完了時点でMVPとしてリリースし、早期にユーザーフィードバックを得る

- [ ] アプリアイコン作成
- [ ] スクリーンショット撮影（App Store用）
  - カメラモード画面
  - ビューワーモード画面
  - デバイス検索画面
- [ ] App Store 説明文作成
  - 日本語版
  - 英語版（オプション）
- [ ] プライバシーポリシー作成
  - カメラ・マイク使用の説明
  - データ収集なし（ローカル完結）を明記
- [ ] TestFlight ベータテスト
  - 最低5名のテスター確保
  - バグ修正
- [ ] App Store 審査対応
  - 審査ガイドライン確認
  - リジェクト対応
- [ ] **MVP リリース** 🚀

---

## 🔵 Phase 4: 追加機能 & 最適化（リリース後） `cc:TODO`

**目的**: MVPリリース後、ユーザーフィードバックを元に機能追加と最適化

### 4.1 追加機能（オプション）

- [ ] カメラエフェクト（明るさ補正、コントラスト）
- [ ] 録画機能（ローカル保存）
- [ ] スクリーンショット機能
- [ ] 接続履歴（最近接続したデバイス）
- [ ] ダークモード対応
- [ ] iPad対応（ユニバーサルアプリ化）

### 4.2 最適化

- [ ] バッテリー消費の最適化
- [ ] メモリ使用量の最適化
- [ ] 低遅延モードの実装（解像度を下げる等）
- [ ] UI/UXの改善
  - アニメーション追加
  - エラーメッセージの改善
  - ローディング表示
  - ハプティクスフィードバック

### 4.3 テスト強化

- [ ] UIテスト追加（XCUITest）
- [ ] 統合テスト追加
- [ ] パフォーマンステスト
- [ ] アクセシビリティテスト（VoiceOver対応）

---

## 📝 ノート

### Web版との相違点

| 項目 | Web版 | iOS版 |
|------|-------|-------|
| シグナリング | PeerJS（cloud.peerjs.com） | PeerJS互換 + Bonjour（ローカル） |
| デバイス検索 | ルームID手入力 + QRコード | Bonjour自動検出 + QRコード |
| オフライン動作 | 不可（シグナリングにインターネット必要） | **可能**（完全ローカル） |
| カメラアクセス | MediaDevices API | AVFoundation |
| WebRTC | WebRTC API（ブラウザ） | GoogleWebRTC.framework |

### 技術的な挑戦

1. **WebRTC for iOS**: ブラウザと異なり、ネイティブAPI使用のため学習コストあり
2. **Bonjourシグナリング**: P2P シグナリングの実装が必要
3. **NAT越え（ローカル）**: STUN不要でローカルIPのみで接続する仕組み
4. **バッテリー管理**: 常時カメラ・通信が動作するためバッテリー消費に注意

### 参考リンク

- [GoogleWebRTC - iOS SDK](https://webrtc.github.io/webrtc-org/native-code/ios/)
- [Apple - Network.framework](https://developer.apple.com/documentation/network)
- [Apple - AVFoundation](https://developer.apple.com/documentation/avfoundation)
- [Bonjour Overview](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/NetServices/Introduction.html)
- [WebRTC for iOS Tutorial](https://www.raywenderlich.com/21477552-webrtc-tutorial-for-ios)

---

## 🔄 更新履歴

| 日付 | 変更内容 |
|------|---------|
| 2025-01-16 | Plans-iOS.md 初回作成、iOS移植の実装計画を策定 |
| 2025-01-16 | Phase 3とPhase 4を入れ替え（リリースを優先し、追加機能は後回しに） |
