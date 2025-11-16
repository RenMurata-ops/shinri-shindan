'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Sparkles, Heart, Users, TrendingUp, Share2, Download, Brain } from 'lucide-react';
import type { Stage1Results } from '@/types/diagnosis';

interface DiagnosisResultClientProps {
  diagnosis: {
    id: string;
    last_name: string;
    first_name: string;
    stage1_results: Stage1Results;
    created_at: string;
  };
}

export default function DiagnosisResultClient({ diagnosis }: DiagnosisResultClientProps) {
  const results = diagnosis.stage1_results;
  const fullName = `${diagnosis.last_name} ${diagnosis.first_name}`;

  const elementData = [
    { element: '探究', value: results.elements.exploration },
    { element: '秩序', value: results.elements.order },
    { element: '交流', value: results.elements.interaction },
    { element: '調和', value: results.elements.harmony },
    { element: '感受', value: results.elements.sensitivity },
  ];

  const [showSerialCodeModal, setShowSerialCodeModal] = useState(false);

  const handleGenerateSerialCode = async () => {
    try {
      const response = await fetch('/api/serial-code/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ diagnosis_id: diagnosis.id }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = `/serial/${data.code}`;
      } else {
        throw new Error(data.error || 'シリアルコード発行に失敗しました');
      }
    } catch (error) {
      console.error('Serial code generation error:', error);
      alert('シリアルコード発行に失敗しました。もう一度お試しください。');
    }
  };

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
              真理診断
            </Link>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition">
                <Download className="w-5 h-5" />
              </button>
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
            <span className="text-sm text-purple-200">第一段階診断結果</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            {fullName}さんは
          </h1>

          <div className="inline-block glass-strong rounded-3xl px-8 py-6 mb-6">
            <p className="text-4xl sm:text-5xl md:text-6xl font-display font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              {results.archetype}
            </p>
          </div>

          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {results.archetype_description}
          </p>
        </motion.section>

        {/* Destiny Code & Color */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-16"
        >
          <div className="glass-strong rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              運命コード
            </h3>
            <p className="text-3xl font-display font-bold mb-2">{results.destiny_code}</p>
            <p className="text-gray-400 text-sm">{results.destiny_code_description}</p>
          </div>

          <div className="glass-strong rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-400" />
              天命の色彩
            </h3>
            <div className="flex items-center gap-4 mb-2">
              <div
                className="w-12 h-12 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${results.destiny_color_hex}, ${results.destiny_color_sub})`,
                }}
              />
              <p className="text-xl font-semibold">{results.destiny_color_name}</p>
            </div>
            <div className="flex gap-2 text-xs text-gray-400">
              <span>{results.destiny_color_hex}</span>
              <span>/</span>
              <span>{results.destiny_color_sub}</span>
            </div>
          </div>
        </motion.section>

        {/* Truth Star */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-strong rounded-3xl p-8 mb-16"
        >
          <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            {results.truth_star}
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            {results.truth_star_description}
          </p>
        </motion.section>

        {/* Elements Radar Chart */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-strong rounded-3xl p-8 mb-16"
        >
          <h2 className="text-2xl font-display font-bold mb-6 text-center">
            五大本質エレメント
          </h2>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={elementData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="element" tick={{ fill: '#9ca3af' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af' }} />
                <Radar
                  name={fullName}
                  dataKey="value"
                  stroke="#a855f7"
                  fill="#a855f7"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        {/* Talent Domains */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            才能の領域
          </h2>
          <div className="grid gap-4">
            {results.talent_domains.map((domain, index) => (
              <div key={index} className="glass-strong rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{domain.name}</h3>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${i < domain.stars ? 'text-yellow-400' : 'text-gray-600'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-400">{domain.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Compatibility */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-strong rounded-3xl p-8 mb-16"
        >
          <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-green-400" />
            相性の法則
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-purple-400 mb-3">共鳴タイプ</h3>
              <div className="space-y-2">
                {results.compatibility.resonance.map((type, i) => (
                  <div key={i} className="glass px-4 py-2 rounded-lg">{type}</div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-400 mb-3">成長タイプ</h3>
              <div className="space-y-2">
                {results.compatibility.growth.map((type, i) => (
                  <div key={i} className="glass px-4 py-2 rounded-lg">{type}</div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-pink-400 mb-3">刺激タイプ</h3>
              <div className="space-y-2">
                {results.compatibility.stimulus.map((type, i) => (
                  <div key={i} className="glass px-4 py-2 rounded-lg">{type}</div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Similar Historical Figures */}
        {results.similar_historical_figures && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-strong rounded-3xl p-8 mb-16"
          >
            <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-yellow-400" />
              あなたと似た魂を持つ偉人たち
            </h2>
            <p className="text-gray-400 mb-6">
              歴史上の偉人の中で、あなたと似た診断結果を持つ方々です。彼らの生き方から学びのヒントが見つかるかもしれません。
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {results.similar_historical_figures.map((figure, index) => (
                <div key={index} className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2 text-yellow-300">{figure.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{figure.description}</p>
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-xs text-gray-500 mb-1">共通点</p>
                    <p className="text-sm text-gray-300">{figure.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* 3 Month Fortune */}
        {results.three_month_fortune && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-strong rounded-3xl p-8 mb-16"
          >
            <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-purple-400" />
              今後3ヶ月の運勢
            </h2>
            <div className="grid gap-6">
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-semibold">1ヶ月目</span>
                  <h3 className="text-xl font-bold">{results.three_month_fortune.month1.title}</h3>
                </div>
                <p className="text-gray-300 mb-3">{results.three_month_fortune.month1.description}</p>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-yellow-400 font-semibold whitespace-nowrap">幸運の行動：</span>
                  <span className="text-gray-400">{results.three_month_fortune.month1.lucky_action}</span>
                </div>
              </div>

              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold">2ヶ月目</span>
                  <h3 className="text-xl font-bold">{results.three_month_fortune.month2.title}</h3>
                </div>
                <p className="text-gray-300 mb-3">{results.three_month_fortune.month2.description}</p>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-yellow-400 font-semibold whitespace-nowrap">幸運の行動：</span>
                  <span className="text-gray-400">{results.three_month_fortune.month2.lucky_action}</span>
                </div>
              </div>

              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-sm font-semibold">3ヶ月目</span>
                  <h3 className="text-xl font-bold">{results.three_month_fortune.month3.title}</h3>
                </div>
                <p className="text-gray-300 mb-3">{results.three_month_fortune.month3.description}</p>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-yellow-400 font-semibold whitespace-nowrap">幸運の行動：</span>
                  <span className="text-gray-400">{results.three_month_fortune.month3.lucky_action}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/20">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2 text-purple-200">1年間の詳細な運勢を知りたい方へ</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    LINE公式アカウントに登録すると、12ヶ月分の詳細な運勢予測、月ごとのラッキーカラー、開運アクション、避けるべき行動など、さらに深い洞察をご覧いただけます。
                  </p>
                  <p className="text-purple-300 text-sm font-semibold">
                    ※下のシリアルコード発行ボタンからLINE登録へ進めます
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Core Philosophy */}
        {results.core_philosophy && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="glass-strong rounded-3xl p-8 mb-16"
          >
            <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
              <Brain className="w-6 h-6 text-blue-400" />
              核とする考え方
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-blue-300">{results.core_philosophy.title}</h3>
                <p className="text-gray-300 leading-relaxed">{results.core_philosophy.description}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-3">根本的な信念</h4>
                <div className="space-y-3">
                  {results.core_philosophy.key_beliefs.map((belief, index) => (
                    <div key={index} className="flex items-start gap-3 glass rounded-xl p-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="text-blue-400 font-bold text-sm">{index + 1}</span>
                      </div>
                      <p className="text-gray-300 pt-1">{belief}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Message */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="glass-strong rounded-3xl p-8 mb-16"
        >
          <h2 className="text-2xl font-display font-bold mb-6">あなたへのメッセージ</h2>
          <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
            {results.message}
          </p>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="text-center glass-strong rounded-3xl p-12"
        >
          <h2 className="text-3xl font-display font-bold mb-4">
            さらに深い真理を知りたい方へ
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            第二・第三段階の診断で、あなたの深層心理、無意識のパターン、<br className="hidden sm:block" />
            人生のテーマ、3年間の運勢予測、そして12ヶ月間の詳細な運勢などを解析します
          </p>
          <button
            onClick={handleGenerateSerialCode}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all text-white text-lg font-medium"
          >
            <Sparkles className="w-5 h-5" />
            シリアルコードを発行する（無料）
          </button>
          <p className="text-sm text-gray-400 mt-4">
            ※LINE公式アカウントへの登録が必要です
          </p>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>© 2025 真理診断. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
