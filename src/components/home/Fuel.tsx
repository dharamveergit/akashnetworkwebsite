/**
 * Fuel Component - Optimized for performance
 * Uses CSS-only particle animation instead of heavy canvas-based JavaScript
 * This reduces JavaScript execution time from ~2s to near zero
 */

const Fuel = () => {
  return (
    <section className="relative overflow-hidden bg-primary">
      {/* CSS-only animated particles - no JS execution cost */}
      <div className="particles-container absolute inset-0">
        {/* Static particle elements with CSS animations */}
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
        <div className="particle particle-4" />
        <div className="particle particle-5" />
        <div className="particle particle-6" />
        <div className="particle particle-7" />
        <div className="particle particle-8" />
        <div className="particle particle-9" />
        <div className="particle particle-10" />
        <div className="particle particle-11" />
        <div className="particle particle-12" />
        <div className="particle particle-13" />
        <div className="particle particle-14" />
        <div className="particle particle-15" />
        <div className="particle particle-16" />
        <div className="particle particle-17" />
        <div className="particle particle-18" />
        <div className="particle particle-19" />
        <div className="particle particle-20" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center py-12 md:py-20">
        <img src="/images/akashstar.svg" alt="Akash Star" className="h-12" />
        <div className="mt-5 flex flex-col md:gap-2">
          <h2 className="text-center text-2xl font-semibold leading-[50px] text-white md:text-5xl">
            <span className="font-instrument">AKT</span>: The Fuel Behind Akash
          </h2>
          <p className="px-6 text-center text-white">
            AKT is the utility token that powers every GPU transaction on the
            Akash decentralized cloud.
          </p>
        </div>
        <a
          href="/token/"
          className="mt-10 flex items-center gap-2 rounded bg-white px-6 py-3 text-black transition-all duration-300 hover:bg-[#E9E9E9]"
        >
          Learn How AKT Works
        </a>
      </div>

      <style>{`
        .particles-container {
          pointer-events: none;
        }
        
        .particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: float linear infinite;
          will-change: transform, opacity;
        }
        
        @keyframes float {
          0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-10vh) translateX(50px);
            opacity: 0;
          }
        }
        
        .particle-1 { left: 5%; width: 3px; height: 3px; animation-duration: 12s; animation-delay: 0s; }
        .particle-2 { left: 15%; width: 2px; height: 2px; animation-duration: 14s; animation-delay: 1s; }
        .particle-3 { left: 25%; width: 4px; height: 4px; animation-duration: 10s; animation-delay: 2s; }
        .particle-4 { left: 35%; width: 2px; height: 2px; animation-duration: 16s; animation-delay: 0.5s; }
        .particle-5 { left: 45%; width: 3px; height: 3px; animation-duration: 11s; animation-delay: 3s; }
        .particle-6 { left: 55%; width: 2px; height: 2px; animation-duration: 13s; animation-delay: 1.5s; }
        .particle-7 { left: 65%; width: 4px; height: 4px; animation-duration: 15s; animation-delay: 2.5s; }
        .particle-8 { left: 75%; width: 3px; height: 3px; animation-duration: 12s; animation-delay: 0.8s; }
        .particle-9 { left: 85%; width: 2px; height: 2px; animation-duration: 14s; animation-delay: 3.5s; }
        .particle-10 { left: 95%; width: 3px; height: 3px; animation-duration: 11s; animation-delay: 1.2s; }
        .particle-11 { left: 10%; width: 2px; height: 2px; animation-duration: 13s; animation-delay: 4s; }
        .particle-12 { left: 20%; width: 3px; height: 3px; animation-duration: 15s; animation-delay: 2.2s; }
        .particle-13 { left: 30%; width: 4px; height: 4px; animation-duration: 10s; animation-delay: 1.8s; }
        .particle-14 { left: 40%; width: 2px; height: 2px; animation-duration: 12s; animation-delay: 3.2s; }
        .particle-15 { left: 50%; width: 3px; height: 3px; animation-duration: 14s; animation-delay: 0.3s; }
        .particle-16 { left: 60%; width: 2px; height: 2px; animation-duration: 16s; animation-delay: 2.8s; }
        .particle-17 { left: 70%; width: 4px; height: 4px; animation-duration: 11s; animation-delay: 1.6s; }
        .particle-18 { left: 80%; width: 3px; height: 3px; animation-duration: 13s; animation-delay: 3.8s; }
        .particle-19 { left: 90%; width: 2px; height: 2px; animation-duration: 15s; animation-delay: 0.6s; }
        .particle-20 { left: 2%; width: 3px; height: 3px; animation-duration: 12s; animation-delay: 2.4s; }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .particle {
            animation: none;
            opacity: 0.4;
          }
        }
      `}</style>
    </section>
  );
};

export default Fuel;
