import { useEffect, useRef } from 'react';
import { Shield, Zap, Globe, BarChart3, Settings, Headphones } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo(gridRef.current ? Array.from(gridRef.current.children) : [],
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Advanced encryption, DDoS protection, and compliance certifications',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'High-performance SSD storage and optimized network infrastructure',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Data centers across 6 continents for lowest latency worldwide',
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Comprehensive monitoring and insights into your infrastructure',
    },
    {
      icon: Settings,
      title: 'Easy Management',
      description: 'Intuitive dashboard and API for seamless infrastructure control',
    },
    {
      icon: Headphones,
      title: 'Expert Support',
      description: 'Technical experts available 24/7 to help with any challenge',
    },
  ];

  return (
    <section id="features" ref={sectionRef} className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-500/10 to-teal-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
            Why Choose Cloud-High?
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Built for developers, trusted by enterprises. Experience the difference of modern cloud infrastructure.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-300 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { number: '99.99%', label: 'Uptime' },
            { number: '<2ms', label: 'Latency' },
            { number: '100K+', label: 'Customers' },
            { number: '50+', label: 'Data Centers' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-slate-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;