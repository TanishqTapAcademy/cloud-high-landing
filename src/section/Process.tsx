import { useEffect, useRef } from 'react';
import { MessageCircle, FileText, Code, Headphones } from 'lucide-react';

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const connectorsRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Title animation
    if (titleRef.current) {
      const titleEl = titleRef.current;
      titleEl.style.opacity = '0';
      titleEl.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        titleEl.style.transition = 'all 1s ease-out';
        titleEl.style.opacity = '1';
        titleEl.style.transform = 'translateY(0)';
      }, 300);
    }

    // Steps animation with stagger
    if (stepsContainerRef.current) {
      const steps = stepsContainerRef.current.querySelectorAll('.process-step');
      steps.forEach((step, index) => {
        if (step instanceof HTMLElement) {
          step.style.opacity = '0';
          step.style.transform = 'translateY(50px) scale(0.9)';
          
          setTimeout(() => {
            step.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            step.style.opacity = '1';
            step.style.transform = 'translateY(0) scale(1)';
          }, 800 + (index * 200));
        }
      });
    }

    // Connector lines animation
    if (connectorsRef.current) {
      const paths = connectorsRef.current.querySelectorAll('path');
      paths.forEach((path, index) => {
        if (path instanceof SVGPathElement) {
          const length = path.getTotalLength();
          path.style.strokeDasharray = `${length}`;
          path.style.strokeDashoffset = `${length}`;
          
          setTimeout(() => {
            path.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
            path.style.strokeDashoffset = '0';
          }, 1400 + (index * 300));
        }
      });
    }
  }, []);

  const processSteps = [
    {
      icon: MessageCircle,
      title: 'Consultation',
      description: 'Understand your requirements & business goals through detailed discovery sessions.',
      position: { top: '10%', left: '5%' },
      gradient: 'from-cyan-400 to-blue-500',
      glowOverlayFrom: 'from-cyan-400/5',
      borderHover: 'hover:border-cyan-400/50',
      ringHover: 'hover:ring-2 hover:ring-cyan-400/20',
      ringGroupHover: 'group-hover:ring-2 group-hover:ring-cyan-400/30'
    },
    {
      icon: FileText,
      title: 'Custom Proposal',
      description: 'Receive a tailored solution & comprehensive cost estimate with timeline.',
      position: { top: '20%', left: '40%' },
      gradient: 'from-blue-400 to-indigo-500',
      glowOverlayFrom: 'from-blue-400/5',
      borderHover: 'hover:border-blue-400/50',
      ringHover: 'hover:ring-2 hover:ring-blue-400/20',
      ringGroupHover: 'group-hover:ring-2 group-hover:ring-blue-400/30'
    },
    {
      icon: Code,
      title: 'Implementation',
      description: 'Cloud deployment & modern web development with agile methodologies.',
      position: { top: '55%', left: '15%' },
      gradient: 'from-indigo-500 to-purple-500',
      glowOverlayFrom: 'from-indigo-400/5',
      borderHover: 'hover:border-indigo-400/50',
      ringHover: 'hover:ring-2 hover:ring-indigo-400/20',
      ringGroupHover: 'group-hover:ring-2 group-hover:ring-indigo-400/30'
    },
    {
      icon: Headphones,
      title: 'Delivery & Support',
      description: 'Seamless delivery with ongoing optimization and 24/7 technical support.',
      position: { top: '65%', left: '55%' },
      gradient: 'from-purple-400 to-pink-500',
      glowOverlayFrom: 'from-purple-400/5',
      borderHover: 'hover:border-purple-400/50',
      ringHover: 'hover:ring-2 hover:ring-purple-400/20',
      ringGroupHover: 'group-hover:ring-2 group-hover:ring-purple-400/30'
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-slate-900 text-white relative overflow-hidden min-h-screen">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-slate-900"></div>
      
      {/* Enhanced Background Gradients */}
      <div className="absolute top-[-15vh] right-[-15vh] w-96 h-96 opacity-20">
        <div className="w-full h-full bg-gradient-to-bl from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="absolute bottom-[-15vh] left-[-15vh] w-96 h-96 opacity-20">
        <div className="w-full h-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full opacity-40 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-50 animate-float" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              OUR PROCESS
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A streamlined approach designed for maximum efficiency and transparency
          </p>
        </div>

        {/* Process Steps Container */}
        <div ref={stepsContainerRef} className="relative max-w-6xl mx-auto h-[600px] md:h-[700px]">
          {/* Connecting Lines SVG */}
          <svg 
            ref={connectorsRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0" 
            viewBox="0 0 800 600"
          >
            {/* Step 1 to Step 2 */}
            <path 
              d="M120 80 Q300 60 340 120" 
              stroke="url(#gradient1)" 
              strokeWidth="2" 
              fill="none" 
              opacity="0.8"
            />
            {/* Step 2 to Step 3 */}
            <path 
              d="M340 140 Q200 250 140 330" 
              stroke="url(#gradient2)" 
              strokeWidth="2" 
              fill="none" 
              opacity="0.8"
            />
            {/* Step 3 to Step 4 */}
            <path 
              d="M180 350 Q400 380 460 400" 
              stroke="url(#gradient3)" 
              strokeWidth="2" 
              fill="none" 
              opacity="0.8"
            />
            
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8"/>
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8"/>
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8"/>
              </linearGradient>
            </defs>
          </svg>

          {/* Process Step Cards */}
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="process-step group absolute w-72 md:w-80"
              style={{
                top: step.position.top,
                left: step.position.left,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* Card with glassmorphism effect */}
              <div className={`relative bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 ${step.borderHover} transition-all duration-500 hover:-translate-y-2 ${step.ringHover} group-hover:bg-slate-800/60`}>
                
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.glowOverlayFrom} to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Floating glow orb */}
                <div className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br ${step.gradient} rounded-full opacity-60 blur-sm group-hover:scale-125 group-hover:opacity-100 transition-all duration-500`}></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 ${step.ringGroupHover} transition-all duration-300`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Step number */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                    <span className="text-sm font-bold text-white">{index + 1}</span>
                  </div>
                  
                  {/* Content */}
                  <h3 className={`text-xl md:text-2xl font-bold mb-3 text-white bg-gradient-to-r ${step.gradient} group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300`}>
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${step.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              </div>
            </div>
          ))}

          {/* Central connection hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-60 animate-pulse"></div>
        </div>

      </div>

      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { 
            opacity: 0.6;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.1);
          }
        }
        
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .process-step {
            position: static !important;
            transform: none !important;
            margin-bottom: 2rem;
            width: 100% !important;
          }
          
          .process-step .absolute {
            position: static;
          }
        }
      `}</style>
    </section>
  );
};

export default Process;