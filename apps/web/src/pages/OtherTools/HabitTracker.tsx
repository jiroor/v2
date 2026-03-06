import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { SEO } from '@/components/SEO/SEO'

interface Habit {
  id: string
  name: string
  emoji: string
  streak: number
  completedToday: boolean
  lastCompleted: string | null
}

const EMOJIS = ['✅', '💪', '📚', '🏃', '💧', '🧘', '📝', '🎯', '🍎', '💤']

function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habits')
    return saved ? JSON.parse(saved) : []
  })
  const [newHabitName, setNewHabitName] = useState('')
  const [newHabitEmoji, setNewHabitEmoji] = useState('✅')

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  // Check if habits need to be reset for a new day
  useEffect(() => {
    const today = new Date().toDateString()
    setHabits(prev => prev.map(habit => {
      if (habit.lastCompleted && habit.lastCompleted !== today && habit.completedToday) {
        return { ...habit, completedToday: false }
      }
      return habit
    }))
  }, [])

  const addHabit = () => {
    if (!newHabitName.trim()) return

    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newHabitName,
      emoji: newHabitEmoji,
      streak: 0,
      completedToday: false,
      lastCompleted: null,
    }

    setHabits([...habits, newHabit])
    setNewHabitName('')
  }

  const toggleHabit = (id: string) => {
    const today = new Date().toDateString()
    
    setHabits(habits.map(habit => {
      if (habit.id !== id) return habit

      const wasCompleted = habit.completedToday
      const newCompleted = !wasCompleted
      
      let newStreak = habit.streak
      let newLastCompleted = habit.lastCompleted

      if (newCompleted && !wasCompleted) {
        // Completing a habit
        newStreak = habit.streak + 1
        newLastCompleted = today
      } else if (!newCompleted && wasCompleted) {
        // Uncompleting a habit
        newStreak = Math.max(0, habit.streak - 1)
        newLastCompleted = null
      }

      return {
        ...habit,
        completedToday: newCompleted,
        streak: newStreak,
        lastCompleted: newLastCompleted,
      }
    }))
  }

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id))
  }

  const getTodayString = () => {
    return new Date().toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    })
  }

  return (
    <>
      <SEO path="/other/habit-tracker" />
      <div className="max-w-[500px] mx-auto py-8 px-4">
        <h2 className="text-2xl font-semibold mb-2 text-center">習慣トラッカー</h2>
        <p className="text-center text-gray-500 text-sm mb-6">{getTodayString()}</p>

        {/* 新しい習慣追加 */}
        <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-md">
          <h3 className="font-semibold mb-3 text-sm">新しい習慣を追加</h3>
          <div className="flex gap-2 mb-3">
            <select
              value={newHabitEmoji}
              onChange={(e) => setNewHabitEmoji(e.target.value)}
              className="p-3 border border-gray-200 rounded-md text-xl"
            >
              {EMOJIS.map(emoji => (
                <option key={emoji} value={emoji}>{emoji}</option>
              ))}
            </select>
            <input
              type="text"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              placeholder="習慣名（例: 朝の運動）"
              className="flex-1 p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              onKeyDown={(e) => e.key === 'Enter' && addHabit()}
            />
          </div>
          <Button onClick={addHabit} className="w-full">
            追加
          </Button>
        </div>

        {/* 習慣リスト */}
        {habits.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            習慣を追加してください
          </div>
        ) : (
          <div className="space-y-3">
            {habits.map(habit => (
              <div
                key={habit.id}
                className={`flex items-center gap-3 p-4 rounded-md border transition-all ${
                  habit.completedToday
                    ? 'bg-green-50 border-green-300'
                    : 'bg-white border-gray-200'
                }`}
              >
                <button
                  onClick={() => toggleHabit(habit.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all ${
                    habit.completedToday
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {habit.completedToday ? '✓' : habit.emoji}
                </button>
                <div className="flex-1">
                  <h4 className={`font-medium ${habit.completedToday ? 'line-through text-gray-400' : ''}`}>
                    {habit.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    🔥 {habit.streak}日連続
                  </p>
                </div>
                <Button
                  onClick={() => deleteHabit(habit.id)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-red-500"
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* 統計 */}
        {habits.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">今日の達成率</p>
              <p className="text-2xl font-bold text-[#d97706]">
                {Math.round((habits.filter(h => h.completedToday).length / habits.length) * 100)}%
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">最長ストリーク</p>
              <p className="text-2xl font-bold text-[#d97706]">
                {Math.max(...habits.map(h => h.streak))}日
              </p>
            </div>
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 毎日の習慣を記録</li>
            <li>• 連続達成日数（ストリーク）を追跡</li>
            <li>• データはブラウザに保存</li>
            <li>• 習慣化の継続に便利</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default HabitTracker
