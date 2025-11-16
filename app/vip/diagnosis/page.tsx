'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Key, Sparkles, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function VIPLoginPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsVerifying(true);

    try {
      const response = await fetch('/api/serial-code/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/vip/diagnosis/${code.trim()}`);
      } else {
        setError(data.error || 'シリアルコードの検証に失敗しました');
      }
    } catch (err) {
      setError('エラーが発生しました。もう一度お試しください。');
    } finally {
      setIsVerifying(false);
    }
  };

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="glass-strong rounded-3xl p-8 sm:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-200">VIPログイン</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                深い診断結果を<br className="sm:hidden" />閲覧する
              </h1>

              <p className="text-gray-300">
                シリアルコードを入力してください
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  シリアルコード
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="SHINRI-XXXX-XXXX-XXXX"
                    maxLength={23}
                    className="w-full pl-11 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none transition font-mono"
                    required
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  ※LINE公式アカウントから発行されたコード
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-900/20 border border-red-500/50 rounded-xl"
                >
                  <p className="text-sm text-red-400">{error}</p>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isVerifying || !code.trim()}
                className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all text-white text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    確認中...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    診断結果を見る
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                シリアルコードをお持ちでない方は
              </p>
              <Link
                href="/question"
                className="inline-flex items-center gap-2 mt-2 text-purple-400 hover:text-purple-300 transition"
              >
                まずは無料診断から始める
              </Link>
            </div>
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
