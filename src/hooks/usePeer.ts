/**
 * PeerJS管理のカスタムフック
 */

import { useState, useEffect, useCallback } from 'react'
import type Peer from 'peerjs'
import { createPeer, destroyPeer } from '@/utils/peerUtils'

/**
 * PeerJS接続を管理するカスタムフック
 * @param roomId - ルームID（オプション）
 * @returns Peer接続の状態と操作関数
 */
export function usePeer(roomId?: string) {
  const [peer, setPeer] = useState<Peer | null>(null)
  const [peerId, setPeerId] = useState<string>('')
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Peerを初期化
   */
  const initializePeer = useCallback(() => {
    try {
      setError(null)
      setIsReady(false)

      // Peerインスタンスを作成
      const newPeer = createPeer(roomId)

      // open イベント: Peer接続が確立された
      newPeer.on('open', (id: string) => {
        console.log('Peer接続が確立されました:', id)
        setPeerId(id)
        setIsReady(true)
        setError(null)
      })

      // error イベント: エラーが発生
      newPeer.on('error', (err: Error) => {
        console.error('Peerエラー:', err)

        // エラーの種類に応じたメッセージを設定
        let errorMessage = 'Peer接続でエラーが発生しました'

        if (err.message.includes('ID') && err.message.includes('taken')) {
          errorMessage = '指定されたルームIDは既に使用されています'
        } else if (err.message.includes('network')) {
          errorMessage = 'ネットワーク接続エラーが発生しました'
        } else if (err.message.includes('unavailable')) {
          errorMessage = 'PeerJSサーバーに接続できません'
        } else {
          errorMessage = `Peer接続エラー: ${err.message}`
        }

        setError(errorMessage)
        setIsReady(false)
      })

      // close イベント: Peer接続が閉じられた
      newPeer.on('close', () => {
        console.log('Peer接続が閉じられました')
        setIsReady(false)
      })

      // disconnected イベント: サーバーから切断された
      newPeer.on('disconnected', () => {
        console.log('Peerサーバーから切断されました')
        setIsReady(false)

        // 自動再接続を試みる
        if (!newPeer.destroyed) {
          console.log('Peerサーバーへの再接続を試みています...')
          newPeer.reconnect()
        }
      })

      setPeer(newPeer)
    } catch (err) {
      console.error('Peer初期化エラー:', err)
      setError('Peerの初期化に失敗しました')
      setIsReady(false)
    }
  }, [roomId])

  /**
   * Peer初期化とクリーンアップ
   */
  useEffect(() => {
    initializePeer()

    // クリーンアップ処理
    return () => {
      if (peer) {
        console.log('Peerをクリーンアップしています...')
        destroyPeer(peer)
        setPeer(null)
        setPeerId('')
        setIsReady(false)
      }
    }
  }, []) // initializePeerは依存配列に含めない（無限ループ防止）

  /**
   * Peerを再初期化
   */
  const reconnect = useCallback(() => {
    if (peer) {
      destroyPeer(peer)
    }
    initializePeer()
  }, [peer, initializePeer])

  return {
    peer,
    peerId,
    isReady,
    error,
    reconnect,
  }
}
