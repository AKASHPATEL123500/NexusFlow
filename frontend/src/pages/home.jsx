import React from "react";

function Home() {
  return (
    <div className="bg-black text-amber-50 min-h-screen w-full flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center gap-4">
        
        {/* Main Heading */}
        <h1 className="uppercase font-bold 
                       text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                       tracking-wide">
          Hello from NexusFlow Team
        </h1>

        {/* Coming Soon */}
        <h2 className="uppercase font-semibold 
                       text-sm sm:text-base md:text-lg
                       tracking-wider text-amber-200">
          Coming Soon
        </h2>

        {/* Footer Text */}
        <p className="uppercase font-extralight 
                      text-[10px] sm:text-[12px] md:text-[14px]
                      tracking-[6px] sm:tracking-[10px] md:tracking-[14px]
                      opacity-70 mt-4">
          powered by akashreddy01
        </p>

      </div>
    </div>
  );
}

export default Home;
