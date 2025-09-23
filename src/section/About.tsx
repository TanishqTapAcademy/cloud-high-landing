import { useEffect, useRef } from 'react';
import { Users, Award, Target, Heart } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current ? Array.from(contentRef.current.children) : [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo(statsRef.current ? Array.from(statsRef.current.children) : [],
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const values = [
    {
      icon: Users,
      title: 'Customer First',
      description: 'Every decision we make puts our customers needs at the center'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from code to customer service'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Constantly pushing boundaries to deliver cutting-edge solutions'
    },
    {
      icon: Heart,
      title: 'Community',
      description: 'Building a supportive community of developers and businesses'
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
            About Cloud-High
          </h2>
          
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Founded in 2020 by a team of cloud infrastructure veterans, Cloud-High was born from a simple belief: 
            enterprise-grade cloud computing shouldn't break the bank.
          </p>
          
          <p className="text-lg text-slate-600 mb-12 leading-relaxed">
            We've helped over 100,000 businesses migrate to the cloud, reduce their infrastructure costs by an average of 60%, 
            and scale effortlessly. From startups to Fortune 500 companies, our platform powers the next generation of digital businesses.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 mx-auto">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: '100K+', label: 'Happy Customers' },
            { number: '99.99%', label: 'Uptime SLA' },
            { number: '50+', label: 'Countries Served' },
            { number: '2020', label: 'Founded' }
          ].map((stat, index) => (
            <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-lg">
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

export default About;