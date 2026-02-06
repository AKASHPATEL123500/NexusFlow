import React, { useEffect, useState, useRef } from "react";

function Home() {
  const [time, setTime] = useState(new Date());
  const [ripples, setRipples] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    setRipples([...ripples, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1500);
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full bg-[#000000] relative overflow-hidden"
      onClick={handleClick}
    >
      {/* Premium Spotlight Effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(251, 191, 36, 0.08), transparent 40%)`
        }}
      />

      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none z-20"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="w-0 h-0 rounded-full border-2 border-amber-400/60 animate-ripple-premium" />
          <div className="w-0 h-0 rounded-full border border-amber-300/40 animate-ripple-premium-delayed absolute inset-0" />
        </div>
      ))}

      {/* Animated Grid with Depth */}
      <div className="absolute inset-0 opacity-[0.15]">
        <div className="h-full w-full animate-grid-flow" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(251, 191, 36, 0.15) 1.5px, transparent 1.5px),
                 linear-gradient(90deg, rgba(251, 191, 36, 0.15) 1.5px, transparent 1.5px)
               `,
               backgroundSize: '60px 60px',
               perspective: '1000px',
             }}
        />
      </div>

      {/* Premium Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-150 h-150 bg-amber-500/10 rounded-full blur-[150px] animate-float-1" />
      <div className="absolute bottom-1/4 right-1/3 w-125 h-125 bg-orange-400/10 rounded-full blur-[130px] animate-float-2" />
      <div className="absolute top-1/2 right-1/4 w-100 h-100 bg-yellow-400/10 rounded-full blur-[120px] animate-float-3" />

      {/* Diagonal Premium Lines */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-[0.08]">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute h-0.5 bg-linear-to-r from-transparent via-amber-400 to-transparent animate-diagonal-flow"
            style={{
              width: '200%',
              top: `${i * 4}%`,
              left: '-50%',
              transform: `rotate(-35deg)`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none">
        <div className="w-full h-full bg-noise animate-noise" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        
        {/* Premium Time Display */}
        <div className="absolute top-8 right-8 group">
          <div className="font-mono text-amber-400/30 text-sm tracking-[0.3em] transition-all duration-300 group-hover:text-amber-400/60 group-hover:tracking-[0.35em]">
            {time.toLocaleTimeString('en-US', { hour12: false })}
          </div>
          <div className="h-px w-0 bg-linear-to-r from-amber-400/50 to-transparent group-hover:w-full transition-all duration-500 mt-1" />
        </div>

        {/* Premium Logo with Layers */}
        <div className="mb-16 relative group">
          <div className="absolute inset-0 bg-amber-400/20 blur-3xl group-hover:blur-[80px] transition-all duration-700 animate-pulse-glow" />
          <div className="absolute inset-0 bg-orange-400/10 blur-2xl group-hover:blur-[60px] transition-all duration-700 animate-pulse-glow-delayed" />
          
          <div className="relative">
            {/* Outer Ring */}
            <svg width="120" height="120" viewBox="0 0 120 120" className="animate-spin-elegant">
              <circle cx="60" cy="60" r="55" fill="none" stroke="url(#gradient1)" strokeWidth="1" strokeDasharray="8 8" opacity="0.4" />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Middle Ring */}
            <svg width="120" height="120" viewBox="0 0 120 120" className="absolute inset-0 animate-spin-counter">
              <circle cx="60" cy="60" r="45" fill="none" stroke="url(#gradient2)" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.6" />
              <defs>
                <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center Hexagon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-linear-to-br from-amber-400 to-orange-500 opacity-20 blur-xl animate-pulse" />
                <svg width="48" height="48" viewBox="0 0 48 48" className="relative">
                  <polygon points="24,4 40,14 40,34 24,44 8,34 8,14" fill="none" stroke="url(#gradient3)" strokeWidth="2" />
                  <defs>
                    <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse-fast" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl text-center space-y-10">
          
          {/* Premium Glitch Text */}
          <div className="relative">
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter relative leading-none">
              <span className="absolute inset-0 text-amber-400/20 blur-sm animate-glitch-premium-1">
                NEXUSFLOW
              </span>
              <span className="absolute inset-0 text-orange-400/20 blur-md animate-glitch-premium-2">
                NEXUSFLOW
              </span>
              <span className="absolute inset-0 text-yellow-400/10 blur-lg animate-glitch-premium-3">
                NEXUSFLOW
              </span>
              <span className="relative bg-linear-to-b from-white via-amber-50 to-amber-400 bg-clip-text text-transparent filter drop-shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                NEXUSFLOW
              </span>
            </h1>
            
            {/* Underline Effect */}
            <div className="flex justify-center mt-6">
              <div className="h-0.5 w-64 bg-linear-to-r from-transparent via-amber-400 to-transparent animate-width-pulse" />
            </div>
          </div>

          {/* Premium Typewriter */}
          <div className="h-10 flex items-center justify-center">
            <p className="text-amber-400/70 text-base md:text-lg tracking-[0.4em] font-light uppercase animate-typewriter-premium overflow-hidden whitespace-nowrap border-r-2 border-amber-400/70">
              The Future of Workspace
            </p>
          </div>

          {/* Premium Description */}
          <div className="space-y-4 text-white/60 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            <p className="animate-fade-in-premium hover:text-white/80 transition-colors duration-500" style={{ animationDelay: '0.3s' }}>
              Where <span className="text-amber-400/80 font-medium">innovation</span> meets <span className="text-amber-400/80 font-medium">execution</span>.
            </p>
            <p className="animate-fade-in-premium hover:text-white/80 transition-colors duration-500" style={{ animationDelay: '0.5s' }}>
              A revolutionary platform designed for <span className="text-amber-400/80 font-medium">creators</span>, <span className="text-amber-400/80 font-medium">builders</span>, and <span className="text-amber-400/80 font-medium">dreamers</span>.
            </p>
            <p className="animate-fade-in-premium hover:text-white/80 transition-colors duration-500" style={{ animationDelay: '0.7s' }}>
              Transform your workflow. <span className="text-amber-400/80 font-medium">Elevate your vision</span>.
            </p>
          </div>

          {/* Premium Stats with Parallax */}
          <div className="grid grid-cols-3 gap-12 pt-16 max-w-3xl mx-auto">
            {[
              { num: "01", label: "UNIFIED", desc: "Single Platform" },
              { num: "02", label: "POWERFUL", desc: "Infinite Scale" },
              { num: "03", label: "SEAMLESS", desc: "Zero Friction" }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="group animate-fade-in-up-premium relative"
                style={{ animationDelay: `${1 + idx * 0.2}s` }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="absolute -inset-4 bg-linear-to-br from-amber-400/0 to-orange-400/0 group-hover:from-amber-400/5 group-hover:to-orange-400/5 rounded-lg blur-xl transition-all duration-500" />
                <div className="relative border border-white/5 rounded-lg p-6 bg-white/2 backdrop-blur-sm group-hover:border-amber-400/20 transition-all duration-500 group-hover:transform group-hover:scale-105">
                  <div className="text-5xl font-bold bg-linear-to-br from-amber-400/40 to-orange-400/40 bg-clip-text text-transparent group-hover:from-amber-400/70 group-hover:to-orange-400/70 transition-all duration-500">
                    {item.num}
                  </div>
                  <div className="text-xs tracking-[0.4em] text-amber-400/50 mt-3 group-hover:text-amber-400/80 group-hover:tracking-[0.45em] transition-all duration-500">
                    {item.label}
                  </div>
                  <div className="text-[10px] tracking-wider text-white/30 mt-2 group-hover:text-white/50 transition-all duration-500">
                    {item.desc}
                  </div>
                  
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-amber-400/0 group-hover:border-amber-400/50 transition-all duration-500" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-amber-400/0 group-hover:border-amber-400/50 transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>

          {/* Premium CTA */}
          <div className="pt-20 space-y-8">
            <div className="inline-block relative group">
              <div className="absolute -inset-2 bg-linear-to-r from-amber-400 via-orange-500 to-amber-400 rounded-xl blur-lg opacity-40 group-hover:opacity-70 transition-all duration-700 animate-gradient-shift" />
              <div className="absolute -inset-1 bg-linear-to-r from-amber-400 to-orange-500 rounded-lg opacity-50 group-hover:opacity-80 transition-all duration-500" />
              
              <button className="relative px-16 py-5 bg-black border-2 border-amber-400/50 rounded-lg overflow-hidden group-hover:border-amber-400 transition-all duration-500">
                <div className="absolute inset-0 bg-linear-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative text-amber-400 font-bold tracking-[0.3em] text-sm group-hover:text-amber-300 group-hover:tracking-[0.35em] transition-all duration-500">
                  LAUNCHING SOON
                </span>
              </button>
            </div>
            
            {/* Year Indicator */}
            <div className="flex items-center justify-center gap-6 text-white/40 text-xs">
              <div className="h-px w-20 bg-linear-to-r from-transparent via-amber-400/30 to-amber-400/30 animate-line-glow" />
              <span className="tracking-[0.6em] font-light">2 0 2 6</span>
              <div className="h-px w-20 bg-linear-to-l from-transparent via-amber-400/30 to-amber-400/30 animate-line-glow-reverse" />
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 justify-center pt-4">
              {['AI-Powered', 'Cloud Native', 'Real-time Sync', 'Enterprise Ready'].map((feature, idx) => (
                <div 
                  key={idx}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/2 backdrop-blur-sm text-white/40 text-xs tracking-wider hover:border-amber-400/30 hover:text-amber-400/60 transition-all duration-500 cursor-default animate-fade-in-premium"
                  style={{ animationDelay: `${1.5 + idx * 0.1}s` }}
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Premium Bottom Credits */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-between items-center px-8 text-white/20 text-[10px] tracking-[0.3em]">
          <div className="group cursor-default">
            <span className="group-hover:text-amber-400/40 transition-colors duration-500">AKASHREDDY01</span>
            <div className="h-px w-0 bg-linear-to-r from-amber-400/50 to-transparent group-hover:w-full transition-all duration-500 mt-1" />
          </div>
          <div className="flex gap-6">
            {['VER 1.0', 'BETA'].map((text, idx) => (
              <span key={idx} className="hover:text-amber-400/40 transition-colors duration-500 cursor-default">
                {text}
              </span>
            ))}
          </div>
          <div className="group cursor-default">
            <span className="group-hover:text-amber-400/40 transition-colors duration-500">WORKSPACE.NEXUS</span>
            <div className="h-px w-0 bg-linear-to-l from-amber-400/50 to-transparent group-hover:w-full transition-all duration-500 mt-1" />
          </div>
        </div>

        {/* Premium Scroll Indicator */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-bounce-premium">
          <div className="relative group">
            <div className="absolute -inset-2 bg-amber-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative w-7 h-12 border-2 border-amber-400/30 rounded-full flex items-start justify-center p-1.5 group-hover:border-amber-400/60 transition-all duration-500">
              <div className="w-1.5 h-3 bg-linear-to-b from-amber-400/60 to-transparent rounded-full animate-scroll-premium" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ripple-premium {
          0% { width: 0; height: 0; opacity: 1; }
          100% { width: 150px; height: 150px; opacity: 0; }
        }
        @keyframes ripple-premium-delayed {
          0% { width: 0; height: 0; opacity: 0.6; }
          100% { width: 120px; height: 120px; opacity: 0; }
        }
        @keyframes glitch-premium-1 {
          0%, 100% { transform: translate(0); }
          25% { transform: translate(-3px, 3px); }
          50% { transform: translate(3px, -3px); }
          75% { transform: translate(-2px, -2px); }
        }
        @keyframes glitch-premium-2 {
          0%, 100% { transform: translate(0); }
          33% { transform: translate(3px, -3px); }
          66% { transform: translate(-3px, 3px); }
        }
        @keyframes glitch-premium-3 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, -2px); }
          80% { transform: translate(-2px, 2px); }
        }
        @keyframes typewriter-premium {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes fade-in-premium {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up-premium {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes spin-elegant {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-counter {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes bounce-premium {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -15px); }
        }
        @keyframes scroll-premium {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
        @keyframes pulse-glow-delayed {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.08); }
        }
        @keyframes pulse-fast {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(30px, -30px); }
          66% { transform: translate(-20px, 20px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(-25px, 25px); }
          66% { transform: translate(20px, -20px); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(20px, 30px); }
          66% { transform: translate(-30px, -20px); }
        }
        @keyframes diagonal-flow {
          0% { opacity: 0.05; transform: rotate(-35deg) translateX(-10%); }
          50% { opacity: 0.15; }
          100% { opacity: 0.05; transform: rotate(-35deg) translateX(10%); }
        }
        @keyframes grid-flow {
          0% { transform: perspective(1000px) rotateX(60deg) translateY(0); }
          100% { transform: perspective(1000px) rotateX(60deg) translateY(60px); }
        }
        @keyframes width-pulse {
          0%, 100% { width: 16rem; opacity: 0.4; }
          50% { width: 20rem; opacity: 0.8; }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes line-glow {
          0%, 100% { opacity: 0.3; transform: scaleX(1); }
          50% { opacity: 0.6; transform: scaleX(1.1); }
        }
        @keyframes line-glow-reverse {
          0%, 100% { opacity: 0.3; transform: scaleX(1); }
          50% { opacity: 0.6; transform: scaleX(1.1); }
        }
        @keyframes noise {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
        }
        
        .animate-ripple-premium { animation: ripple-premium 1.5s cubic-bezier(0, 0, 0.2, 1) forwards; }
        .animate-ripple-premium-delayed { animation: ripple-premium-delayed 1.5s cubic-bezier(0, 0, 0.2, 1) 0.1s forwards; }
        .animate-glitch-premium-1 { animation: glitch-premium-1 0.4s infinite; }
        .animate-glitch-premium-2 { animation: glitch-premium-2 0.4s infinite 0.15s; }
        .animate-glitch-premium-3 { animation: glitch-premium-3 0.5s infinite 0.25s; }
        .animate-typewriter-premium { animation: typewriter-premium 3s steps(30) forwards; }
        .animate-fade-in-premium { 
          animation: fade-in-premium 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-fade-in-up-premium { 
          animation: fade-in-up-premium 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-spin-elegant { animation: spin-elegant 25s linear infinite; }
        .animate-spin-counter { animation: spin-counter 20s linear infinite; }
        .animate-bounce-premium { animation: bounce-premium 3s ease-in-out infinite; }
        .animate-scroll-premium { animation: scroll-premium 2s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .animate-pulse-glow-delayed { animation: pulse-glow-delayed 5s ease-in-out infinite 0.5s; }
        .animate-pulse-fast { animation: pulse-fast 1.5s ease-in-out infinite; }
        .animate-float-1 { animation: float-1 20s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 25s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 30s ease-in-out infinite; }
        .animate-diagonal-flow { animation: diagonal-flow 8s ease-in-out infinite; }
        .animate-grid-flow { animation: grid-flow 20s linear infinite; }
        .animate-width-pulse { animation: width-pulse 3s ease-in-out infinite; }
        .animate-gradient-shift { 
          animation: gradient-shift 5s ease infinite;
          background-size: 200% 200%;
        }
        .animate-line-glow { animation: line-glow 2s ease-in-out infinite; }
        .animate-line-glow-reverse { animation: line-glow-reverse 2s ease-in-out infinite 0.5s; }
        .animate-noise { 
          animation: noise 0.2s steps(10) infinite;
        }
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}

export default Home;