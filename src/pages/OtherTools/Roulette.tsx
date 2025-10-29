import { useState } from 'react'
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
} from '../../utils/rouletteUtils'
import styles from './Roulette.module.css'

function Roulette() {
  const [items, setItems] = useState<RouletteItem[]>(getDefaultItems())
  const [newLabel, setNewLabel] = useState('')
  const [newColor, setNewColor] = useState(generateRandomColor())
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [winner, setWinner] = useState<RouletteItem | null>(null)

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

    const { winnerIndex, finalRotation } = calculateWinnerRotation(
      items.length,
      rotation
    )

    setRotation(finalRotation)

    // アニメーション完了後に当選者を表示
    setTimeout(() => {
      setWinner(items[winnerIndex])
      setSpinning(false)
    }, 4000)
  }

  const handleReset = () => {
    setWinner(null)
    setSpinning(false)
  }

  // ルーレット描画の設定
  const centerX = 200
  const centerY = 200
  const radius = 180
  const anglePerItem = 360 / items.length

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>ルーレット</h2>

      {/* ルーレット表示エリア */}
      <div className={styles.rouletteWrapper}>
        <div className={styles.markerWrapper}>
          <div className={styles.marker} />
        </div>
        <svg
          className={styles.roulette}
          viewBox="0 0 400 400"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
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
                  fill="#fff"
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

      {/* 結果表示 */}
      {winner && (
        <div className={styles.result} role="alert" aria-live="polite">
          <div className={styles.resultLabel}>当選</div>
          <div className={styles.resultWinner} style={{ color: winner.color }}>
            {winner.label}
          </div>
        </div>
      )}

      {/* コントロール */}
      <div className={styles.controls}>
        <Button onClick={handleSpin} disabled={spinning || items.length < 2} size="lg">
          {spinning ? '回転中...' : '開始'}
        </Button>
        {winner && (
          <Button onClick={handleReset} variant="secondary">
            もう一度
          </Button>
        )}
      </div>

      {/* 項目管理 */}
      <div className={styles.itemsSection}>
        <h3 className={styles.sectionTitle}>項目設定</h3>

        {/* 追加フォーム */}
        <div className={styles.addForm}>
          <div className={styles.formGroup}>
            <Label htmlFor="color">色</Label>
            <Input
              id="color"
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              className="w-[60px] h-10 cursor-pointer flex-shrink-0"
            />
          </div>
          <div className={styles.formGroup}>
            <Label htmlFor="label">ラベル</Label>
            <Input
              id="label"
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
              placeholder="項目名を入力"
              maxLength={20}
              className="flex-1 min-w-0 h-10 min-h-10"
            />
          </div>
          <Button
            onClick={handleAddItem}
            disabled={!newLabel.trim() || items.length >= 20}
            className="h-10"
          >
            追加
          </Button>
        </div>
        {items.length >= 20 && (
          <p className={styles.warning}>項目は最大20個までです</p>
        )}

        {/* 項目リスト */}
        <div className={styles.itemsList}>
          {items.map((item) => (
            <div key={item.id} className={styles.itemRow}>
              <Input
                type="color"
                value={item.color}
                onChange={(e) => handleUpdateItem(item.id, 'color', e.target.value)}
                className={styles.itemColorInput}
                aria-label={`${item.label}の色`}
              />
              <Input
                type="text"
                value={item.label}
                onChange={(e) => handleUpdateItem(item.id, 'label', e.target.value)}
                className={styles.itemLabelInput}
                maxLength={20}
                aria-label="項目ラベル"
              />
              <button
                onClick={() => handleDeleteItem(item.id)}
                className={styles.deleteButton}
                aria-label={`${item.label}を削除`}
                disabled={items.length <= 2}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Roulette
