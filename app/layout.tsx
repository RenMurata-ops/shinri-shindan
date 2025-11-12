import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: '真理診断 | 独自開発の真理探究占星による無料性格診断',
    template: '%s | 真理診断',
  },
  description:
    '四柱推命、ホロスコープ、西洋占星術、算命学、紫微斗数、九星気学、宿曜占星術、数秘術、六壬神課、バースデーカラー、動物占い、ジーニアスコード、姓名判断を統合した世界最高精度の性格分析システム。完全無料であなたの本質を見抜きます。',
  keywords: [
    '真理診断',
    '真理探究占星',
    '性格診断',
    '無料占い',
    '当たる占い',
    '四柱推命',
    'ホロスコープ',
    '西洋占星術',
    '算命学',
    '紫微斗数',
    '九星気学',
    '宿曜占星術',
    '数秘術',
    'ライフパスナンバー',
    '六壬神課',
    'バースデーカラー',
    '動物占い',
    'ジーニアスコード',
    '姓名判断',
    'MBTI',
    'エニアグラム',
    'ビッグファイブ',
  ],
  authors: [{ name: '真理診断' }],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    title: '真理診断 - あなたの本質を見抜く',
    description: '13種類の占術を統合した独自開発の診断システム。完全無料であなたの深層心理、才能、運勢を徹底分析。',
    siteName: '真理診断',
  },
  twitter: {
    card: 'summary_large_image',
    title: '真理診断 - あなたの本質を見抜く',
    description: '13種類の占術を統合した世界最高精度の無料診断',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
