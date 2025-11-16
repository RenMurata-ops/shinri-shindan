import Link from 'next/link';
import { Sparkles, Heart, Brain, Stars, Users, TrendingUp, Shield } from 'lucide-react';
import { ARCHETYPES, TRUTH_STARS, TALENT_DOMAINS } from '@/types/diagnosis';

export const metadata = {
  title: '真理診断とは？ - 宇宙の叡智で魂の本質を読み解く',
  description: '真理探究占星は、あなたが生まれた瞬間の宇宙のエネルギーを読み解き、魂の本質、人生の使命、未来の可能性を明らかにします。',
};

const spiritualPrinciples = [
  {
    title: '宇宙のエネルギー',
    icon: <Stars className="w-6 h-6" />,
    description: 'あなたが生まれた瞬間の宇宙の配置が、魂に刻まれた使命を示します'
  },
  {
    title: '数の神秘',
    icon: <Brain className="w-6 h-6" />,
    description: '名前と生年月日に秘められた数字の波動が、あなたの本質を物語ります'
  },
  {
    title: '魂の色彩',
    icon: <Sparkles className="w-6 h-6" />,
    description: 'あなた固有の色のエネルギーが、人生の方向性を照らし出します'
  },
  {
    title: '時の流れ',
    icon: <TrendingUp className="w-6 h-6" />,
    description: '誕生の瞬間に流れていた時間の質が、人生のリズムを決定します'
  },
];

const faqs = [
  {
    question: '診断は本当に無料ですか？',
    answer: '第一段階の真理の啓示は完全無料です。さらに深い魂の洞察をご希望の方は、LINE公式アカウントに登録してシリアルコードを発行いただくことで、第二・第三段階の深遠な真理をご覧いただけます。'
  },
  {
    question: '診断にはどれくらい時間がかかりますか？',
    answer: '宇宙との対話は約3分で完了します。6つの質問に答えることで、あなたの魂の本質が即座に明らかになります。'
  },
  {
    question: 'なぜこんなに正確に当たるのですか？',
    answer: '真理探究占星は、あなたが生まれた瞬間の宇宙のエネルギー配置を読み解きます。宇宙の法則は不変であり、そこに嘘はありません。あなたの魂に刻まれた真実をありのままにお伝えするため、驚くほどの的中率を実現しています。'
  },
  {
    question: '生まれた時間が分からなくても診断できますか？',
    answer: 'はい、できます。生まれた時間は、より精緻な宇宙の配置を読み解くために役立ちますが、必須ではありません。生年月日とお名前だけでも、十分に深い真理を明らかにすることができます。'
  },
  {
    question: '何度でも診断できますか？',
    answer: 'はい、何度でもお試しいただけます。ただし、あなたの魂の本質は変わりませんので、同じ情報で診断すれば同じ真理が示されます。それは、宇宙があなたに伝え続けているメッセージなのです。'
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
              宇宙の叡智と魂の波動を読み解き、<br className="hidden sm:block" />
              あなたの本質、使命、そして未来への道筋を<br className="hidden sm:block" />
              スピリチュアルな視点から明らかにします
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
                真理探究占星とは
              </h2>
              <p className="text-lg text-gray-300 mb-4">
                真理探究占星は、あなたが生まれた瞬間に宇宙から降り注いだ
                エネルギーの配置を読み解く、古代からの神秘的な叡智です。
              </p>
              <p className="text-lg text-gray-300 mb-4">
                生年月日、名前、そして生まれた時刻に秘められた
                宇宙の暗号を解読することで、
                あなたの魂が持つ本来の輝きを明らかにします。
              </p>
              <p className="text-lg text-gray-300">
                それは単なる性格診断ではなく、
                魂の設計図を読み解く神聖な儀式なのです。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spiritual Principles Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-6">
            真理を読み解く4つの柱
          </h2>
          <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-16">
            真理探究占星は、宇宙の普遍的な法則に基づいて<br className="hidden sm:block" />
            あなたの魂の本質を多角的に照らし出します
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {spiritualPrinciples.map((principle, index) => (
              <div key={index} className="glass-strong p-8 rounded-3xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full glass text-purple-400">
                    {principle.icon}
                  </div>
                  <h3 className="text-2xl font-display font-bold">{principle.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terminology Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-6">
            魂の言語で伝える真理
          </h2>
          <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-16">
            難解な専門用語ではなく、<br className="sm:hidden" />
            あなたの魂に直接響く言葉で真理をお伝えします
          </p>

          <div className="space-y-12">
            {/* Archetypes */}
            <div className="glass-strong rounded-3xl p-8">
              <h3 className="text-2xl font-display font-bold mb-4">12の魂の原型</h3>
              <p className="text-gray-300 mb-6">
                宇宙には12の魂のパターンが存在します。
                あなたがどの原型の魂を持って生まれたかを明らかにし、
                その神聖な役割をお伝えします。
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
                あなたの魂を導く星の光を読み解きます。
                9つの星座は、それぞれが異なる真理を象徴し、
                あなたの人生に深い意味をもたらします。
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
                宇宙を構成する5つの根源的エネルギー。
                あなたの魂がどの波動と共鳴しているかを視覚化し、
                エネルギーバランスの神秘を明らかにします。
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
