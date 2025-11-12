'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  birthDate: string;
  birthTime: string;
  birthPrefecture: string;
  gender: string;
  coreValue: string;
}

const QUESTIONS = [
  {
    id: 1,
    question: 'お名前を教えてください',
    subtext: '漢字でご入力ください',
    fields: [
      { name: 'lastName', placeholder: '姓', type: 'text', required: true },
      { name: 'firstName', placeholder: '名', type: 'text', required: true },
    ],
  },
  {
    id: 2,
    question: '読み仮名を教えてください',
    subtext: 'ひらがなでご入力ください',
    fields: [
      { name: 'lastNameKana', placeholder: 'せい', type: 'text', required: false },
      { name: 'firstNameKana', placeholder: 'めい', type: 'text', required: false },
    ],
  },
  {
    id: 3,
    question: '生年月日を教えてください',
    fields: [
      { name: 'birthDate', placeholder: '', type: 'date', required: true },
    ],
  },
  {
    id: 4,
    question: '生まれた時間を教えてください',
    subtext: '分からない場合は空欄で構いません',
    fields: [
      { name: 'birthTime', placeholder: '00:00', type: 'time', required: false },
    ],
  },
  {
    id: 5,
    question: '性別を教えてください',
    type: 'radio',
    options: ['男性', '女性', 'その他', '答えたくない'],
    field: 'gender',
  },
  {
    id: 6,
    question: 'あなたが最も大切にしている価値観は？',
    subtext: '直感で選んでください',
    type: 'select',
    options: ['自由', '安定', '成長', '調和', '達成', '創造'],
    field: 'coreValue',
  },
];

export default function DiagnosisForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    lastName: '',
    firstName: '',
    lastNameKana: '',
    firstNameKana: '',
    birthDate: '',
    birthTime: '',
    birthPrefecture: '',
    gender: '',
    coreValue: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateCurrentStep = (): boolean => {
    const question = QUESTIONS[currentStep];

    if (question.fields) {
      for (const field of question.fields) {
        if (field.required && !formData[field.name as keyof FormData]) {
          setError(`${field.placeholder}を入力してください`);
          return false;
        }
      }
    } else if (question.field) {
      if (!formData[question.field as keyof FormData]) {
        setError('選択してください');
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setError('');
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error?.message || '診断に失敗しました');
      }

      // 診断結果ページにリダイレクト
      router.push(data.redirectUrl);
    } catch (err) {
      console.error('Diagnosis error:', err);
      setError(err instanceof Error ? err.message : '予期しないエラーが発生しました');
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <div className="card-glass mx-auto w-full max-w-2xl p-12 text-center">
        <div className="mb-6">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <h2 className="text-title mb-2">真理探究占星で星を読み解いています…</h2>
          <p className="text-body-small text-text-secondary">
            あなたの運命の星々を分析中...
          </p>
        </div>
        <div className="progress-bar">
          <div className="progress-fill w-3/4" />
        </div>
      </div>
    );
  }

  return (
    <div className="card-glass mx-auto w-full max-w-2xl p-8 md:p-12">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-label">質問 {currentStep + 1}/{QUESTIONS.length}</span>
          <span className="text-caption">{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-headline mb-2">{currentQuestion.question}</h2>
        {currentQuestion.subtext && (
          <p className="text-body-small text-text-secondary">{currentQuestion.subtext}</p>
        )}
      </div>

      {/* Input Fields */}
      <div className="mb-8 space-y-4">
        {currentQuestion.fields && (
          <div className="grid gap-4 md:grid-cols-2">
            {currentQuestion.fields.map((field) => (
              <input
                key={field.name}
                type={field.type}
                placeholder={field.placeholder}
                className="input-field"
                value={formData[field.name as keyof FormData]}
                onChange={(e) => handleInputChange(field.name as keyof FormData, e.target.value)}
              />
            ))}
          </div>
        )}

        {currentQuestion.type === 'radio' && currentQuestion.options && (
          <div className="grid gap-3 md:grid-cols-2">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                type="button"
                className={`rounded-xl border-2 px-6 py-4 text-left transition-all ${
                  formData[currentQuestion.field as keyof FormData] === option
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-bg-tertiary hover:border-primary/30'
                }`}
                onClick={() => handleInputChange(currentQuestion.field as keyof FormData, option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {currentQuestion.type === 'select' && currentQuestion.options && (
          <select
            className="input-field"
            value={formData[currentQuestion.field as keyof FormData]}
            onChange={(e) => handleInputChange(currentQuestion.field as keyof FormData, e.target.value)}
          >
            <option value="">選択してください</option>
            {currentQuestion.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-body-small text-red-600">
          {error}
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-4">
        {currentStep > 0 && (
          <button
            type="button"
            className="btn-secondary flex-1"
            onClick={handleBack}
          >
            戻る
          </button>
        )}
        <button
          type="button"
          className="btn-primary flex-1"
          onClick={handleNext}
        >
          {currentStep === QUESTIONS.length - 1 ? '診断する' : '次へ'}
        </button>
      </div>
    </div>
  );
}
