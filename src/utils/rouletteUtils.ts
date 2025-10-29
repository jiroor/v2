export interface RouletteItem {
  id: string
  label: string
  color: string
}

/**
 * 極座標をデカルト座標に変換
 */
export const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  }
}

/**
 * SVG扇形のパスを生成
 */
export const createArcPath = (
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string => {
  const start = polarToCartesian(centerX, centerY, radius, endAngle)
  const end = polarToCartesian(centerX, centerY, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

  return [
    'M',
    centerX,
    centerY,
    'L',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    'Z',
  ].join(' ')
}

/**
 * テキストを配置する位置を計算（扇形の中央）
 */
export const calculateTextPosition = (
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
): { x: number; y: number; angle: number } => {
  const middleAngle = (startAngle + endAngle) / 2
  const textRadius = radius * 0.7 // 中心から70%の位置
  const position = polarToCartesian(centerX, centerY, textRadius, middleAngle)

  return {
    x: position.x,
    y: position.y,
    angle: middleAngle,
  }
}

/**
 * ランダムな当選者を決定し、最終回転角度を計算
 * 針は上部（12時の位置）に固定されており、ルーレットが回転する
 * 回転後、針が指している項目が当選する
 */
export const calculateWinnerRotation = (
  itemCount: number,
  currentRotation: number = 0
): { winnerIndex: number; finalRotation: number } => {
  const winnerIndex = Math.floor(Math.random() * itemCount)
  const anglePerItem = 360 / itemCount
  const baseRotation = 360 * 5 // 5回転

  // 現在の回転角度を0-360度の範囲に正規化
  const normalizedCurrentRotation = ((currentRotation % 360) + 360) % 360

  // 当選項目の中央の角度（0度基準）
  const targetAngle = winnerIndex * anglePerItem + anglePerItem / 2

  // 現在の正規化された角度から、目標角度まで回転する必要がある角度を計算
  // 針は上部（0度）にあるので、targetAngleの位置を0度に持ってくる
  // つまり、-targetAngle分回転させる必要がある
  // しかし、現在の位置も考慮する必要がある
  let rotationNeeded = -targetAngle - normalizedCurrentRotation

  // 回転が負の場合は、360度を加えて正の回転にする
  if (rotationNeeded < 0) {
    rotationNeeded += 360
  }

  // 最終回転角度 = 現在の回転 + 基本回転（5回転）+ 必要な回転
  const finalRotation = currentRotation + baseRotation + rotationNeeded

  return {
    winnerIndex,
    finalRotation,
  }
}

/**
 * デフォルトのルーレット項目を生成
 */
export const getDefaultItems = (): RouletteItem[] => [
  { id: '1', label: 'オプション1', color: '#FF6B6B' },
  { id: '2', label: 'オプション2', color: '#4ECDC4' },
  { id: '3', label: 'オプション3', color: '#45B7D1' },
  { id: '4', label: 'オプション4', color: '#FFA07A' },
]

/**
 * ランダムな色を生成
 */
export const generateRandomColor = (): string => {
  const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#96CEB4',
    '#FFEAA7',
    '#DFE6E9',
    '#74B9FF',
    '#A29BFE',
    '#FD79A8',
    '#FDCB6E',
    '#6C5CE7',
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}
