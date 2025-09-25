import { useEffect, useRef } from 'react';
import { Tag, Code, Settings } from 'lucide-react';

const WhatCloudHigh = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple fade-in animations without GSAP
    const elements = [titleRef.current, cardsRef.current];
    
    elements.forEach((element, index) => {
      if (element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
          element.style.transition = 'all 0.8s ease-out';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, (index + 1) * 300);
      }
    });

    // Animate cards individually
    if (cardsRef.current) {
      const cards = Array.from(cardsRef.current.children);
      cards.forEach((card, index) => {
        if (card instanceof HTMLElement) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(40px)';
          
          setTimeout(() => {
            card.style.transition = 'all 0.8s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 600 + (index * 200));
        }
      });
    }
  }, []);

  const features = [
    {
      icon: Tag,
      title: 'Affordable Access',
      subtitle: 'Save up to 30%',
      description: 'vs. direct providers',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Code,
      title: 'Expert Solutions',
      subtitle: 'Modern, scalable',
      description: 'web design & development',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Settings,
      title: 'Process-Oriented',
      subtitle: 'Smooth onboarding,',
      description: 'consultation-driven approach',
      gradient: 'from-cyan-500 to-blue-500'
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Effects - matching hero section style */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-black"></div>
      
      {/* Corner Gradients similar to hero */}
      <div className="absolute top-[-20vh] left-[-10vh] w-96 h-96 opacity-60">
        <div className="w-full h-full bg-gradient-to-br from-pink-500 via-fuchsia-600 via-purple-700 to-blue-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="absolute bottom-[-20vh] right-[-10vh] w-96 h-96 opacity-60">
        <div className="w-full h-full bg-gradient-to-bl from-pink-500 via-fuchsia-600 via-purple-700 to-blue-500 rounded-full blur-3xl"></div>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Cpath fill=%22none%22 stroke=%22%23a3bffa%22 stroke-width=%220.5%22 d=%22M10 50 Q50 10 90 50 Q50 90 10 50%22/%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2215%22 fill=%22%23a3bffa%22 opacity=%220.05%22/%3E%3C/svg%3E')] opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title Section */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">WHY CHOOSE </span>
            <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,_rgba(225,225,225,0.9)_2%,_#98239e_100%)]">CLOUD-HIGH?</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Professional cloud solutions and web services, simplified and cost-effective.
          </p>
        </div>

        {/* Feature Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 text-center"
            >
              {/* Card background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-[linear-gradient(90deg,_rgba(225,225,225,0.9)_2%,_#98239e_100%)] transition-all duration-300">
                  {feature.title}
                </h3>
                
                {/* Subtitle */}
                <p className="text-lg font-semibold text-gray-200 mb-2">
                  {feature.subtitle}
                </p>
                
                {/* Description */}
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none"></div>
    </section>
  );
};

export default WhatCloudHigh;