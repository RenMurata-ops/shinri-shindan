'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Stage1Results } from '@/lib/types/diagnosis';

interface DiagnosisResultProps {
  diagnosis: any;
}

export default function DiagnosisResult({ diagnosis }: DiagnosisResultProps) {
  const router = useRouter();
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const stage1: Stage1Results = diagnosis.stage1_results;

  const handleGetVIPAccess = async () => {
    setIsGeneratingCode(true);

    try {
      const response = await fetch('/api/serial-code/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ diagnosisId: diagnosis.id }),
      });

      const data = await response.json();

      if (data.success) {
        router.push(data.redirectUrl);
      } else {
        alert('シリアルコードの発行に失敗しました');
        setIsGeneratingCode(false);
      }
    } catch (error) {
      console.error('Serial code generation error:', error);
      alert('エラーが発生しました');
      setIsGeneratingCode(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="relative min-h-screen px-4 py-20">
        <div className="mx-auto max-w-4xl">
          {/* Archetype Display */}
          <div className="mb-16 text-center">
            <div className="mb-8">
              <div className="mx-auto mb-6 flex h-48 w-48 items-center justify-center rounded-full bg-gradient-cosmic text-8xl shadow-glow-purple">
                {stage1.archetypeIcon && <span>{stage1.archetypeIcon}</span>}
              </div>
            </div>

            <h1 className="text-display mb-4 text-gradient">
              あなたは「{stage1.archetype}」です
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-body-large text-text-secondary">
              {stage1.archetypeDescription}
            </p>

            {/* Destiny Code */}
            <div className="mb-6 inline-flex items-center gap-3 rounded-full px-6 py-3 card-glass">
              <span className="text-label text-text-secondary">運命コード</span>
              <span className="font-mono text-title">{stage1.destinyCode}</span>
            </div>

            {/* Destiny Color */}
            <div className="mt-6">
              <div className="flex justify-center gap-2">
                <div
                  className="h-16 w-16 rounded-full shadow-lg"
                  style={{
                    background: stage1.destinyColorHex,
                    boxShadow: `0 0 20px ${stage1.destinyColorHex}66`,
                  }}
                />
                <div
                  className="h-16 w-16 rounded-full opacity-60 shadow-lg"
                  style={{ background: stage1.destinyColorSub }}
                />
              </div>
              <p className="mt-2 text-caption text-text-secondary">{stage1.destinyColorName}</p>
            </div>
          </div>

          {/* Truth Star Section */}
          <div className="card-elevated mb-8 p-8">
            <h2 className="text-headline mb-4">あなたの真理の星</h2>
            <div className="mb-4 text-title text-primary">{stage1.truthStar}</div>
            <p className="text-body text-text-secondary">{stage1.truthStarDescription}</p>
          </div>

          {/* Elements Section */}
          <div className="card-elevated mb-8 p-8">
            <h2 className="text-headline mb-6">五大本質エレメント</h2>
            <div className="space-y-4">
              {Object.entries(stage1.elements).map(([key, value]) => {
                const names: Record<string, string> = {
                  exploration: '探究エレメント',
                  order: '秩序エレメント',
                  interaction: '交流エレメント',
                  harmony: '調和エレメント',
                  sensitivity: '感受エレメント',
                };
                return (
                  <div key={key}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-body font-medium">{names[key]}</span>
                      <span className="font-mono text-body font-semibold">{value}%</span>
                    </div>
                    <div className="progress-bar h-3">
                      <div
                        className="progress-fill"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Talent Domains */}
          <div className="card-elevated mb-8 p-8">
            <h2 className="text-headline mb-6">あなたの才能領域</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {stage1.talentDomains.map((domain, index) => (
                <div key={index} className="rounded-xl border border-bg-tertiary p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-title">{domain.name}</h3>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < domain.stars ? 'text-accent-gold' : 'text-bg-tertiary'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-body-small text-text-secondary">{domain.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Compatibility */}
          <div className="card-elevated mb-8 p-8">
            <h2 className="text-headline mb-6">相性の法則</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-title mb-3 text-green-600">共鳴型（最高の相性）</h3>
                <div className="flex flex-wrap gap-2">
                  {stage1.compatibility.resonance.map((type, index) => (
                    <span key={index} className="rounded-full bg-green-50 px-4 py-2 text-body-small text-green-700">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-title mb-3 text-blue-600">成長型（学び合える）</h3>
                <div className="flex flex-wrap gap-2">
                  {stage1.compatibility.growth.map((type, index) => (
                    <span key={index} className="rounded-full bg-blue-50 px-4 py-2 text-body-small text-blue-700">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-title mb-3 text-orange-600">刺激型（変化をもたらす）</h3>
                <div className="flex flex-wrap gap-2">
                  {stage1.compatibility.stimulus.map((type, index) => (
                    <span key={index} className="rounded-full bg-orange-50 px-4 py-2 text-body-small text-orange-700">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="card-elevated mb-12 p-8">
            <h2 className="text-headline mb-4">あなたへのメッセージ</h2>
            <p className="whitespace-pre-wrap text-body leading-relaxed text-text-primary">
              {stage1.message}
            </p>
          </div>

          {/* CTA for VIP Access */}
          <div className="card-glass border-2 border-primary/20 p-8 text-center">
            <h2 className="text-headline mb-4">さらに深い診断結果を見る</h2>
            <p className="mb-6 text-body text-text-secondary">
              深層心理、人生のテーマ、12の波動、3年間の運勢予測など
              <br />
              詳細な分析結果をご覧いただけます
            </p>
            <button
              className="btn-primary"
              onClick={handleGetVIPAccess}
              disabled={isGeneratingCode}
            >
              {isGeneratingCode ? '生成中...' : 'VIP診断を見る（無料）'}
            </button>
            <p className="mt-4 text-caption text-text-tertiary">
              LINE公式アカウント登録で閲覧できます
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
