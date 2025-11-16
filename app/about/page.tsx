import Link from 'next/link';
import { Sparkles, Heart, Brain, Stars, Users, TrendingUp, Shield } from 'lucide-react';
import { ARCHETYPES, TRUTH_STARS, TALENT_DOMAINS } from '@/types/diagnosis';

export const metadata = {
  title: '真理診断とは？ - 13の占術を統合した最高精度の診断',
  description: '古代から伝わる東洋・西洋の13の占術を統合し、AI技術で再構築した世界最高精度の性格診断システムです。',
};

const fortuneTypes = [
  { name: '西洋占星術', icon: <Stars className="w-6 h-6" />, description: '星座と惑星の配置から運命を読み解く' },
  { name: '数秘術', icon: <Brain className="w-6 h-6" />, description: '生年月日と名前の数字から本質を解明' },
  { name: '九星気学', icon: <Sparkles className="w-6 h-6" />, description: '東洋の叡智で方位と運勢を診断' },
  { name: '動物占い', icon: <Heart className="w-6 h-6" />, description: '12の動物タイプで性格を分類' },
  { name: '誕生日占い', icon: <Stars className="w-6 h-6" />, description: '366日それぞれの特性を分析' },
  { name: '姓名判断', icon: <Brain className="w-6 h-6" />, description: '名前の画数から運勢を読む' },
  { name: '四柱推命', icon: <Sparkles className="w-6 h-6" />, description: '生年月日時から人生の流れを予測' },
  { name: 'タロット', icon: <Stars className="w-6 h-6" />, description: '象徴的なカードで潜在意識を探る' },
  { name: 'MBTI', icon: <Users className="w-6 h-6" />, description: '16のタイプで性格を分析' },
  { name: 'エニアグラム', icon: <Heart className="w-6 h-6" />, description: '9つのタイプで深層心理を解明' },
  { name: 'ビッグファイブ', icon: <Brain className="w-6 h-6" />, description: '5つの特性で性格を数値化' },
  { name: 'カラー診断', icon: <Sparkles className="w-6 h-6" />, description: '色彩心理学で内面を分析' },
  { name: '干支占い', icon: <Stars className="w-6 h-6" />, description: '12支で性格と相性を読み解く' },
];

