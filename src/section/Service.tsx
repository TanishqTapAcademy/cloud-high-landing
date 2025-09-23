import { useEffect, useRef } from 'react';
import { Server, Shield, Zap, Database, Globe, Users } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
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

      // Cards stagger animation
      gsap.fromTo(cardsRef.current ? Array.from(cardsRef.current.children) : [],
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: Server,
      title: 'Cloud Computing',
      description: 'Scalable virtual machines and containers with enterprise-grade performance.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Database,
      title: 'Managed Databases',
      description: 'Fully managed MySQL, PostgreSQL, and MongoDB with automatic backups.',
      color: 'from-cyan-500 to-teal-500'
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Advanced security features with SOC 2 Type II and ISO 27001 compliance.',
      color: 'from-teal-500 to-green-500'
    },
    {
      icon: Globe,
      title: 'Global CDN',
      description: 'Lightning-fast content delivery with 200+ edge locations worldwide.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Auto Scaling',
      description: 'Intelligent auto-scaling based on traffic patterns and performance metrics.',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Users,
      title: '24/7 Support',
      description: 'Expert technical support available around the clock via chat, email, and phone.',
      color: 'from-violet-500 to-purple-500'
    }
  ];

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive cloud solutions designed to accelerate your business growth
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-slate-800 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>

              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="text-blue-600 font-semibold hover:text-purple-600 transition-colors flex items-center space-x-2">
                  <span>Learn More</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;