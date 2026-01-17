export interface TextStats {
  chars: number
  charsNoSpaces: number
  words: number
  lines: number
}

export function countText(text: string): TextStats {
  // 文字数（全体）
  const chars = text.length

  // 文字数（スペース除く）
  const charsNoSpaces = text.replace(/\s/g, '').length

  // 行数
  const lines = text === '' ? 0 : text.split('\n').length

  // 単語数
  // 英語: スペース区切りで単語をカウント
  // 日本語: 簡易的に文字数としてカウント（厳密な単語分割は形態素解析が必要）
  let words = 0

  // 空文字の場合は0
  if (text.trim() === '') {
    words = 0
  } else {
    // 英数字を含む単語をカウント
    const latinWords = text.match(/[a-zA-Z0-9]+/g)
    const latinWordCount = latinWords ? latinWords.length : 0

    // 日本語文字（ひらがな、カタカナ、漢字）をカウント
    const japaneseChars = text.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/g)
    const japaneseCharCount = japaneseChars ? japaneseChars.length : 0

    // 両方を合計（簡易的な実装）
    words = latinWordCount + japaneseCharCount
  }

  return {
    chars,
    charsNoSpaces,
    words,
    lines,
  }
}
