import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

interface Course {
  name: string
  credits: number
  grade: string
}

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0, 'A': 4.0,
  'A-': 3.7,
  'B+': 3.3, 'B': 3.0,
  'B-': 2.7,
  'C+': 2.3, 'C': 2.0,
  'C-': 1.7,
  'D+': 1.3, 'D': 1.0,
  'F': 0.0,
}

const GRADES = Object.keys(GRADE_POINTS)

function GPACalculator() {
  useToolUsageTracking('/other/gpa', 'GPA計算')
  const [courses, setCourses] = useState<Course[]>([
    { name: '', credits: 0, grade: 'A' }
  ])
  const [gpa, setGpa] = useState<number | null>(null)

  const addCourse = () => {
    setCourses([...courses, { name: '', credits: 0, grade: 'A' }])
  }

  const removeCourse = (index: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter((_, i) => i !== index))
    }
  }

  const updateCourse = (index: number, field: keyof Course, value: string | number) => {
    const updated = [...courses]
    updated[index] = { ...updated[index], [field]: value }
    setCourses(updated)
  }

  const calculate = () => {
    let totalPoints = 0
    let totalCredits = 0

    for (const course of courses) {
      if (course.credits > 0 && course.grade) {
        const points = GRADE_POINTS[course.grade] || 0
        totalPoints += course.credits * points
        totalCredits += course.credits
      }
    }

    if (totalCredits === 0) {
      setGpa(null)
      return
    }

    setGpa(totalPoints / totalCredits)
  }

  return (
    <>
      <SEO path="/other/gpa" />
      <div className="max-w-[600px] mx-auto py-8 px-4">
        <ToolHeader title="GPA計算" toolPath="/other/gpa" shareTitle="GPA計算 | Rakit" />

        {/* 科目リスト */}
        <div className="space-y-3 mb-6">
          {courses.map((course, index) => (
            <div key={index} className="flex gap-2 items-start">
              <input
                type="text"
                value={course.name}
                onChange={(e) => updateCourse(index, 'name', e.target.value)}
                placeholder="科目名"
                className="flex-1 p-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              />
              <input
                type="number"
                value={course.credits || ''}
                onChange={(e) => updateCourse(index, 'credits', parseFloat(e.target.value) || 0)}
                placeholder="単位"
                min="0"
                className="w-20 p-2 border border-gray-200 rounded-md text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              />
              <select
                value={course.grade}
                onChange={(e) => updateCourse(index, 'grade', e.target.value)}
                className="w-20 p-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              >
                {GRADES.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
              {courses.length > 1 && (
                <Button
                  onClick={() => removeCourse(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* ボタン */}
        <div className="flex gap-2 mb-6">
          <Button onClick={addCourse} variant="outline" size="lg" className="flex-1">
            + 科目追加
          </Button>
          <Button onClick={calculate} size="lg" className="flex-1">
            計算
          </Button>
        </div>

        {/* 結果 */}
        {gpa !== null && (
          <div className="bg-[#fef3c7] border border-[#d97706] rounded-md p-6 text-center">
            <p className="text-sm text-gray-600 mb-1">GPA</p>
            <p className="text-5xl font-bold text-[#d97706]">{gpa.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-2">4.0スケール</p>
          </div>
        )}

        {/* 成績ポイント一覧 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">成績ポイント一覧</h3>
          <div className="grid grid-cols-4 gap-2 text-sm">
            {Object.entries(GRADE_POINTS).map(([grade, point]) => (
              <div key={grade} className="flex justify-between px-2">
                <span>{grade}</span>
                <span className="font-mono">{point.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            GPA計算ツールは、科目の成績と単位数からGPA（成績評価平均値）を計算する無料のオンラインツールです。履修科目の成績管理や、奨学金・進学先の目標設定に役立ちます。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 科目を追加して計算</li>
            <li>• 単位数で加重平均</li>
            <li>• 4.0スケール</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. GPAとは何ですか？</p>
              <p>A. Grade Point Averageの略で、成績を数値化して平均したものです。</p>
            </div>
            <div>
              <p className="font-medium">Q. 日本の大学で使われますか？</p>
              <p>A. 留学や大学院進学で使用されます。大学ごとに計算方法が異なる場合があります。</p>
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

export default GPACalculator
