'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

interface FormData {
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  birthTime?: string;
  gender: string;
  coreValue: string;
}

const coreValues = [
  { value: 'freedom', label: '自由', description: '束縛されず、自分らしく生きること', icon: '🕊️' },
  { value: 'stability', label: '安定', description: '確実性と安心感のある人生', icon: '🏠' },
  { value: 'growth', label: '成長', description: '常に学び、進化し続けること', icon: '🌱' },
  { value: 'harmony', label: '調和', description: '周囲との良好な関係性', icon: '☮️' },
  { value: 'achievement', label: '達成', description: '目標を実現し、成功すること', icon: '🏆' },
  { value: 'creativity', label: '創造', description: '新しいものを生み出すこと', icon: '🎨' },
];

export default function QuestionPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    lastName: '',
    firstName: '',
    lastNameKana: '',
    firstNameKana: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    birthTime: '',
    gender: '',
    coreValue: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0:
        if (!formData.lastName || !formData.firstName) {
          newErrors.name = '姓と名の両方を入力してください';
        } else if (!/^[一-龥々ヶ]+$/.test(formData.lastName) || !/^[一-龥々ヶ]+$/.test(formData.firstName)) {
          newErrors.name = '漢字で入力してください';
        }
        break;
      case 1:
        if (!formData.lastNameKana || !formData.firstNameKana) {
          newErrors.kana = '姓と名の両方を入力してください';
        } else if (!/^[ぁ-ん]+$/.test(formData.lastNameKana) || !/^[ぁ-ん]+$/.test(formData.firstNameKana)) {
          newErrors.kana = 'ひらがなで入力してください';
        }
        break;
      case 2:
        if (!formData.birthYear || !formData.birthMonth || !formData.birthDay) {
          newErrors.birthDate = '生年月日を入力してください';
        }
        break;
      case 3:
        // 生まれた時間は任意
        break;
      case 4:
        if (!formData.gender) {
          newErrors.gender = '性別を選択してください';
        }
        break;
      case 5:
        if (!formData.coreValue) {
          newErrors.coreValue = '価値観を選択してください';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const birthDate = `${formData.birthYear}-${formData.birthMonth.padStart(2, '0')}-${formData.birthDay.padStart(2, '0')}`;

      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          last_name: formData.lastName,
          first_name: formData.firstName,
          last_name_kana: formData.lastNameKana,
          first_name_kana: formData.firstNameKana,
          birth_date: birthDate,
          birth_time: formData.birthTime || null,
          gender: formData.gender,
          core_value: formData.coreValue,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/diagnosis/${data.diagnosis_id}`);
      } else {
        throw new Error(data.error || '診断の生成に失敗しました');
      }
    } catch (error) {
      console.error('診断エラー:', error);
      alert('診断の生成に失敗しました。もう一度お試しください。');
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / 6) * 100;

  const stepperVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 glass">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">質問 {currentStep + 1}/6</span>
            <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={1}>
            <motion.div
              key={currentStep}
              custom={1}
              variants={stepperVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="glass-strong rounded-3xl p-8 sm:p-12"
            >
              {/* Step 1: Name */}
              {currentStep === 0 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">
                    お名前を教えてください
                  </h2>
                  <p className="text-gray-400 mb-8">漢字でご入力ください</p>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-2">姓</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => updateField('lastName', e.target.value)}
                          placeholder="山田"
                          maxLength={20}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none transition"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-2">名</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => updateField('firstName', e.target.value)}
                          placeholder="太郎"
                          maxLength={20}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none transition"
                        />
                      </div>
                    </div>
                    {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                  </div>
                </div>
              )}

              {/* Step 2: Kana */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">
                    読み仮名を教えてください
                  </h2>
                  <p className="text-gray-400 mb-8">ひらがなでご入力ください</p>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-2">せい</label>
                        <input
                          type="text"
                          value={formData.lastNameKana}
                          onChange={(e) => updateField('lastNameKana', e.target.value)}
                          placeholder="やまだ"
                          maxLength={50}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none transition"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-2">めい</label>
                        <input
                          type="text"
                          value={formData.firstNameKana}
                          onChange={(e) => updateField('firstNameKana', e.target.value)}
                          placeholder="たろう"
                          maxLength={50}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none transition"
                        />
                      </div>
                    </div>
                    {errors.kana && <p className="text-red-400 text-sm">{errors.kana}</p>}
                  </div>
                </div>
              )}

              {/* Step 3: Birth Date */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold mb-8">
                    生年月日を教えてください
                  </h2>

                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">年</label>
                        <select
                          value={formData.birthYear}
                          onChange={(e) => updateField('birthYear', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none transition"
                        >
                          <option value="">選択</option>
                          {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                            <option key={year} value={year}>{year}年</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">月</label>
                        <select
                          value={formData.birthMonth}
                          onChange={(e) => updateField('birthMonth', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none transition"
                        >
                          <option value="">選択</option>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                            <option key={month} value={month}>{month}月</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">日</label>
                        <select
                          value={formData.birthDay}
                          onChange={(e) => updateField('birthDay', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none transition"
                        >
                          <option value="">選択</option>
                          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                            <option key={day} value={day}>{day}日</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {errors.birthDate && <p className="text-red-400 text-sm">{errors.birthDate}</p>}
                  </div>
                </div>
              )}

              {/* Step 4: Birth Time */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">
                    生まれた時間を教えてください
                  </h2>
                  <p className="text-gray-400 mb-8">分からない場合はスキップできます</p>

                  <div className="space-y-4">
                    <input
                      type="time"
                      value={formData.birthTime}
                      onChange={(e) => updateField('birthTime', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none transition"
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Gender */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold mb-8">
                    性別を教えてください
                  </h2>

                  <div className="space-y-3">
                    {[
                      { value: 'male', label: '男性', icon: '♂' },
                      { value: 'female', label: '女性', icon: '♀' },
                      { value: 'other', label: 'その他', icon: '⚧' },
                      { value: 'no_answer', label: '答えたくない', icon: '－' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => updateField('gender', option.value)}
                        className={`w-full px-6 py-4 rounded-xl border-2 transition-all ${
                          formData.gender === option.value
                            ? 'border-purple-500 bg-purple-500/20'
                            : 'border-gray-700 bg-gray-900/30 hover:border-gray-600'
                        }`}
                      >
                        <span className="text-2xl mr-3">{option.icon}</span>
                        <span className="text-lg">{option.label}</span>
                      </button>
                    ))}
                    {errors.gender && <p className="text-red-400 text-sm mt-2">{errors.gender}</p>}
                  </div>
                </div>
              )}

              {/* Step 6: Core Value */}
              {currentStep === 5 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">
                    最も大切にしている価値観は？
                  </h2>
                  <p className="text-gray-400 mb-8">直感で選んでください</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {coreValues.map((value) => (
                      <button
                        key={value.value}
                        onClick={() => updateField('coreValue', value.value)}
                        className={`p-6 rounded-xl border-2 text-left transition-all ${
                          formData.coreValue === value.value
                            ? 'border-purple-500 bg-purple-500/20'
                            : 'border-gray-700 bg-gray-900/30 hover:border-gray-600'
                        }`}
                      >
                        <div className="text-4xl mb-2">{value.icon}</div>
                        <div className="text-lg font-semibold mb-1">{value.label}</div>
                        <div className="text-sm text-gray-400">{value.description}</div>
                      </button>
                    ))}
                  </div>
                  {errors.coreValue && <p className="text-red-400 text-sm mt-4">{errors.coreValue}</p>}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {currentStep > 0 ? (
              <button
                onClick={handleBack}
                className="px-6 py-3 rounded-full glass hover:glass-strong transition-all flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                戻る
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  診断中...
                </>
              ) : (
                <>
                  {currentStep === 5 ? '診断する' : '次へ'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
