import { useEffect, useRef } from 'react';
import { Cloud, ArrowRight, Play } from 'lucide-react';
import { gsap } from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.fromTo(logoRef.current,
      { scale: 0, rotation: -180, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.7)' }
    )
    .fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(buttonsRef.current ? Array.from(buttonsRef.current.children) : [],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.2 },
      '-=0.2'
    );
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-50 to-purple-50"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Animated Logo */}
        <div ref={logoRef} className="mb-8">
          <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/25">
            <Cloud className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Main Title */}
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent leading-tight">
          Affordable Cloud Solutions
        </h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Power your business with enterprise-grade cloud infrastructure at a fraction of the cost. 
          The smart alternative to AWS, Azure, and GCP.
        </p>

        {/* Action Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="group bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 flex items-center space-x-2">
            <span>Start Free Trial</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="group flex items-center space-x-3 text-slate-700 hover:text-blue-600 transition-colors duration-300 font-semibold text-lg">
            <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300">
              <Play className="w-5 h-5 ml-0.5" />
            </div>
            <span>Watch Demo</span>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: '99.9%', label: 'Uptime Guarantee' },
            { number: '60%', label: 'Cost Savings' },
            { number: '24/7', label: 'Expert Support' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;