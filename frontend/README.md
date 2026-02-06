# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

















import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

function NexusAura() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Smooth Spring Animations
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30 });
  
  // Custom Parallax for Hero
  const textScale = useTransform(smoothY, [0, 300], [1, 1.5]);
  const textOpacity = useTransform(smoothY, [0, 400], [1, 0]);
  const bgScale = useTransform(smoothY, [0, 1000], [1, 1.2]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const moveX = (clientX / window.innerWidth - 0.5) * 40;
      const moveY = (clientY / window.innerHeight - 0.5) * 40;
      setMousePos({ x: moveX, y: moveY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-white font-sans selection:bg-indigo-500 overflow-x-hidden">
      
      {/* 1. DYNAMIC CURSOR AURA */}
      <div 
        className="fixed w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none z-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)`,
          left: '20%', top: '10%'
        }}
      />

      {/* 2. FLOATING NAV PILL */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-8 px-8 py-4 bg-white/5 backdrop-blur-2xl rounded-full border border-white/10 shadow-2xl">
          <div className="text-xl font-black tracking-tighter italic">NX.</div>
          <div className="hidden md:flex gap-6 text-sm font-medium opacity-60">
            {['Vision', 'Tech', 'Pricing', 'Connect'].map(i => (
              <a key={i} href="#" className="hover:text-indigo-400 transition-colors">{i}</a>
            ))}
          </div>
          <button className="px-5 py-2 bg-indigo-600 rounded-full text-xs font-bold hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)]">
            JOIN THE VOID
          </button>
        </div>
      </nav>

      {/* 3. HERO - DEPTH SECTION */}
      <section className="relative h-[150vh] flex flex-col items-center justify-start pt-[20vh]">
        <motion.div 
          style={{ scale: textScale, opacity: textOpacity }}
          className="sticky top-[25vh] text-center z-10"
        >
          <span className="inline-block px-4 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
            The Future of Flow
          </span>
          <h1 className="text-[12vw] md:text-[10vw] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
            NEXUS <br /> ULTRA
          </h1>
          <p className="mt-8 text-lg md:text-xl opacity-40 max-w-xl mx-auto font-light leading-relaxed px-6">
            Beyond tools. Beyond speed. An ecosystem designed to disappear, leaving only your genius.
          </p>
        </motion.div>

        {/* 4. MOUSE-REACTIVE BENTO PREVIEW */}
        <div className="relative w-full max-w-6xl mx-auto mt-20 px-6">
          <motion.div 
            style={{ 
              rotateX: mousePos.y * -0.2, 
              rotateY: mousePos.x * 0.2,
              scale: bgScale 
            }}
            className="perspective-1000 w-full aspect-video rounded-[40px] border border-white/10 bg-gradient-to-br from-white/5 to-transparent overflow-hidden shadow-2xl backdrop-blur-sm"
          >
            {/* Mock Interface Elements */}
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 p-8 gap-4 opacity-50">
              <div className="col-span-8 row-span-4 bg-white/5 rounded-3xl border border-white/5" />
              <div className="col-span-4 row-span-2 bg-indigo-500/20 rounded-3xl border border-indigo-500/20" />
              <div className="col-span-4 row-span-4 bg-white/5 rounded-3xl border border-white/5" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. "THE FLOW" - INFINITE SCROLL TEXT */}
      <section className="py-20 bg-white text-black overflow-hidden">
        <div className="flex whitespace-nowrap overflow-hidden">
          {[1,2,3].map(i => (
            <motion.div 
              key={i}
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-[15vh] font-black uppercase tracking-tighter flex items-center gap-10 pr-10"
            >
              <span>Build Faster</span>
              <span className="text-indigo-600">★</span>
              <span>Scale Smarter</span>
              <span className="text-indigo-600">★</span>
              <span>Nexus Flow</span>
              <span className="text-indigo-600">★</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. FEATURES - THE FLOATING CARDS */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Neural Sync", desc: "Automate with the speed of thought.", color: "from-blue-500/20" },
            { title: "Quantum Scale", desc: "Infinite power, zero configuration.", color: "from-indigo-500/20" },
            { title: "Edge Control", desc: "Absolute privacy by default.", color: "from-purple-500/20" },
          ].map((f, i) => (
            <div 
              key={i}
              className={`group relative p-10 rounded-[3rem] bg-gradient-to-br ${f.color} to-transparent border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-4`}
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 mb-8 flex items-center justify-center text-2xl">
                {i === 0 ? "🧠" : i === 1 ? "⚡" : "🛡️"}
              </div>
              <h3 className="text-3xl font-bold mb-4">{f.title}</h3>
              <p className="opacity-40 leading-relaxed">{f.desc}</p>
              <div className="mt-8 flex items-center gap-2 text-indigo-400 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                LEARN MORE <span className="text-lg">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CTA - THE BLACK HOLE EFFECT */}
      <section className="py-60 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/10 scale-[2] blur-[150px] animate-pulse" />
        <div className="relative z-10 text-center px-6">
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-12">
            READY TO <br /> EVOLVE?
          </h2>
          <button className="group relative px-12 py-6 bg-white text-black rounded-full font-black text-xl overflow-hidden transition-transform hover:scale-110 active:scale-95">
            <span className="relative z-10">GET EARLY ACCESS</span>
            <div className="absolute inset-0 bg-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] tracking-[0.2em] opacity-40 uppercase font-bold">
        <div>© 2026 Nexus Labs International</div>
        <div className="flex gap-10">
          <a href="#">Twitter</a>
          <a href="#">Mirror</a>
          <a href="#">GitHub</a>
        </div>
        <div>Status: Optimizing...</div>
      </footer>

    </div>
  );
}

export default NexusAura;