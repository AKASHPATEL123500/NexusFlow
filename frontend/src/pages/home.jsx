import React, { useEffect, useState } from "react";

function Home() {
  const [time, setTime] = useState(new Date());
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [scrolled, setScrolled] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMousePos({ 
            x: (e.clientX / window.innerWidth) * 100,
            y: (e.clientY / window.innerHeight) * 100
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      
      {/* Animated mesh gradient background */}
      <div className="fixed inset-0 opacity-40">
        <div 
          className="absolute inset-0 transition-all duration-700 ease-out"
          style={{
            background: `
              radial-gradient(circle 800px at ${mousePos.x}% ${mousePos.y}%, 
                rgba(139, 92, 246, 0.2), transparent 50%),
              radial-gradient(circle 600px at ${100-mousePos.x}% ${100-mousePos.y}%, 
                rgba(236, 72, 153, 0.15), transparent 50%),
              radial-gradient(circle 1000px at 50% 50%, 
                rgba(59, 130, 246, 0.1), transparent 60%)
            `
          }}
        />
      </div>

      {/* Grain texture */}
      <div className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
           }} 
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-2xl border-b border-white/5' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-violet-600 
                              transform group-hover:rotate-180 transition-transform duration-700 flex items-center justify-center">
                  <div className="w-7 h-7 rounded-lg bg-black/40 backdrop-blur-sm" />
                </div>
                <div className="absolute inset-0 w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 
                              blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="hidden sm:block">
                <div className="text-xl font-bold tracking-tight">NexusFlow</div>
                <div className="text-[9px] tracking-[0.3em] text-white/40 -mt-0.5">WORKSPACE</div>
              </div>
            </div>

            {/* Center nav */}
            <div className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
              {['Features', 'Solutions', 'Pricing', 'Docs'].map((item, i) => (
                <a key={i} href="#" 
                   className="px-5 py-2 rounded-full text-sm font-medium text-white/60 hover:text-white 
                            hover:bg-white/10 transition-all">
                  {item}
                </a>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <button className="hidden sm:block px-5 py-2.5 text-sm font-medium text-white/80 hover:text-white transition-colors">
                Sign In
              </button>
              <button className="px-5 py-2.5 rounded-xl bg-white text-black text-sm font-semibold 
                               hover:bg-white/90 transition-all hover:scale-105 shadow-lg shadow-white/10">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Floating badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 mb-8 rounded-full 
                        bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20
                        hover:border-white/30 transition-all cursor-pointer group">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <span className="text-sm font-medium bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Now in Beta
              </span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
              Launching 2026
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight mb-8 leading-none">
            <span className="block">Where Teams</span>
            <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 
                           bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Build the Future
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed">
            The intelligent workspace that grows with your team. 
            <span className="text-white/90"> Real-time collaboration, AI-powered workflows, zero friction.</span>
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="group relative px-8 py-4 rounded-2xl bg-white text-black font-bold text-base
                             overflow-hidden hover:scale-105 transition-all shadow-2xl shadow-white/20">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-200 to-fuchsia-200 
                            translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2">
                Start Free Trial
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            
            <button className="group px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                             font-bold text-base hover:bg-white/10 hover:border-white/20 transition-all">
              <span className="flex items-center gap-2 text-white/90">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
                Watch Demo
              </span>
            </button>
          </div>

          {/* Social proof */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/40">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 
                                        border-2 border-black" />
                ))}
              </div>
              <span>12,000+ teams</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div className="flex items-center gap-1.5">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1">4.9/5 rating</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <span>SOC 2 Certified</span>
          </div>

          {/* Floating time indicator */}
          <div className="absolute top-28 right-8 hidden xl:block">
            <div className="px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="text-xs text-white/40 tracking-wider">LOCAL TIME</div>
                <div className="font-mono text-lg font-bold tabular-nums">
                  {time.toLocaleTimeString('en-US', { hour12: false })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 mb-4 rounded-full bg-violet-500/10 border border-violet-500/20">
              <span className="text-sm font-medium text-violet-400">Platform Features</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black mb-6">Everything You Need</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Powerful tools designed for modern teams who ship fast
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* Large card - AI Features */}
            <div className="lg:col-span-2 lg:row-span-2 group relative p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 
                          border border-white/10 hover:border-white/20 backdrop-blur-xl overflow-hidden transition-all cursor-pointer"
                 onMouseEnter={() => setActiveCard(0)}
                 onMouseLeave={() => setActiveCard(null)}>
              
              {/* Animated gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 opacity-0 
                            ${activeCard === 0 ? 'opacity-100' : 'group-hover:opacity-50'} transition-opacity duration-700 blur-2xl`} />
              
              <div className="relative z-10">
                <div className="inline-block p-3 mb-6 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-bold mb-4">AI-Powered Automation</h3>
                <p className="text-white/60 text-lg mb-8 max-w-xl">
                  Let AI handle the repetitive work. Smart suggestions, auto-categorization, 
                  and intelligent workflows that adapt to your team's patterns.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {['Smart Suggestions', 'Auto-tagging', 'Predictive Search'].map((tag, i) => (
                    <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Real-time collab */}
            <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 
                          border border-white/10 hover:border-white/20 backdrop-blur-xl overflow-hidden transition-all cursor-pointer"
                 onMouseEnter={() => setActiveCard(1)}
                 onMouseLeave={() => setActiveCard(null)}>
              
              <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-0 
                            ${activeCard === 1 ? 'opacity-100' : 'group-hover:opacity-50'} transition-opacity duration-700 blur-2xl`} />
              
              <div className="relative z-10">
                <div className="inline-block p-3 mb-6 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold mb-3">Real-Time Sync</h3>
                <p className="text-white/60">
                  See changes instantly. No refresh needed. Work together like you're in the same room.
                </p>
              </div>
            </div>

            {/* Security */}
            <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 
                          border border-white/10 hover:border-white/20 backdrop-blur-xl overflow-hidden transition-all cursor-pointer"
                 onMouseEnter={() => setActiveCard(2)}
                 onMouseLeave={() => setActiveCard(null)}>
              
              <div className={`absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 opacity-0 
                            ${activeCard === 2 ? 'opacity-100' : 'group-hover:opacity-50'} transition-opacity duration-700 blur-2xl`} />
              
              <div className="relative z-10">
                <div className="inline-block p-3 mb-6 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold mb-3">Enterprise Security</h3>
                <p className="text-white/60">
                  Bank-level encryption, SOC 2 certified, GDPR compliant. Your data is safe with us.
                </p>
              </div>
            </div>

            {/* Analytics */}
            <div className="lg:col-span-2 group relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 
                          border border-white/10 hover:border-white/20 backdrop-blur-xl overflow-hidden transition-all cursor-pointer"
                 onMouseEnter={() => setActiveCard(3)}
                 onMouseLeave={() => setActiveCard(null)}>
              
              <div className={`absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 opacity-0 
                            ${activeCard === 3 ? 'opacity-100' : 'group-hover:opacity-50'} transition-opacity duration-700 blur-2xl`} />
              
              <div className="relative z-10">
                <div className="inline-block p-3 mb-6 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                
                <h3 className="text-3xl font-bold mb-4">Advanced Analytics</h3>
                <p className="text-white/60 text-lg max-w-xl">
                  Deep insights into team productivity. Track metrics that matter and make data-driven decisions.
                </p>
              </div>
            </div>

            {/* Integrations */}
            <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 
                          border border-white/10 hover:border-white/20 backdrop-blur-xl overflow-hidden transition-all cursor-pointer"
                 onMouseEnter={() => setActiveCard(4)}
                 onMouseLeave={() => setActiveCard(null)}>
              
              <div className={`absolute inset-0 bg-gradient-to-br from-pink-500/20 to-rose-500/20 opacity-0 
                            ${activeCard === 4 ? 'opacity-100' : 'group-hover:opacity-50'} transition-opacity duration-700 blur-2xl`} />
              
              <div className="relative z-10">
                <div className="inline-block p-3 mb-6 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold mb-3">1000+ Integrations</h3>
                <p className="text-white/60">
                  Connect with your favorite tools. One-click setup for Slack, GitHub, Figma & more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { value: "10M+", label: "Active Users", icon: "👥" },
                { value: "99.9%", label: "Uptime SLA", icon: "⚡" },
                { value: "150+", label: "Countries", icon: "🌍" },
                { value: "<100ms", label: "Response Time", icon: "🚀" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl sm:text-6xl font-black mb-6">
            Ready to Level Up?
          </h2>
          <p className="text-xl text-white/60 mb-10">
            Join 10,000+ teams already building on NexusFlow
          </p>
          <button className="px-10 py-5 rounded-2xl bg-white text-black font-bold text-lg
                           hover:scale-105 transition-all shadow-2xl shadow-white/20">
            Start Free Trial →
          </button>
          <p className="text-sm text-white/40 mt-6">No credit card required • 14-day free trial</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            
            {/* Brand */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
                <div className="w-8 h-8 rounded-lg bg-black/40" />
              </div>
              <div>
                <div className="font-bold text-lg">NexusFlow</div>
                <div className="text-sm text-white/40">Crafted by <span className="text-white/60 font-medium">Akash Reddy 01</span></div>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-8 text-sm">
              {[
                ['Product', 'Features', 'Pricing', 'Changelog'],
                ['Company', 'About', 'Blog', 'Careers'],
                ['Legal', 'Privacy', 'Terms', 'Security']
              ].map((group, i) => (
                <div key={i} className="space-y-3">
                  <div className="font-semibold text-white/90">{group[0]}</div>
                  {group.slice(1).map((link, j) => (
                    <div key={j}>
                      <a href="#" className="text-white/50 hover:text-white transition-colors block">
                        {link}
                      </a>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-4">
              {['twitter', 'github', 'linkedin'].map((social, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 
                                              hover:border-white/20 flex items-center justify-center transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-white/40 rounded" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/40">
            © 2026 NexusFlow. All rights reserved.
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default Home;