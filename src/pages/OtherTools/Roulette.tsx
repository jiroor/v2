import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trash2 } from 'lucide-react'
import {
  RouletteItem,
  getDefaultItems,
  generateRandomColor,
  createArcPath,
  calculateTextPosition,
  calculateWinnerRotation,
  getContrastTextColor,
} from '../../utils/rouletteUtils'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'

function Roulette() {
  const [items, setItems] = useState<RouletteItem[]>(getDefaultItems())
  const [newLabel, setNewLabel] = useState('')
  const [newColor, setNewColor] = useState(generateRandomColor())
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [winner, setWinner] = useState<RouletteItem | null>(null)
  const [spinDuration, setSpinDuration] = useState(4000)
  const labelInputRef = useRef<HTMLInputElement>(null)

  const handleAddItem = () => {
    if (!newLabel.trim()) return
    if (items.length >= 20) {
      alert('項目は最大20個までです')
      return
    }

    const newItem: RouletteItem = {
      id: Date.now().toString(),
      label: newLabel.trim(),
      color: newColor,
    }

    setItems([...items, newItem])
    setNewLabel('')
    setNewColor(generateRandomColor())
  }

  const handleDeleteItem = (id: string) => {
    if (items.length <= 2) {
      alert('項目は最低2個必要です')
      return
    }
    setItems(items.filter((item) => item.id !== id))
  }

  const handleUpdateItem = (id: string, field: 'label' | 'color', value: string) => {
    setItems(items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const handleSpin = () => {
    if (spinning) return
    if (items.length < 2) {
      alert('項目は最低2個必要です')
      return
    }

    setSpinning(true)
    setWinner(null)

    // 回転時間を3.5秒〜5.5秒でランダムに変動
    const randomDuration = 3500 + Math.random() * 2000
    setSpinDuration(randomDuration)

    const { winnerIndex, finalRotation } = calculateWinnerRotation(
      items.length,
      rotation
    )

    setRotation(finalRotation)

    // アニメーション完了後に当選者を表示
    setTimeout(() => {
      setWinner(items[winnerIndex])
      setSpinning(false)
    }, randomDuration)
  }

  const handleReset = () => {
    setWinner(null)
    setSpinning(false)
  }

  const handleFocusInput = () => {
    labelInputRef.current?.focus()
  }

  // キーボードショートカットの設定
  const shortcuts = [
    {
      key: ' ',
      description: '回転開始',
      action: handleSpin,
      disabled: spinning || items.length < 2,
    },
    {
      key: 'r',
      description: 'もう一度',
      action: handleReset,
      disabled: !winner,
    },
    {
      key: 'a',
      description: '項目追加（入力欄にフォーカス）',
      action: handleFocusInput,
    },
  ]

  useKeyboardShortcut(shortcuts)

  // ルーレット描画の設定
  const centerX = 200
  const centerY = 200
  const radius = 180
  const anglePerItem = 360 / items.length

  return (
    <div className="p-6 max-w-[800px] mx-auto md:p-4">
      <div className="relative mb-6">
        <h2 className="text-[28px] font-bold text-center">ルーレット</h2>
        {winner && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-4 rounded-[var(--border-radius)] border-2 border-[var(--color-border)] shadow-[0_4px_12px_rgba(0,0,0,0.15)] z-10 text-center min-w-[200px]">
            <div className="text-sm font-bold mb-1 text-[var(--color-text-secondary)]">当選</div>
            <div
              className="text-2xl font-bold"
              style={{
                color: winner.color,
                WebkitTextStroke: '2px #000',
                paintOrder: 'stroke fill',
              }}
            >
              {winner.label}
            </div>
          </div>
        )}
      </div>

      {/* ルーレット表示エリア */}
      <div className="relative w-full max-w-[400px] mx-auto mb-6 md:max-w-[300px]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[32px] border-t-[#e74c3c] [filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.3))]" />
        </div>
        <svg
          className="w-full h-auto block"
          viewBox="0 0 400 400"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? `transform ${spinDuration}ms cubic-bezier(0.17, 0.67, 0.12, 0.99)` : 'none',
          }}
        >
          {items.map((item, index) => {
            const startAngle = index * anglePerItem
            const endAngle = (index + 1) * anglePerItem
            const arcPath = createArcPath(
              centerX,
              centerY,
              radius,
              startAngle,
              endAngle
            )
            const textPos = calculateTextPosition(
              centerX,
              centerY,
              radius,
              startAngle,
              endAngle
            )

            return (
              <g key={item.id}>
                {/* 扇形 */}
                <path d={arcPath} fill={item.color} stroke="#fff" strokeWidth="2" />
                {/* ラベル */}
                <text
                  x={textPos.x}
                  y={textPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={getContrastTextColor(item.color)}
                  fontSize={items.length > 8 ? '12' : '14'}
                  fontWeight="bold"
                  style={{
                    transform: `rotate(${textPos.angle}deg)`,
                    transformOrigin: `${textPos.x}px ${textPos.y}px`,
                    pointerEvents: 'none',
                  }}
                >
                  {item.label}
                </text>
              </g>
            )
          })}
          {/* 中央の円 */}
          <circle cx={centerX} cy={centerY} r="30" fill="#fff" stroke="#333" strokeWidth="2" />
        </svg>
      </div>

      {/* コントロール */}
      <div className="flex justify-center gap-4 mb-8">
        <Button onClick={handleSpin} disabled={spinning || items.length < 2} size="lg" className="min-w-[120px]">
          {spinning ? '回転中...' : '開始'}
        </Button>
        {winner && (
          <Button onClick={handleReset} variant="secondary" size="lg" className="min-w-[120px]">
            もう一度
          </Button>
        )}
      </div>

      {/* 項目管理 */}
      <div className="border-t border-[var(--color-border)] pt-6">
        <h3 className="text-xl font-bold mb-4">項目設定</h3>

        {/* 追加フォーム */}
        <div className="flex flex-col gap-2 mb-4 p-2 bg-[var(--color-background)] rounded-[var(--border-radius)]">
          <div className="flex gap-3 items-end w-full">
            <div className="flex flex-col gap-1">
              <Label htmlFor="color">色</Label>
              <Input
                id="color"
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="w-[60px] h-10 cursor-pointer flex-shrink-0 rounded-r-none border-r-0"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <Label htmlFor="label">ラベル</Label>
              <Input
                ref={labelInputRef}
                id="label"
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                    handleAddItem()
                  }
                }}
                placeholder="項目名を入力"
                maxLength={20}
                className="flex-1 min-w-0 h-10 min-h-10 rounded-l-none -ml-px"
              />
            </div>
          </div>
          <Button
            onClick={handleAddItem}
            disabled={!newLabel.trim() || items.length >= 20}
            size="sm"
            className="self-center"
          >
            追加
          </Button>
        </div>
        {items.length >= 20 && (
          <p className="mt-2 text-sm text-[#e74c3c] text-center">項目は最大20個までです</p>
        )}

        {/* 項目リスト */}
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-2 bg-[var(--color-background)] rounded-[var(--border-radius)]">
              <Input
                type="color"
                value={item.color}
                onChange={(e) => handleUpdateItem(item.id, 'color', e.target.value)}
                className="w-[60px] h-10 cursor-pointer flex-shrink-0 rounded-tr-none rounded-br-none border-r-0"
                aria-label={`${item.label}の色`}
              />
              <Input
                type="text"
                value={item.label}
                onChange={(e) => handleUpdateItem(item.id, 'label', e.target.value)}
                className="flex-1 min-w-0 rounded-tl-none rounded-bl-none -ml-px"
                maxLength={20}
                aria-label="項目ラベル"
              />
              <Button
                onClick={() => handleDeleteItem(item.id)}
                variant="ghost"
                size="icon"
                className="bg-transparent border-0 cursor-pointer text-[var(--color-text-secondary)] p-2 flex items-center justify-center rounded-full transition-all min-w-[40px] min-h-[40px] hover:text-[#e74c3c] hover:bg-[rgba(231,76,60,0.1)] disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label={`${item.label}を削除`}
                disabled={items.length <= 2}
              >
                <Trash2 size={18} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* ショートカットキー一覧 */}
      <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />
    </div>
  )
}

export default Roulette
