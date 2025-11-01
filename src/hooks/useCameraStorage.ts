/**
 * カメラ情報のLocalStorage管理カスタムフック
 */

import { useCallback } from 'react'
import type { SavedCameras, SavedCamera } from '@/types/camera'
import { STORAGE_KEYS } from '@/constants/camera'

/**
 * LocalStorageでカメラ情報を管理するカスタムフック
 */
export function useCameraStorage() {
  /**
   * 保存されたカメラ一覧を取得
   * @returns 保存されたカメラ一覧
   */
  const getSavedCameras = useCallback((): SavedCameras => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_CAMERAS)
      if (!data) {
        return { cameras: [] }
      }

      const parsed = JSON.parse(data) as SavedCameras

      // データ構造の検証
      if (!parsed || !Array.isArray(parsed.cameras)) {
        console.warn('保存されたカメラデータの形式が不正です')
        return { cameras: [] }
      }

      return parsed
    } catch (error) {
      console.error('カメラデータの読み込みに失敗しました:', error)
      return { cameras: [] }
    }
  }, [])

  /**
   * カメラを保存
   * @param camera - 保存するカメラ情報
   */
  const saveCamera = useCallback(
    (camera: SavedCamera): void => {
      try {
        const savedCameras = getSavedCameras()
        const cameras = savedCameras.cameras

        // 同じIDのカメラが既に存在する場合は更新
        const existingIndex = cameras.findIndex((c) => c.id === camera.id)

        if (existingIndex >= 0) {
          cameras[existingIndex] = camera
        } else {
          // 新規追加（最新のものを先頭に）
          cameras.unshift(camera)
        }

        // 最大20件まで保存
        const limitedCameras = cameras.slice(0, 20)

        const newData: SavedCameras = {
          cameras: limitedCameras,
        }

        localStorage.setItem(STORAGE_KEYS.SAVED_CAMERAS, JSON.stringify(newData))
      } catch (error) {
        console.error('カメラの保存に失敗しました:', error)
        throw new Error('カメラの保存に失敗しました')
      }
    },
    [getSavedCameras]
  )

  /**
   * カメラを削除
   * @param cameraId - 削除するカメラのID
   */
  const removeCamera = useCallback(
    (cameraId: string): void => {
      try {
        const savedCameras = getSavedCameras()
        const cameras = savedCameras.cameras

        // 指定されたIDのカメラを除外
        const filteredCameras = cameras.filter((c) => c.id !== cameraId)

        const newData: SavedCameras = {
          cameras: filteredCameras,
        }

        localStorage.setItem(STORAGE_KEYS.SAVED_CAMERAS, JSON.stringify(newData))
      } catch (error) {
        console.error('カメラの削除に失敗しました:', error)
        throw new Error('カメラの削除に失敗しました')
      }
    },
    [getSavedCameras]
  )

  /**
   * 全カメラを削除
   */
  const clearCameras = useCallback((): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.SAVED_CAMERAS)
    } catch (error) {
      console.error('カメラデータのクリアに失敗しました:', error)
      throw new Error('カメラデータのクリアに失敗しました')
    }
  }, [])

  return {
    getSavedCameras,
    saveCamera,
    removeCamera,
    clearCameras,
  }
}
