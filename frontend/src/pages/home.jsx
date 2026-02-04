import React from "react";

function Home() {
  return (
    <div className="bg-[#0b0b0b] min-h-screen w-full flex items-center justify-center px-4 relative overflow-hidden">

      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 w-65 h-65 bg-amber-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[320px] h-80 bg-orange-400/10 rounded-full blur-[140px]" />

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-xl 
                      rounded-2xl border border-white/10 
                      bg-white/5 backdrop-blur-xl
                      px-6 sm:px-10 py-10
                      flex flex-col items-center text-center gap-6 shadow-2xl">

        {/* Badge */}
        <span className="uppercase text-[10px] sm:text-xs 
                         tracking-[0.35em] text-amber-300/80">
          NexusFlow Workspace
        </span>

        {/* Main Heading */}
        <h1 className="font-bold 
                       text-3xl sm:text-4xl md:text-5xl
                       leading-tight tracking-tight">
          <span className="bg-linear-to-r from-amber-200 via-amber-400 to-orange-400 
                           bg-clip-text text-transparent">
            Build smarter.
          </span>
          <br />
          <span className="text-white/90">
            Work faster.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base 
                      tracking-wide text-white/60 max-w-md">
          A unified SaaS workspace for teams, startups & students to plan,
          collaborate and scale — all in one flow.
        </p>

        {/* Divider */}
        <div className="w-12 h-px bg-linear-to-r from-transparent via-amber-400/50 to-transparent" />

        {/* Coming Soon */}
        <span className="uppercase text-xs sm:text-sm 
                         tracking-[0.4em] text-amber-200/80">
          Coming Soon
        </span>

        {/* Footer */}
        <p className="uppercase font-light 
                      text-[9px] sm:text-[11px]
                      tracking-[8px] text-white/40 mt-4">
          powered by akashreddy01
        </p>
      </div>
    </div>
  );
}

export default Home;
