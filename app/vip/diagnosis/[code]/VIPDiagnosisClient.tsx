'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, TrendingUp, Brain, Heart, Calendar } from 'lucide-react';
import type { Stage1Results, Stage2And3Results } from '@/types/diagnosis';

interface VIPDiagnosisClientProps {
  diagnosis: {
    id: string;
    last_name: string;
    first_name: string;
    stage1_results: Stage1Results;
    stage2_and_3_results: Stage2And3Results | null;
  };
  serialCode: {
    code: string;
  };
}

export default function VIPDiagnosisClient({ diagnosis, serialCode }: VIPDiagnosisClientProps) {
  const fullName = `${diagnosis.last_name} ${diagnosis.first_name}`;
  const stage1 = diagnosis.stage1_results;
  const stage2And3 = diagnosis.stage2_and_3_results;

  if (!stage2And3) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center">
          <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-400 animate-pulse" />
          <h2 className="text-2xl font-bold mb-2">深い診断を生成中...</h2>
          <p className="text-gray-400">しばらくお待ちください</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-display font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              真理診断 VIP
            </Link>
            <div className="text-sm text-gray-400">
              CODE: {serialCode.code}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-200">第二・第三段階診断結果</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            {fullName}さんの<br className="sm:hidden" />深層心理分析
          </h1>
        </motion.section>

        {/* Deep Psychology */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-strong rounded-3xl p-8 mb-12"
        >
          <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-400" />
            深層心理
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
            {stage2And3.deep_psychology}
          </p>
        </motion.section>

        {/* Unconscious Pattern */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-strong rounded-3xl p-8 mb-12"
        >
          <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-400" />
            無意識のパターン
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-purple-400">パターン</h3>
              <p className="text-gray-300">{stage2And3.unconscious_pattern.pattern}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-400">詳細</h3>
              <p className="text-gray-300">{stage2And3.unconscious_pattern.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-400">解決策</h3>
              <p className="text-gray-300">{stage2And3.unconscious_pattern.solution}</p>
            </div>
          </div>
        </motion.section>

        {/* Life Theme */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-strong rounded-3xl p-8 mb-12"
        >
          <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            人生のテーマ
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">{stage2And3.life_theme.title}</h3>
              <p className="text-gray-300 mb-4">{stage2And3.life_theme.description}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-2">現れ方</h4>
              <div className="flex flex-wrap gap-2">
                {stage2And3.life_theme.manifestations.map((manifestation, i) => (
                  <span key={i} className="glass px-4 py-2 rounded-full text-sm">
                    {manifestation}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* 12 Waves */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            12の波動（人生の領域）
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {stage2And3.twelve_waves.map((wave, i) => (
              <div key={i} className="glass-strong rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{wave.name}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      wave.status === 'good'
                        ? 'bg-green-500/20 text-green-400'
                        : wave.status === 'caution'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {wave.status === 'good' ? '良好' : wave.status === 'caution' ? '注意' : '普通'}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{wave.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 3-Year Forecast */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-strong rounded-3xl p-8 mb-12"
        >
          <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-purple-400" />
            3年間の運勢予測
          </h2>
          <div className="space-y-6">
            {Object.entries(stage2And3.three_year_forecast).map(([year, forecast]) => (
              <div key={year} className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-bold text-purple-400">{year}年</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      forecast.trend === 'rising'
                        ? 'bg-green-500/20 text-green-400'
                        : forecast.trend === 'peak'
                        ? 'bg-purple-500/20 text-purple-400'
                        : forecast.trend === 'adjustment'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {forecast.trend === 'rising'
                      ? '上昇期'
                      : forecast.trend === 'peak'
                      ? '絶頂期'
                      : forecast.trend === 'adjustment'
                      ? '調整期'
                      : '試練期'}
                  </span>
                </div>
                <p className="text-gray-300">{forecast.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Action Guide */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-strong rounded-3xl p-8 mb-12"
        >
          <h2 className="text-2xl font-display font-bold mb-6">
            あなたへの実践ガイド
          </h2>
          <div className="space-y-4">
            {stage2And3.action_guide.map((action, i) => (
              <div key={i} className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-sm font-semibold">
                    {i + 1}
                  </span>
                  {action.title}
                </h3>
                <p className="text-gray-300 pl-8">{action.description}</p>
              </div>
            ))}
          </div>
        </motion.section>
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
