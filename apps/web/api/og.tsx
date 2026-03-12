import { ImageResponse } from '@vercel/og';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  runtime: 'edge',
};

const fonts: any = [];

// ツール情報のマッピング
const toolInfo: Record<string, { title: string; description: string; category: string }> = {
  '/text/counter': { title: '文字数カウンター', description: '文字数、単語数、行数を瞬時にカウント', category: 'テキスト' },
  '/text/base64': { title: 'Base64エンコード/デコード', description: 'テキストをBase64形式に変換', category: 'テキスト' },
  '/text/json': { title: 'JSON整形', description: 'JSONを見やすくフォーマット', category: 'テキスト' },
  '/text/regex': { title: '正規表現テスト', description: '正規表現をリアルタイムでテスト', category: 'テキスト' },
  '/text/hash': { title: 'ハッシュ生成', description: 'MD5, SHA1, SHA256などのハッシュを生成', category: 'テキスト' },
  '/text/url': { title: 'URLエンコード/デコード', description: 'URLのエンコードとデコード', category: 'テキスト' },
  '/text/uuid': { title: 'UUID生成', description: 'ランダムなUUIDを生成', category: 'テキスト' },
  '/text/case': { title: '大文字小文字変換', description: 'テキストの大文字小文字を変換', category: 'テキスト' },
  '/text/diff': { title: 'テキスト差分', description: '2つのテキストの差分を表示', category: 'テキスト' },
  '/text/random': { title: 'ランダム文字列生成', description: 'ランダムな文字列を生成', category: 'テキスト' },
  '/text/unix': { title: 'Unixタイムスタンプ変換', description: 'Unix時間と日時を相互変換', category: 'テキスト' },
  '/text/lorem': { title: 'Lorem Ipsum生成', description: 'ダミーテキストを生成', category: 'テキスト' },
  '/text/number': { title: '基数変換', description: '2進数、8進数、16進数などを変換', category: 'テキスト' },
  '/text/duplicate': { title: '重複行削除', description: 'テキストから重複行を削除', category: 'テキスト' },
  '/text/sort': { title: 'テキストソート', description: '行をアルファベット順に並べ替え', category: 'テキスト' },
  '/text/statistics': { title: 'テキスト統計', description: 'テキストの詳細な統計情報を表示', category: 'テキスト' },
  '/text/word-count': { title: '単語カウンター', description: '単語数をカウント', category: 'テキスト' },
  '/text/json-to-csv': { title: 'JSON to CSV変換', description: 'JSONをCSV形式に変換', category: 'テキスト' },
  '/text/html-to-markdown': { title: 'HTML to Markdown', description: 'HTMLをMarkdownに変換', category: 'テキスト' },
  '/text/acronym': { title: '頭字語生成', description: 'テキストから頭字語を生成', category: 'テキスト' },
  '/text/split': { title: 'テキスト分割', description: 'テキストを指定区切りで分割', category: 'テキスト' },
  '/text/join': { title: 'テキスト結合', description: '複数行を1行に結合', category: 'テキスト' },
  '/text/whitespace': { title: '空白削除', description: '余分な空白や改行を削除', category: 'テキスト' },
  '/text/markdown': { title: 'Markdownプレビュー', description: 'Markdownをリアルタイムでプレビュー', category: 'テキスト' },
  '/text/code-formatter': { title: 'コードフォーマッタ', description: 'JSON, HTML, CSS, JSを整形', category: 'テキスト' },
  '/text/lorem-ipsum-advanced': { title: 'ダミーテキスト生成', description: 'Lorem Ipsum形式のダミーテキスト', category: 'テキスト' },
  '/timer/countdown': { title: 'カウントダウンタイマー', description: '指定時間のカウントダウン', category: 'タイマー' },
  '/timer/stopwatch': { title: 'ストップウォッチ', description: '経過時間を計測', category: 'タイマー' },
  '/timer/pomodoro': { title: 'ポモドーロタイマー', description: '25分作業+5分休憩のタイマー', category: 'タイマー' },
  '/timer/current': { title: '現在時刻', description: '現在の日時を表示', category: 'タイマー' },
  '/timer/digital': { title: 'デジタル時計', description: 'デジタル形式で時刻表示', category: 'タイマー' },
  '/timer/stopwatch-tool': { title: 'ストップウォッチツール', description: '高機能ストップウォッチ', category: 'タイマー' },
  '/other/discount': { title: '割引計算', description: '割引後の価格を計算', category: 'その他' },
  '/other/date-calc': { title: '日付計算', description: '日付の加算減算を計算', category: 'その他' },
  '/other/image-compress': { title: '画像圧縮', description: '画像ファイルを圧縮', category: 'その他' },
  '/other/image-resize': { title: '画像リサイズ', description: '画像のサイズを変更', category: 'その他' },
  '/other/meta-tag': { title: 'メタタグ生成', description: 'SEO用メタタグを生成', category: 'その他' },
  '/other/card-check': { title: 'カード番号チェック', description: 'クレジットカード番号を検証', category: 'その他' },
  '/other/currency': { title: '通貨変換', description: '通貨をリアルタイムで変換', category: 'その他' },
  '/other/color-palette': { title: 'カラーパレット', description: 'カラーパレットを生成', category: 'その他' },
  '/other/compound-interest': { title: '複利計算', description: '複利での将来価値を計算', category: 'その他' },
  '/other/mortgage': { title: '住宅ローン計算', description: '月々の返済額を計算', category: 'その他' },
  '/other/image-convert': { title: '画像変換', description: '画像形式を変換', category: 'その他' },
  '/other/robots-txt': { title: 'robots.txt生成', description: 'SEO用robots.txtを生成', category: 'その他' },
  '/other/gpa': { title: 'GPA計算', description: 'GPAを計算', category: 'その他' },
  '/other/password-check': { title: 'パスワード強度チェック', description: 'パスワードの強度を判定', category: 'その他' },
  '/other/salary': { title: '給与変換', description: '年収・月収・時給を相互変換', category: 'その他' },
  '/other/image-crop': { title: '画像切り抜き', description: '画像をトリミング', category: 'その他' },
  '/other/goal-tracker': { title: '目標トラッカー', description: '目標の進捗を管理', category: 'その他' },
  '/other/habit-tracker': { title: '習慣トラッカー', description: '毎日の習慣を記録', category: 'その他' },
  '/other/ip-address': { title: 'IPアドレスツール', description: 'IPアドレスを解析', category: 'その他' },
  '/other/calorie': { title: 'カロリー計算', description: '1日の必要カロリーを計算', category: 'その他' },
  '/other/bmi': { title: 'BMI計算', description: 'BMIを計算', category: 'その他' },
  '/other/progress': { title: '進捗変換', description: '進捗率を計算', category: 'その他' },
  '/other/calculator': { title: '計算機', description: '基本的な計算を行う', category: 'その他' },
  '/other/tax': { title: '税金計算', description: '消費税を計算', category: 'その他' },
  '/other/age': { title: '年齢計算', description: '年齢を詳細に計算', category: 'その他' },
  '/other/random-num': { title: '乱数生成', description: 'ランダムな数値を生成', category: 'その他' },
  '/other/timezone': { title: 'タイムゾーン変換', description: '世界各地の時刻を変換', category: 'その他' },
  '/other/percentage': { title: 'パーセント計算', description: '割合や増減を計算', category: 'その他' },
  '/other/unit': { title: '単位変換', description: '長さ・重さなどの単位変換', category: 'その他' },
  '/other/cron': { title: 'Cron生成', description: 'Cron式を生成・解析', category: 'その他' },
  '/other/image-base64': { title: '画像→Base64', description: '画像をBase64に変換', category: 'その他' },
  '/other/qrcode': { title: 'QRコード生成', description: 'QRコードを作成', category: 'その他' },
  '/other/password': { title: 'パスワード生成', description: '安全なパスワードを生成', category: 'その他' },
  '/other/colorpicker': { title: 'カラーピッカー', description: '色を選択・変換', category: 'その他' },
  '/other/roulette': { title: 'ルーレット', description: 'ランダムに選択', category: 'その他' },
  '/other/image-glitch': { title: '画像グリッチ', description: '画像にグリッチ効果を追加', category: '画像' },
  '/other/image-rotate': { title: '画像回転', description: '画像を回転させる', category: '画像' },
  '/other/image-flip': { title: '画像反転', description: '画像を左右・上下に反転', category: '画像' },
  '/other/watermark': { title: '透かし追加', description: '画像にウォーターマークを追加', category: '画像' },
  '/other/image-merge': { title: '画像結合', description: '複数の画像を1枚に結合', category: '画像' },
  '/other/exif-remover': { title: 'EXIF削除', description: '画像のEXIF情報を削除', category: '画像' },
  '/other/color-converter': { title: '色変換', description: 'HEX, RGB, HSL, CMYK相互変換', category: 'その他' },
  '/other/image-crop-circle': { title: '画像トリミング', description: '円形・正方形にトリミング', category: '画像' },
  '/other/image-blur': { title: '画像ぼかし', description: '画像にぼかし効果を追加', category: '画像' },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { searchParams } = new URL(req.url || '', 'https://rakit-five.vercel.app');
  const tool = searchParams.get('tool') || '/';
  
  const info = toolInfo[tool] || { 
    title: 'Rakit', 
    description: '楽に使えるツール集',
    category: 'ユーティリティ'
  };

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '60px',
        }}
      >
        {/* カテゴリバッジ */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '8px 20px',
            marginBottom: '24px',
          }}
        >
          <span
            style={{
              fontSize: '20px',
              color: 'white',
              fontWeight: 600,
            }}
          >
            {info.category}
          </span>
        </div>
        
        {/* タイトル */}
        <div
          style={{
            display: 'flex',
            fontSize: '56px',
            fontWeight: 800,
            color: 'white',
            lineHeight: 1.2,
            marginBottom: '20px',
          }}
        >
          {info.title}
        </div>
        
        {/* 説明 */}
        <div
          style={{
            display: 'flex',
            fontSize: '28px',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: 1.4,
            marginBottom: '40px',
          }}
        >
          {info.description}
        </div>
        
        {/* サイト名 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '12px 24px',
            }}
          >
            <span
              style={{
                fontSize: '24px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Rakit
            </span>
            <span
              style={{
                fontSize: '24px',
                color: '#666',
                marginLeft: '8px',
              }}
            >
              楽に使えるツール集
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts,
    }
  );
}
