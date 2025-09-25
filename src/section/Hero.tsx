import { useEffect, useRef } from 'react';
// import { Cloud } from 'lucide-react';
import semiCircle1 from '../assets/hero/semiCircle1.png';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Simple fade-in animations without GSAP
    const elements = [logoRef.current, titleRef.current, subtitleRef.current, buttonsRef.current];
    
    elements.forEach((element, index) => {
      if (element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
          element.style.transition = 'all 0.8s ease-out';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, (index + 1) * 200);
      }
    });
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden pt-12 md:pt-16 bg-gradient-to-br from-gray-900 via-black to-black">
      {/* Top Left Corner Gradient */}
      <div className="absolute top-[-40vh] left-[-10vh] w-156 h-156 opacity-80">
        <div className="w-full h-full bg-gradient-to-br from-pink-500 via-fuchsia-600 via-purple-700 to-blue-500 rounded-full blur-3xl"></div>
      </div>

      {/* Top Right Corner Gradient */}
      <div className="absolute top-[-40vh] right-[-10vh] w-156 h-156 opacity-80">
        <div className="w-full h-full bg-gradient-to-bl from-pink-500 via-fuchsia-600 via-purple-700 to-blue-500 rounded-full blur-3xl"></div>
      </div>

      {/* Background with subtle animations */}
      <div ref={backgroundRef} className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Cpath fill=%22none%22 stroke=%22%23a3bffa%22 stroke-width=%221%22 d=%22M10 50 Q50 10 90 50 Q50 90 10 50%22/%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2220%22 fill=%22%23a3bffa%22 opacity=%220.1%22/%3E%3C/svg%3E')] opacity-30">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-black/70 to-black/70"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10 -mt-12 md:-mt-20  ">

        {/* Main Title */}
        <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold mb-5 text-white">
          <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,_rgba(225,225,225,0.9)_2%,_#98239e_100%)]">Affordable</span> Cloud Solutions &{' '}
          <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,_rgba(225,225,225,0.9)_2%,_#98239e_100%)]">Modern</span> Web Experiences
        </h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          Cloud-High connects you with AWS, GCP, and Azure services at 20–30% lower costs. Plus, professional websites built for startups and enterprises.
        </p>

        {/* Action Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button className="px-6 py-3 rounded-full font-semibold text-base md:text-lg text-white shadow-lg transition-all duration-300 hover:scale-105 border border-white/15 backdrop-blur-md bg-[linear-gradient(90deg,_rgba(0,0,0,0.75)_5%,_#98239e_100%)]">
            Book Free Consultation
          </button>
          <button className="text-white/90 border border-white/20 px-5 py-2.5 rounded-full font-semibold text-base md:text-lg hover:text-white hover:border-white/40 hover:scale-105 transition-all duration-300 backdrop-blur-md bg-white/5">
            Request a Quote
          </button>
        </div>
      </div>

      {/* Semicircle accent */}
      <img
        src={semiCircle1}
        alt="purple semicircle glow"
        className="absolute left-1/2 -translate-x-1/2 top-[75%] md:top-[70%] w-[680px] md:w-[760px] max-w-[90vw] opacity-90 drop-shadow-[0_20px_60px_rgba(150,0,255,0.35)] select-none pointer-events-none z-[5]"
      />

      {/* Additional morphing overlay for seamless blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none"></div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 0.6;
            transform: scale(1.05);
          }
        }
        
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;