import Link from 'next/link';
import { TrendingUp, BarChart2, Shield, Zap, ArrowRight, Play, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500 selection:text-white overflow-x-hidden">
      {/* Background decoration */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <nav className="container mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter">StockTop</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-widest text-slate-400">
          <Link href="/stocks" className="hover:text-blue-500 transition">Markets</Link>
          <Link href="/dashboard" className="hover:text-blue-500 transition">Platform</Link>
          <Link href="/pricing" className="hover:text-blue-500 transition">Pricing</Link>
          <Link href="/login" className="bg-white text-slate-950 px-6 py-2.5 rounded-full hover:bg-slate-200 transition">Login</Link>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="container mx-auto px-6 pt-24 pb-32 text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 mb-8 animate-bounce">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">New: AI-Powered Risk Scoring</span>
          </div>
          <h1 className="text-7xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
            The Alpha <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600">Intelligence</span>
          </h1>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Stop guessing. Use institutional-grade technical and fundamental analysis powered by our proprietary 100-point scoring algorithm.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
            <Link href="/register" className="group bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl text-lg font-black transition-all duration-300 shadow-2xl shadow-blue-900/40 flex items-center">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/stocks" className="group bg-slate-900 hover:bg-slate-800 border border-slate-800 px-10 py-5 rounded-2xl text-lg font-black transition-all duration-300 flex items-center">
              <Play className="mr-2 w-5 h-5 fill-current" />
              Watch Demo
            </Link>
          </div>

          <div className="mt-20 flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['NASDAQ', 'NYSE', 'S&P 500', 'DOW JONES', 'FTSE 100'].map(market => (
              <span key={market} className="text-xl font-black italic">{market}</span>
            ))}
          </div>
        </section>

        <section className="bg-slate-900/30 border-y border-slate-900 py-32 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-black mb-4 tracking-tight">Institutional-Grade Features</h2>
              <p className="text-slate-500 max-w-xl mx-auto font-semibold">Everything you need to outperform the market in one unified platform.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<TrendingUp className="w-6 h-6 text-green-500" />}
                title="Technical Edge"
                description="Real-time RSI, MACD, and multi-period Moving Averages."
              />
              <FeatureCard
                icon={<BarChart2 className="w-6 h-6 text-blue-500" />}
                title="Deep Fundamentals"
                description="Automated analysis of income statements and balance sheets."
              />
              <FeatureCard
                icon={<Zap className="w-6 h-6 text-yellow-500" />}
                title="Score Protocol"
                description="Our 100-point algorithm removes emotion from your trading."
              />
              <FeatureCard
                icon={<Shield className="w-6 h-6 text-purple-500" />}
                title="Risk Guard"
                description="Volatility monitoring and downside protection alerts."
              />
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-32 text-center">
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-[40px] p-16 relative overflow-hidden shadow-3xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <TrendingUp className="w-64 h-64" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-5xl font-black mb-8 leading-tight tracking-tighter">Ready to join the top 1% of investors?</h2>
              <div className="flex flex-col space-y-4 mb-10">
                {['No credit card required', 'Instant setup', 'Cancel anytime'].map(text => (
                  <div key={text} className="flex items-center justify-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-300" />
                    <span className="font-bold text-blue-100">{text}</span>
                  </div>
                ))}
              </div>
              <Link href="/register" className="inline-block bg-white text-blue-600 px-12 py-5 rounded-2xl text-xl font-black hover:bg-slate-100 transition shadow-xl">
                Get Started Now
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-6 py-12 border-t border-slate-900 text-center">
        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">
          © 2024 StockTop. All rights reserved. Built for Smart Investors.
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-slate-900/50 p-8 rounded-[32px] border border-slate-800 hover:border-blue-500 transition-all duration-300 group">
      <div className="mb-6 p-4 bg-slate-800 rounded-2xl w-fit group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-black mb-3 text-white tracking-tight">{title}</h3>
      <p className="text-slate-500 font-semibold text-sm leading-relaxed">{description}</p>
    </div>
  );
}