const faqs = [
  {
    question: '診断は本当に無料ですか？',
    answer: '第一段階の診断は完全無料です。より詳しい第二・第三段階の診断を見るには、LINE公式アカウントに登録してシリアルコードを発行する必要があります。'
  },
  {
    question: '診断にはどれくらい時間がかかりますか？',
    answer: '質問は全部で6問、約3分で完了します。診断結果は質問に答えた直後にご覧いただけます。'
  },
  {
    question: 'なぜ13の占術を統合しているのですか？',
    answer: '一つの占いでは見えない、あなたの多面的な本質を浮き彫りにするためです。数千年の叡智を統合することで、驚異的な的中率を実現しています。'
  },
  {
    question: '生まれた時間が分からなくても診断できますか？',
    answer: 'はい、できます。生まれた時間は必須ではありませんが、入力いただくとより精度の高い診断が可能になります。'
  },
  {
    question: '何度でも診断できますか？',
    answer: 'はい、何度でも診断可能です。ただし、診断結果は生年月日などの基本情報に基づくため、同じ情報であれば同じ結果になります。'
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-gray-950">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-gradient" />
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
            <Link href="/question" className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all text-white font-medium">
              診断を始める
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                真理診断とは？
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              古代から伝わる東洋・西洋の13の占術を統合し、<br className="hidden sm:block" />
              最新のAI技術で再構築した<br className="hidden sm:block" />
              世界最高精度の性格診断システムです
            </p>
          </div>
        </div>
      </section>

      {/* Explanation Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 glass-strong rounded-3xl p-8 aspect-square flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="w-32 h-32 mx-auto mb-6 text-purple-400 animate-pulse-glow" />
                <p className="text-2xl font-display font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  真理探究占星
                </p>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                真理探究占星
              </h2>
              <p className="text-lg text-gray-300 mb-4">
                真理探究占星は、13種類の伝統的占術を
                独自のアルゴリズムで統合した診断システムです。
              </p>
              <p className="text-lg text-gray-300 mb-4">
                一つの占いでは見えない、
                あなたの多面的な本質を浮き彫りにします。
              </p>
              <p className="text-lg text-gray-300">
                数千年の叡智と最新技術の融合により、
                驚異的な的中率を実現しています。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fortune Types Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-16">
            統合された13の占術
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {fortuneTypes.map((fortune, index) => (
              <div key={index} className="glass p-6 rounded-2xl hover:glass-strong transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-purple-400">
                    {fortune.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{fortune.name}</h3>
                </div>
                <p className="text-sm text-gray-400">{fortune.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              ※これらの占術を独自の用語体系に変換し、「真理探究占星」として提供しています
            </p>
          </div>
        </div>
      </section>

      {/* Terminology Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-6">
            独自の用語体系
          </h2>
          <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-16">
            従来の占い用語ではなく、<br className="sm:hidden" />
            誰にでも分かりやすい独自の表現を採用しています
          </p>

          <div className="space-y-12">
            {/* Archetypes */}
            <div className="glass-strong rounded-3xl p-8">
              <h3 className="text-2xl font-display font-bold mb-4">12のアーキタイプ</h3>
              <p className="text-gray-300 mb-6">
                あなたの基本的な性格タイプを12種類に分類。
                創造者、探求者、戦士など、イメージしやすい名前で表現します。
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {ARCHETYPES.map((archetype) => (
                  <div key={archetype.name} className="glass px-4 py-2 rounded-full text-center">
                    <span className="text-sm">{archetype.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Truth Stars */}
            <div className="glass-strong rounded-3xl p-8">
              <h3 className="text-2xl font-display font-bold mb-4">9つの真理の星座</h3>
              <p className="text-gray-300 mb-6">
                あなたの核となる動機を9つの星で表現。
                完璧の星、愛情の星、知恵の星など。
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {TRUTH_STARS.map((star) => (
                  <div key={star.name} className="glass p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Stars className="w-5 h-5 text-yellow-400" />
                      <p className="font-semibold">{star.name}</p>
                    </div>
                    <p className="text-sm text-gray-400">{star.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Elements */}
            <div className="glass-strong rounded-3xl p-8">
              <h3 className="text-2xl font-display font-bold mb-4">五大本質エレメント</h3>
              <p className="text-gray-300 mb-6">
                探究、秩序、交流、調和、感受の5つの要素であなたのバランスを可視化。
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                {['探究', '秩序', '交流', '調和', '感受'].map((element) => (
                  <div key={element} className="glass px-6 py-3 rounded-xl text-center">
                    <p className="font-semibold">{element}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-16">
            よくある質問
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="glass-strong rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-start gap-2">
                  <span className="text-purple-400">Q.</span>
                  {faq.question}
                </h3>
                <p className="text-gray-300 pl-6">
                  <span className="text-pink-400 mr-2">A.</span>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-strong rounded-3xl p-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
              あなたの真理を知る旅へ
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              わずか3分で、あなたの本質が明らかになります
            </p>
            <Link href="/question" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all text-white text-lg font-medium">
              <Brain className="w-5 h-5" />
              無料で診断を始める
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-display font-bold text-lg mb-4">真理診断</h3>
              <p className="text-sm text-gray-400">
                13の占術を統合した<br />
                世界最高精度の性格診断
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">メニュー</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">トップ</Link></li>
                <li><Link href="/about" className="hover:text-white transition">真理診断とは？</Link></li>
                <li><Link href="/question" className="hover:text-white transition">診断を始める</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">サポート</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">プライバシーポリシー</a></li>
                <li><a href="#" className="hover:text-white transition">利用規約</a></li>
                <li><a href="#" className="hover:text-white transition">お問い合わせ</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500 pt-8 border-t border-white/10">
            <p>© 2025 真理診断. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
