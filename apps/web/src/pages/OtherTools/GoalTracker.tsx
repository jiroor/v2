import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

interface Goal {
  id: string
  name: string
  target: number
  current: number
  unit: string
}

function GoalTracker() {
  useToolUsageTracking('/other/goal-tracker', '目標達成トラッカー')
  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('goals')
    return saved ? JSON.parse(saved) : []
  })
  const [newGoalName, setNewGoalName] = useState('')
  const [newGoalTarget, setNewGoalTarget] = useState('')
  const [newGoalUnit, setNewGoalUnit] = useState('')

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals))
  }, [goals])

  const addGoal = () => {
    if (!newGoalName || !newGoalTarget) return

    const newGoal: Goal = {
      id: Date.now().toString(),
      name: newGoalName,
      target: parseFloat(newGoalTarget),
      current: 0,
      unit: newGoalUnit || '回',
    }

    setGoals([...goals, newGoal])
    setNewGoalName('')
    setNewGoalTarget('')
    setNewGoalUnit('')
  }

  const updateProgress = (id: string, amount: number) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { ...goal, current: Math.max(0, goal.current + amount) }
        : goal
    ))
  }

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id))
  }

  const getProgress = (goal: Goal) => {
    return Math.min(100, (goal.current / goal.target) * 100)
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'bg-green-500'
    if (progress >= 75) return 'bg-blue-500'
    if (progress >= 50) return 'bg-yellow-500'
    if (progress >= 25) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <>
      <SEO path="/other/goal-tracker" />
      <div className="max-w-[500px] mx-auto py-8 px-4">
        <ToolHeader title="目標達成トラッカー" toolPath="/other/goal-tracker" shareTitle="目標達成トラッカー | Rakit" />

        {/* 新しい目標追加 */}
        <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-md">
          <h3 className="font-semibold mb-3 text-sm">新しい目標を追加</h3>
          <div className="space-y-3">
            <input
              type="text"
              value={newGoalName}
              onChange={(e) => setNewGoalName(e.target.value)}
              placeholder="目標名（例: 読書, 運動, 貯金）"
              className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
            <div className="flex gap-2">
              <input
                type="number"
                value={newGoalTarget}
                onChange={(e) => setNewGoalTarget(e.target.value)}
                placeholder="目標数"
                className="flex-1 p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              />
              <input
                type="text"
                value={newGoalUnit}
                onChange={(e) => setNewGoalUnit(e.target.value)}
                placeholder="単位"
                className="w-20 p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              />
            </div>
            <Button onClick={addGoal} className="w-full">
              追加
            </Button>
          </div>
        </div>

        {/* 目標リスト */}
        {goals.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            目標を追加してください
          </div>
        ) : (
          <div className="space-y-4">
            {goals.map(goal => {
              const progress = getProgress(goal)
              return (
                <div key={goal.id} className="bg-white border border-gray-200 rounded-md p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{goal.name}</h4>
                      <p className="text-sm text-gray-600">
                        {goal.current} / {goal.target} {goal.unit}
                      </p>
                    </div>
                    {progress >= 100 && (
                      <span className="text-2xl">🎉</span>
                    )}
                  </div>

                  {/* プログレスバー */}
                  <div className="bg-gray-200 rounded-full h-3 overflow-hidden mb-3">
                    <div
                      className={`h-full ${getProgressColor(progress)} transition-all duration-300`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* 進捗率 */}
                  <p className="text-xs text-gray-500 mb-3">
                    達成率: {progress.toFixed(1)}%
                  </p>

                  {/* 操作ボタン */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => updateProgress(goal.id, 1)}
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      +1
                    </Button>
                    <Button
                      onClick={() => updateProgress(goal.id, -1)}
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      -1
                    </Button>
                    <Button
                      onClick={() => updateProgress(goal.id, 5)}
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      +5
                    </Button>
                    <Button
                      onClick={() => deleteGoal(goal.id)}
                      size="sm"
                      variant="destructive"
                    >
                      削除
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 目標を設定して進捗を管理</li>
            <li>• データはブラウザに保存</li>
            <li>• 達成すると🎉が表示</li>
            <li>• 習慣化、目標達成に便利</li>
          </ul>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            目標トラッカーは、目標を設定して進捗を管理する無料のオンラインツールです。目標の現在値と目標値を設定し、達成率をリアルタイムで表示します。習慣化や目標達成に役立ちます。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• プログレスバーで進捗を可視化</li>
            <li>• ブラウザに保存</li>
            <li>• 達成時にお祝い表示</li>
            <li>• 完全無料、インストール不要</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. データは保存されますか？</p>
              <p>A. はい、ブラウザに自動保存されます。</p>
            </div>
            <div>
              <p className="font-medium">Q. 複数の目標を設定できますか？</p>
              <p>A. はい、複数の目標を同時に管理できます。</p>
            </div>
          </div>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner slot="TOOL_BOTTOM" format="rectangle" />
      </div>
    </>
  )
}

export default GoalTracker
