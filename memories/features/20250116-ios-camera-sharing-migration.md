# iOS カメラ共有機能移植

## 日付
2025-01-16

## 実装目的

Web版のカメラ共有機能をiOSネイティブアプリとして移植し、以下を実現する：
1. **ローカルデバイス検索**: 同一Wi-Fiネットワーク内のカメラ端末を自動検出
2. **完全ローカル通信**: インターネット接続なしで映像・音声をリアルタイム共有

## ユーザーからの質問

ユーザーは以下の実現可能性を確認：
- カメラモードの端末を、ローカルのデバイス検索で他の端末から探すことができるか
- 映像・音声のやり取りをローカルで完結させられるか

**回答**: 両方とも実現可能と判断

## 技術的な実現方法

### デバイス検索
- **Bonjour / mDNS** (Network.framework)
  - カメラモード: `_rakit-camera._tcp` サービスを公開
  - ビューワーモード: NWBrowser でサービス検索
  - TXTレコードにデバイス名・解像度・ルームIDを含める

### ローカルシグナリング
1. **方式A**: Bonjourで検出したエンドポイントに直接HTTP/WebSocket接続
   - カメラモード側で簡易HTTPサーバーを起動
   - SDP Offer/Answer と ICE Candidate を交換

2. **方式B**: P2Pシグナリング
   - Bonjourで相手のIPアドレス・ポートを取得
   - TCP/UDPソケットで直接SDP交換

### WebRTC接続（ローカルのみ）
- **STUN不要化**: mDNS ICE Candidate を優先
- **ローカルIP直接交換**: 192.168.x.x のアドレスのみ使用
- **NAT越え不要**: 同一ローカルネットワーク前提

## 画面構成・UI

### Phase 1（Web版互換）
- **ホーム画面**: カメラモード / ビューワーモード 選択
- **カメラモード**:
  - カメラプレビュー
  - ルームID表示
  - QRコード表示
  - 配信開始/停止ボタン
- **ビューワーモード**:
  - ルームID手入力
  - QRコードスキャン
  - リモートストリーム表示

### Phase 2（ローカル化）
- **デバイス検索画面**: 検出されたカメラ一覧（Bonjour）
- **設定画面**: シグナリング方式選択（PeerJS / ローカル）

## データ構造

### モデル
```swift
struct CameraDevice: Identifiable {
    let id: UUID
    let name: String
    let roomId: String?
    let ipAddress: String
    let port: Int
    let resolution: CameraResolution
}

enum CameraResolution: String, CaseIterable {
    case res360p = "360p"
    case res480p = "480p"
    case res720p = "720p"
    case res1080p = "1080p"
    case res4K = "4K"
}

enum SignalingMode {
    case peerJS(serverURL: String)  // Phase 1
    case local                       // Phase 2
}
```

## 実装ファイル

### Phase 1
- `CameraSharing/Models/CameraDevice.swift`
- `CameraSharing/Services/CameraService.swift`
- `CameraSharing/Services/WebRTCService.swift`
- `CameraSharing/Services/SignalingService.swift`
- `CameraSharing/Services/QRCodeGenerator.swift`
- `CameraSharing/Services/QRCodeScanner.swift`
- `CameraSharing/Views/HomeView.swift`
- `CameraSharing/Views/CameraModeView.swift`
- `CameraSharing/Views/ViewerModeView.swift`

### Phase 2
- `CameraSharing/Services/BonjourService.swift`
- `CameraSharing/Services/LocalSignalingService.swift`
- `CameraSharing/Views/DeviceListView.swift`
- `CameraSharing/Views/SettingsView.swift`

## リスク・注意点

1. **WebRTC for iOS の学習コスト**
   - ブラウザAPIと異なるため、ドキュメント学習が必要
   - GoogleWebRTC.framework のバージョン管理

2. **Bonjourの制約**
   - 同一Wi-Fiネットワークのみ（異なるネットワーク越しは不可）
   - 企業Wi-Fiでは mDNS がブロックされる可能性

3. **バッテリー消費**
   - 常時カメラ・通信が動作
   - バックグラウンド動作時の制限（iOS 15以降）

4. **App Store審査**
   - カメラ・マイク権限の使用理由を明確に
   - プライバシーポリシーが必須

5. **テスト環境**
   - 実機2台以上が必要（シミュレータではカメラ・ネットワークテスト不可）

## 完了条件

### Phase 1: 基本機能（Web版互換）
- [x] Xcodeプロジェクト作成
- [ ] カメラアクセス実装
- [ ] WebRTC統合
- [ ] PeerJS互換シグナリング
- [ ] QRコード生成・スキャン
- [ ] UI実装（基本）
- [ ] Web版と相互接続可能（PeerJS経由）

### Phase 2: ローカル化
- [ ] Bonjourデバイス検索実装
- [ ] ローカルシグナリング実装
- [ ] **完全オフライン動作確認**
- [ ] iOS端末間のみでローカル接続成功

### Phase 3: リリース準備（MVP）
- [ ] アプリアイコン・スクリーンショット作成
- [ ] App Store説明文・プライバシーポリシー作成
- [ ] TestFlightベータテスト完了
- [ ] **MVP リリース** 🚀

### Phase 4: 追加機能 & 最適化（リリース後）
- [ ] ユーザーフィードバック反映
- [ ] 追加機能実装（オプション）
- [ ] 最適化完了
- [ ] テスト強化

## 技術的判断の記録

### Bonjourを選んだ理由
- iOS標準API（Network.framework）で実装可能
- 追加ライブラリ不要
- 同一ネットワーク内で信頼性が高い
- TXTレコードでメタデータ送信可能

### WebRTC for iOSライブラリの選択
- **GoogleWebRTC.framework**を選択
  - 公式サポート
  - Swift Package Manager対応
  - Web版との互換性が高い
  - ドキュメントが充実

### シグナリング方式の二段階実装
- **Phase 1: PeerJS互換**
  - Web版との相互接続を優先
  - 既存インフラを活用
  - 実装リスクが低い

- **Phase 2: ローカルシグナリング**
  - 完全オフライン動作を実現
  - ユーザー要件を満たす
  - Phase 1の知見を活かせる

## 参考資料

- [WebRTC for iOS Official Guide](https://webrtc.github.io/webrtc-org/native-code/ios/)
- [Apple Network Framework Documentation](https://developer.apple.com/documentation/network)
- [Bonjour Programming Guide](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/NetServices/)
- [Ray Wenderlich WebRTC Tutorial](https://www.raywenderlich.com/21477552-webrtc-tutorial-for-ios)
