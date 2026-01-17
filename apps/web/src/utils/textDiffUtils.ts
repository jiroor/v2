export type DiffType = 'added' | 'removed' | 'unchanged'

export interface DiffLine {
  type: DiffType
  content: string
  originalLineNumber?: number
  newLineNumber?: number
}

/**
 * 2つのテキストの差分を計算する（簡易版）
 * 行単位で比較し、追加/削除/変更なしを判定
 */
export function calculateDiff(original: string, modified: string): DiffLine[] {
  const originalLines = original.split('\n')
  const modifiedLines = modified.split('\n')

  const result: DiffLine[] = []

  // 簡易的なLCSベースの差分計算
  const lcs = computeLCS(originalLines, modifiedLines)

  let i = 0 // originalのインデックス
  let j = 0 // modifiedのインデックス
  let lcsIndex = 0 // LCSのインデックス

  while (i < originalLines.length || j < modifiedLines.length) {
    const currentLCS = lcs[lcsIndex]

    // 両方が一致する場合（変更なし）
    if (
      currentLCS !== undefined &&
      i < originalLines.length &&
      j < modifiedLines.length &&
      originalLines[i] === currentLCS &&
      modifiedLines[j] === currentLCS
    ) {
      result.push({
        type: 'unchanged',
        content: originalLines[i],
        originalLineNumber: i + 1,
        newLineNumber: j + 1,
      })
      i++
      j++
      lcsIndex++
    }
    // originalにのみ存在（削除された行）
    else if (
      i < originalLines.length &&
      (currentLCS === undefined || originalLines[i] !== currentLCS)
    ) {
      // modifiedに同じ行があるかチェック
      const foundInModified = modifiedLines.slice(j).indexOf(originalLines[i])
      if (foundInModified === -1 || (currentLCS !== undefined && originalLines[i] !== currentLCS)) {
        result.push({
          type: 'removed',
          content: originalLines[i],
          originalLineNumber: i + 1,
        })
        i++
      } else {
        // modifiedに追加された行
        result.push({
          type: 'added',
          content: modifiedLines[j],
          newLineNumber: j + 1,
        })
        j++
      }
    }
    // modifiedにのみ存在（追加された行）
    else if (j < modifiedLines.length) {
      result.push({
        type: 'added',
        content: modifiedLines[j],
        newLineNumber: j + 1,
      })
      j++
    }
  }

  return result
}

/**
 * 最長共通部分列（LCS）を計算
 * 2つの配列の共通する要素を順序を保ったまま抽出
 */
function computeLCS(arr1: string[], arr2: string[]): string[] {
  const m = arr1.length
  const n = arr2.length
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0))

  // DP テーブルを構築
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (arr1[i - 1] === arr2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  // LCS を再構築
  const lcs: string[] = []
  let i = m
  let j = n
  while (i > 0 && j > 0) {
    if (arr1[i - 1] === arr2[j - 1]) {
      lcs.unshift(arr1[i - 1])
      i--
      j--
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--
    } else {
      j--
    }
  }

  return lcs
}
