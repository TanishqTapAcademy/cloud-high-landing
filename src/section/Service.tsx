import { useEffect, useRef } from 'react';
import { Cloud, Monitor, Palette, ArrowRight, Zap, Globe, Database } from 'lucide-react';

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple fade-in animations without GSAP
    const elements = [titleRef.current, gridRef.current];
    
    elements.forEach((element, index) => {
      if (element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
          element.style.transition = 'all 1s ease-out';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, (index + 1) * 300);
      }
    });

    // Animate grid items with stagger
    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll('.bento-item');
      items.forEach((item, index) => {
        if (item instanceof HTMLElement) {
          item.style.opacity = '0';
          item.style.transform = 'translateY(40px) scale(0.95)';
          
          setTimeout(() => {
            item.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
          }, 800 + (index * 150));
        }
      });
    }
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-black"></div>
      
      {/* Enhanced Background Gradients */}
      <div className="absolute top-[-20vh] left-[-20vh] w-96 h-96 opacity-30">
        <div className="w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="absolute bottom-[-20vh] right-[-20vh] w-96 h-96 opacity-30">
        <div className="w-full h-full bg-gradient-to-bl from-pink-500 via-purple-600 to-blue-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title Section */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              OUR SERVICES
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive solutions designed for the modern digital landscape
          </p>
        </div>

        {/* Bento Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 auto-rows-fr">
          
          {/* Cloud Solutions - Large Feature Card */}
          <div className="bento-item md:col-span-6 lg:col-span-8 lg:row-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-orange-500/20 hover:border-orange-500/50 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/20">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-yellow-500/5 to-transparent"></div>
            
            {/* Animated Background Elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full opacity-20 blur-xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-15 blur-lg group-hover:scale-125 transition-transform duration-700"></div>
            
            <div className="relative z-10 p-8 h-full flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Cloud className="w-8 h-8 text-white" />
                </div>
                <ArrowRight className="w-6 h-6 text-orange-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-3 text-white group-hover:text-orange-300 transition-colors">
                  CLOUD SOLUTIONS
                </h3>
                <p className="text-orange-400 font-semibold mb-4 text-lg">
                  (AWS, GCP, AZURE)
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Custom consultation, optimized cost, fully scalable cloud infrastructure tailored to your business needs.
                </p>
                
                {/* Feature Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-300 text-sm">Cost Optimization</span>
                  <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-yellow-300 text-sm">24/7 Support</span>
                  <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-300 text-sm">Auto-Scaling</span>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-orange-500/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">30%</div>
                  <div className="text-sm text-gray-400">Cost Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">99.9%</div>
                  <div className="text-sm text-gray-400">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">24/7</div>
                  <div className="text-sm text-gray-400">Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Website Development */}
          <div className="bento-item md:col-span-3 lg:col-span-4 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/50 transition-all duration-700 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent"></div>
            
            {/* Floating Elements */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg opacity-20 blur-sm group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"></div>
            
            <div className="relative z-10 p-6 h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Monitor className="w-7 h-7 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors">
                  WEBSITE DEVELOPMENT
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Corporate, e-commerce, sales platforms, custom apps with modern frameworks.
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  <span className="px-2 py-1 bg-blue-500/20 rounded text-blue-300 text-xs">React</span>
                  <span className="px-2 py-1 bg-cyan-500/20 rounded text-cyan-300 text-xs">Next.js</span>
                  <span className="px-2 py-1 bg-blue-500/20 rounded text-blue-300 text-xs">TypeScript</span>
                </div>
              </div>
            </div>
          </div>

          {/* Design Systems & UX */}
          <div className="bento-item md:col-span-3 lg:col-span-4 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-700 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-transparent"></div>
            
            {/* Design Elements */}
            <div className="absolute top-4 right-4 w-8 h-8 border-2 border-cyan-400/30 rounded-full opacity-60 group-hover:scale-125 group-hover:border-cyan-400/60 transition-all duration-500"></div>
            <div className="absolute bottom-6 right-6 w-6 h-6 bg-gradient-to-br from-cyan-400 to-teal-500 rounded opacity-40 group-hover:scale-110 transition-all duration-500"></div>
            
            <div className="relative z-10 p-6 h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Palette className="w-7 h-7 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-300 transition-colors">
                  DESIGN SYSTEMS & UX
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Futuristic UI, parallax effects, scroll animations, and cohesive design systems.
                </p>
                
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-1 bg-cyan-500/20 rounded text-cyan-300 text-xs">Figma</span>
                  <span className="px-2 py-1 bg-teal-500/20 rounded text-teal-300 text-xs">Framer</span>
                  <span className="px-2 py-1 bg-cyan-500/20 rounded text-cyan-300 text-xs">Motion</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bento-item md:col-span-2 lg:col-span-4 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/50 transition-all duration-700">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/5"></div>
            
            <div className="relative z-10 p-6 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">Performance</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Speed Score</span>
                    <span className="text-purple-400">98/100</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-[98%]"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">SEO Score</span>
                    <span className="text-purple-400">95/100</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-[95%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Global Reach */}
          <div className="bento-item md:col-span-2 lg:col-span-4 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-green-500/20 hover:border-green-500/50 transition-all duration-700">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/5"></div>
            
            <div className="relative z-10 p-6 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">Global Reach</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">50+</div>
                  <div className="text-sm text-gray-400">Data Centers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">6</div>
                  <div className="text-sm text-gray-400">Continents</div>
                </div>
              </div>
            </div>
          </div>

          {/* Database Solutions */}
          <div className="bento-item md:col-span-2 lg:col-span-4 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-700">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-600/5"></div>
            
            <div className="relative z-10 p-6 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">Managed DB</h3>
              </div>
              
              <p className="text-sm text-gray-300 mb-3">
                MySQL, PostgreSQL, MongoDB with automated backups.
              </p>
              
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-indigo-500/20 rounded text-indigo-300 text-xs">MySQL</span>
                <span className="px-2 py-1 bg-blue-500/20 rounded text-blue-300 text-xs">MongoDB</span>
              </div>
            </div>
          </div>
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

        .bento-item {
          min-height: 200px;
        }

        @media (min-width: 1024px) {
          .bento-item:first-child {
            min-height: 400px;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;