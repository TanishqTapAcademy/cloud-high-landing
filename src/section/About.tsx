import { useEffect, useRef, useState, type RefObject, type ComponentType } from 'react';
import { Users, Award, Target, Heart, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

type ValueItem = {
  icon: ComponentType<{ className?: string }>,
  title: string,
  description: string,
  gradient: string,
  glowOverlayFrom: string,
  borderHover: string,
  ringHover: string
};

const ValuesCarousel = ({ values, valuesRef }: { values: ValueItem[]; valuesRef: RefObject<HTMLDivElement | null> }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % values.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, values.length]);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % values.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + values.length) % values.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <div 
      ref={valuesRef} 
      className="relative max-w-6xl mx-auto"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Main Carousel Container */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-800/20 backdrop-blur-sm border border-white/10 p-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        {/* Carousel Track */}
        <div 
          ref={carouselRef}
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {values.map((value: ValueItem, index: number) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <div className="value-card group relative max-w-2xl mx-auto">
                <div className={`relative bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/10 ${value.borderHover} ${value.ringHover} transition-all duration-500 hover:-translate-y-2 text-center`}>
                  
                  {/* Enhanced Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.glowOverlayFrom} to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                  
                  {/* Multiple Floating orbs */}
                  <div className={`absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br ${value.gradient} rounded-full opacity-60 blur-sm group-hover:scale-125 transition-transform duration-500`}></div>
                  <div className={`absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-br ${value.gradient} rounded-full opacity-40 blur-sm group-hover:scale-110 transition-transform duration-500`} style={{animationDelay: '0.5s'}}></div>
                  
                  <div className="relative z-10">
                    {/* Large Icon */}
                    <div className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 mx-auto shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <value.icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                      {value.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed group-hover:text-gray-200 transition-colors max-w-lg mx-auto">
                      {value.description}
                    </p>

                    {/* Decorative Line */}
                    <div className={`w-16 h-1 bg-gradient-to-r ${value.gradient} mx-auto mt-6 rounded-full opacity-60 group-hover:opacity-100 group-hover:w-24 transition-all duration-500`}></div>
                  </div>

                  {/* Animated Border */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
                       style={{
                         background: `linear-gradient(45deg, transparent, ${value.gradient.includes('cyan') ? '#22d3ee' : value.gradient.includes('blue') ? '#3b82f6' : value.gradient.includes('indigo') ? '#6366f1' : '#a855f7'}20, transparent)`,
                         padding: '1px'
                       }}>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-slate-800/80 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-slate-700/80 hover:scale-110 transition-all duration-300 group z-10"
        >
          <ChevronLeft className="w-6 h-6 group-hover:text-cyan-400 transition-colors" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-slate-800/80 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-slate-700/80 hover:scale-110 transition-all duration-300 group z-10"
        >
          <ChevronRight className="w-6 h-6 group-hover:text-cyan-400 transition-colors" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-3 mt-8">
        {values.map((_: unknown, index: number) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index 
                ? 'bg-gradient-to-r from-cyan-400 to-purple-500 scale-125' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          >
            {currentIndex === index && (
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse"></div>
            )}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-6 max-w-xs mx-auto">
        <div className="w-full bg-slate-700/50 rounded-full h-1">
          <div 
            className="bg-gradient-to-r from-cyan-400 to-purple-500 h-1 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / values.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Auto-play indicator */}
      <div className="flex justify-center items-center mt-4 text-sm text-gray-400">
        <div className={`w-2 h-2 rounded-full mr-2 ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
        {isAutoPlaying ? 'Auto-playing' : 'Paused'}
      </div>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate title
    if (titleRef.current) {
      const titleEl = titleRef.current;
      titleEl.style.opacity = '0';
      titleEl.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        titleEl.style.transition = 'all 1s ease-out';
        titleEl.style.opacity = '1';
        titleEl.style.transform = 'translateY(0)';
      }, 200);
    }

    // Animate content
    if (contentRef.current) {
      const elements = Array.from(contentRef.current.children);
      elements.forEach((element, index) => {
        if (element instanceof HTMLElement) {
          element.style.opacity = '0';
          element.style.transform = 'translateY(40px)';
          
          setTimeout(() => {
            element.style.transition = 'all 1s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }, 600 + (index * 200));
        }
      });
    }

    // Animate values grid
    if (valuesRef.current) {
      const cards = valuesRef.current.querySelectorAll('.value-card');
      cards.forEach((card, index) => {
        if (card instanceof HTMLElement) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(50px) scale(0.9)';
          
          setTimeout(() => {
            card.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 1200 + (index * 150));
        }
      });
    }

    // Animate stats
    if (statsRef.current) {
      const stats = statsRef.current.querySelectorAll('.stat-card');
      stats.forEach((stat, index) => {
        if (stat instanceof HTMLElement) {
          stat.style.opacity = '0';
          stat.style.transform = 'scale(0.8)';
          
          setTimeout(() => {
            stat.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            stat.style.opacity = '1';
            stat.style.transform = 'scale(1)';
          }, 1800 + (index * 100));
        }
      });
    }
  }, []);

  const values: ValueItem[] = [
    {
      icon: Users,
      title: 'Customer First',
      description: 'Every decision we make puts our customers needs at the center',
      gradient: 'from-cyan-400 to-blue-500',
      glowOverlayFrom: 'from-cyan-400/5',
      borderHover: 'hover:border-cyan-400/50',
      ringHover: 'hover:ring-2 hover:ring-cyan-400/20'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from code to customer service',
      gradient: 'from-blue-500 to-indigo-500',
      glowOverlayFrom: 'from-blue-500/5',
      borderHover: 'hover:border-blue-500/50',
      ringHover: 'hover:ring-2 hover:ring-blue-500/20'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Constantly pushing boundaries to deliver cutting-edge solutions',
      gradient: 'from-indigo-500 to-purple-500',
      glowOverlayFrom: 'from-indigo-500/5',
      borderHover: 'hover:border-indigo-500/50',
      ringHover: 'hover:ring-2 hover:ring-indigo-500/20'
    },
    {
      icon: Heart,
      title: 'Community',
      description: 'Building a supportive community of developers and businesses',
      gradient: 'from-purple-500 to-pink-500',
      glowOverlayFrom: 'from-purple-500/5',
      borderHover: 'hover:border-purple-500/50',
      ringHover: 'hover:ring-2 hover:ring-purple-500/20'
    }
  ];


  return (
    <section id="about" ref={sectionRef} className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-slate-900"></div>
      
      {/* Corner Gradients */}
      <div className="absolute top-[-10vh] left-[-10vh] w-80 h-80 opacity-30">
        <div className="w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="absolute bottom-[-10vh] right-[-10vh] w-80 h-80 opacity-30">
        <div className="w-full h-full bg-gradient-to-bl from-purple-500 via-pink-500 to-orange-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sparkles className="absolute top-1/4 right-1/4 w-4 h-4 text-cyan-400 opacity-60 animate-pulse" />
        <div className="absolute top-3/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title Section */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              ABOUT CLOUD-HIGH
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Content Section */}
        <div ref={contentRef} className="max-w-5xl mx-auto mb-20">
          <div className="relative bg-slate-800/30 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 hover:border-white/20 transition-all duration-500">
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-6 h-6 border-2 border-cyan-400/30 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-60"></div>
            
            <div className="relative z-10">
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Founded in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-semibold">2020</span> by a team of cloud infrastructure veterans, Cloud-High was born from a simple belief: 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-semibold"> enterprise-grade cloud computing shouldn't break the bank.</span>
              </p>
              
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                We've helped over <span className="text-cyan-400 font-bold">100,000</span> businesses migrate to the cloud, reduce their infrastructure costs by an average of <span className="text-purple-400 font-bold">60%</span>, 
                and scale effortlessly. From startups to Fortune 500 companies, our platform powers the next generation of digital businesses.
              </p>
            </div>

            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-3xl"></div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Our Values
            </span>
          </h3>
          
          <ValuesCarousel values={values} valuesRef={valuesRef} />
        </div>

       
      </div>

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

        @keyframes bounce {
          0%, 100% { 
            transform: translateY(0);
          }
          50% { 
            transform: translateY(-10px);
          }
        }
        
        .animate-bounce {
          animation: bounce 3s ease-in-out infinite;
        }

        @keyframes ping {
          0% { 
            opacity: 1;
            transform: scale(0);
          }
          75%, 100% {
            opacity: 0;
            transform: scale(1.5);
          }
        }
        
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default About;