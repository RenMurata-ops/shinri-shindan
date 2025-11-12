import DiagnosisForm from '@/components/diagnosis/DiagnosisForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20">
        {/* Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/5 via-primary/10 to-bg-primary" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl text-center">
          {/* Title */}
          <div className="mb-12 animate-fade-in">
            <h1 className="mb-6 text-display text-gradient">
              真理診断
            </h1>
            <p className="mx-auto max-w-2xl text-body-large text-text-secondary">
              独自開発の真理探究占星による
              <br />
              あなたの本質を見抜く
            </p>
          </div>

          {/* Form */}
          <div className="animate-scale-up">
            <DiagnosisForm />
          </div>

          {/* Info */}
          <div className="mt-8 text-caption text-text-tertiary">
            完全無料 • 所要時間 約3分
          </div>
        </div>
      </section>
    </main>
  );
}
