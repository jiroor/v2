// 文字セット定数
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()-_=+[]{}|;:,.<>?'

export interface RandomStringOptions {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
}

/**
 * ランダムな文字列を生成する
 * crypto.getRandomValues()を使用して暗号学的に安全な乱数を生成
 */
export function generateRandomString(options: RandomStringOptions): string {
  const {
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  } = options

  // 利用可能な文字セットを構築
  let charset = ''
  if (includeUppercase) charset += UPPERCASE
  if (includeLowercase) charset += LOWERCASE
  if (includeNumbers) charset += NUMBERS
  if (includeSymbols) charset += SYMBOLS

  // 文字セットが空の場合はエラー
  if (charset.length === 0) {
    throw new Error('少なくとも1つの文字種を選択してください')
  }

  // crypto.getRandomValues()を使用してランダムな文字列を生成
  const randomValues = new Uint32Array(length)
  crypto.getRandomValues(randomValues)

  let result = ''
  for (let i = 0; i < length; i++) {
    // ランダム値を文字セットのインデックスに変換
    const randomIndex = randomValues[i] % charset.length
    result += charset[randomIndex]
  }

  return result
}

/**
 * デフォルトオプションでランダム文字列を生成
 */
export function generateDefaultRandomString(): string {
  return generateRandomString({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: false,
  })
}
