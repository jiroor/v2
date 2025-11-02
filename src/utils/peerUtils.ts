/**
 * PeerJS関連のユーティリティ関数
 */

import Peer, { DataConnection, MediaConnection } from 'peerjs'
import { PEER_CONFIG } from '@/constants/camera'

/**
 * PeerJSインスタンスを作成
 * @param roomId - ルームID（オプション。指定した場合はそのIDでPeerを作成）
 * @returns PeerJSインスタンス
 */
export function createPeer(roomId?: string): Peer {
  const config = {
    debug: PEER_CONFIG.debug,
    config: {
      iceServers: [
        // Google STUNサーバー
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
        { urls: 'stun:stun3.l.google.com:19302' },
        { urls: 'stun:stun4.l.google.com:19302' },
      ],
    },
  }

  // roomIdが指定されている場合はそのIDでPeerを作成
  // 指定されていない場合はPeerJSが自動でIDを生成
  if (roomId) {
    return new Peer(roomId, config)
  } else {
    return new Peer(config)
  }
}

/**
 * Peerの接続状態を確認
 * @param peer - PeerJSインスタンス
 * @returns 接続されている場合true
 */
export function isPeerConnected(peer: Peer | null): boolean {
  if (!peer) return false

  // Peerが破棄されていないか、disconnectedではないかを確認
  return !peer.destroyed && !peer.disconnected
}

/**
 * Peerを破棄
 * @param peer - PeerJSインスタンス
 */
export function destroyPeer(peer: Peer | null): void {
  if (!peer) return

  try {
    // すべての接続を閉じる
    const connections = peer.connections as Record<string, Array<DataConnection | MediaConnection>>
    Object.keys(connections).forEach((peerId) => {
      const peerConnections = connections[peerId]
      peerConnections.forEach((connection) => {
        connection.close()
      })
    })

    // Peerを破棄
    if (!peer.destroyed) {
      peer.destroy()
    }
  } catch (error) {
    // エラーが発生してもクリーンアップは続行
    console.error('Peer破棄時にエラーが発生しました:', error)
  }
}
