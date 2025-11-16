'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Sparkles, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface SerialCodeClientProps {
  serialCode: {
    code: string;
    created_at: string;
    is_used: boolean;
  };
}

export default function SerialCodeClient({ serialCode }: SerialCodeClientProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(serialCode.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineOfficialUrl = process.env.NEXT_PUBLIC_LINE_OFFICIAL_URL || 'https://line.me/ti/p/';

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 glass">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <Link href="/" className="text-xl font-display font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            真理診断
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl"
        >
          <div className="glass-strong rounded-3xl p-8 sm:p-12 text-center">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-200">シリアルコード発行完了</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-6">
              シリアルコードを<br className="sm:hidden" />発行しました
            </h1>

            <p className="text-lg text-gray-300 mb-8">
              以下のシリアルコードをLINE公式アカウントで<br className="hidden sm:block" />
              送信すると、深い診断結果が閲覧できます
            </p>

            {/* Serial Code Display */}
            <div className="mb-8">
              <div className="glass-strong rounded-2xl p-6 mb-4">
                <p className="text-sm text-gray-400 mb-2">あなたのシリアルコード</p>
                <div className="flex items-center justify-center gap-4">
                  <p className="text-2xl sm:text-3xl font-mono font-bold tracking-wider">
                    {serialCode.code}
                  </p>
                  <button
                    onClick={handleCopy}
                    className="p-2 hover:bg-gray-700 rounded-lg transition"
                    title="コピー"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {copied && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-green-400"
                >
                  コピーしました！
                </motion.p>
              )}
            </div>

            {/* Instructions */}
            <div className="glass rounded-2xl p-6 mb-8 text-left">
              <h2 className="text-lg font-semibold mb-4">使い方</h2>
              <ol className="space-y-3 text-gray-300">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-sm font-semibold">1</span>
                  <span>下のボタンからLINE公式アカウントを友だち追加</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-sm font-semibold">2</span>
                  <span>トーク画面で上記のシリアルコードを送信</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-sm font-semibold">3</span>
                  <span>送られてくるURLから深い診断結果を閲覧</span>
                </li>
              </ol>
            </div>

            {/* CTA Button */}
            <a
              href={lineOfficialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#06C755] hover:bg-[#05B84D] transition-all text-white text-lg font-medium"
            >
              <ExternalLink className="w-5 h-5" />
              LINE公式アカウントを追加
            </a>

            <p className="text-sm text-gray-400 mt-6">
              ※このシリアルコードは一度のみ使用可能です
            </p>
          </div>

          {/* Alternative Access */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400 mb-4">
              既にシリアルコードをお持ちの方
            </p>
            <Link
              href="/vip/diagnosis"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:glass-strong transition-all"
            >
              <Sparkles className="w-4 h-4" />
              VIPログインはこちら
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>© 2025 真理診断. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
