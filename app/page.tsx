import Link from 'next/link';
import { Sparkles, Heart, Brain, Stars, Moon, Sun } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />

        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Sparkles className="absolute top-20 left-10 text-purple-400/30 w-8 h-8 animate-pulse-glow" style={{ animationDelay: '0s' }} />
          <Heart className="absolute top-40 right-20 text-pink-400/30 w-10 h-10 animate-pulse-glow" style={{ animationDelay: '1s' }} />
          <Brain className="absolute bottom-40 left-20 text-blue-400/30 w-12 h-12 animate-pulse-glow" style={{ animationDelay: '2s' }} />
          <Stars className="absolute top-1/3 right-10 text-purple-400/30 w-6 h-6 animate-pulse-glow" style={{ animationDelay: '3s' }} />
          <Moon className="absolute bottom-20 right-40 text-indigo-400/30 w-8 h-8 animate-pulse-glow" style={{ animationDelay: '4s' }} />
          <Sun className="absolute top-60 left-1/3 text-yellow-400/20 w-10 h-10 animate-pulse-glow" style={{ animationDelay: '5s' }} />
        </div>

        {/* Main Content */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-200">あなたの心を知る旅へ</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight">
              心理診断
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            深層心理を探り、真の自分と向き合う<br className="hidden sm:block" />
            スピリチュアルな心理診断の世界へようこそ
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href="/diagnosis"
              className="group relative px-8 py-4 rounded-full glass-strong hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2 text-lg font-medium">
                <Brain className="w-5 h-5" />
                診断を始める
              </span>
            </Link>

            <Link
              href="/about"
              className="px-8 py-4 rounded-full glass hover:glass-strong transition-all duration-300 text-lg font-medium"
            >
              心理診断とは？
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="glass p-6 rounded-2xl hover:glass-strong transition-all duration-300">
              <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h3 className="font-display text-xl mb-2">感情の理解</h3>
              <p className="text-gray-400 text-sm">
                あなたの感情パターンを深く理解します
              </p>
            </div>

            <div className="glass p-6 rounded-2xl hover:glass-strong transition-all duration-300">
              <Brain className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="font-display text-xl mb-2">潜在意識</h3>
              <p className="text-gray-400 text-sm">
                隠された深層心理を明らかにします
              </p>
            </div>

            <div className="glass p-6 rounded-2xl hover:glass-strong transition-all duration-300">
              <Sparkles className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="font-display text-xl mb-2">自己成長</h3>
              <p className="text-gray-400 text-sm">
                より良い未来への道筋を示します
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-400">
            <p>© 2025 心理診断. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
