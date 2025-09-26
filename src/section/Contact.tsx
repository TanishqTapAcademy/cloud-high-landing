import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, Send, MessageCircle, Zap, Shield, Clock } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000';



const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  useEffect(() => {
    // Animate title
    if (titleRef.current) {
      const el = titleRef.current;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        el.style.transition = 'all 1s ease-out';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 200);
    }

    // Animate form and info
    const elements = [formRef.current, infoRef.current];
    elements.forEach((element, index) => {
      if (element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
          element.style.transition = 'all 1s ease-out';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, 600 + (index * 300));
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ ok: false, msg: 'Please fill required fields.' });
      return;
    }

    try {
      setSubmitting(true);
      const resp = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error((data as any)?.detail || (data as any)?.error || 'Submit failed');

      setStatus({ ok: true, msg: 'Thanks! We received your message.' });
      setFormData({ name: '', email: '', phone: '', project: '', message: '' });
    } catch (err: any) {
      setStatus({ ok: false, msg: err?.message || 'Something went wrong.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'sales@cloud-high.com',
      description: 'Get a response within 2 hours',
      gradient: 'from-cyan-400 to-blue-500',
      glowFrom: 'from-blue-500/5',
      delay: '0s'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+91 9945502004',
      description: 'Talk to our cloud experts',
      gradient: 'from-indigo-500 to-purple-500',
      glowFrom: 'from-purple-500/5',
      delay: '0.4s'
    }
  ];

  const benefits = [
    { icon: Zap, text: 'Free consultation within 24 hours' },
    { icon: Shield, text: 'No commitment required' },
    { icon: Clock, text: 'Custom quote in 48 hours' }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-slate-900"></div>
      
      {/* Corner Gradients */}
      <div className="absolute top-[-15vh] left-[-15vh] w-96 h-96 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="absolute bottom-[-15vh] right-[-15vh] w-96 h-96 opacity-20">
        <div className="w-full h-full bg-gradient-to-bl from-purple-500 via-pink-500 to-orange-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title Section */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              LET'S BUILD TOGETHER
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Ready to transform your cloud infrastructure? Let's discuss how Cloud-High can help your business scale to new heights.
          </p>
          
          {/* Benefits Pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2 bg-slate-800/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <benefit.icon className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-gray-300">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div ref={formRef} className="relative">
            <div className="relative bg-slate-800/30 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-6 h-6 border-2 border-cyan-400/30 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-60"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">Start Your Journey</h3>
                <p className="text-gray-400 mb-8">Tell us about your project and we'll get back to you within 24 hours</p>
                
                {status && (
                  <div className={`mb-4 rounded-xl px-4 py-3 border ${status.ok ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-rose-500/30 bg-rose-500/10 text-rose-300'}`}>
                    {status.msg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 outline-none text-white placeholder-gray-400"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 outline-none text-white placeholder-gray-400"
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 outline-none text-white placeholder-gray-400"
                        placeholder="Your Phone"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Project Type
                      </label>
                      <select
                        name="project"
                        value={formData.project}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 outline-none text-white"
                      >
                        <option value="">Select a service</option>
                        <option value="cloud-migration">Cloud Migration</option>
                        <option value="website-development">Website Development</option>
                        <option value="design-systems">Design Systems</option>
                        <option value="consultation">Free Consultation</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 outline-none resize-none text-white placeholder-gray-400"
                      placeholder="Tell us about your project, current challenges, and goals..."
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-500 flex items-center justify-center space-x-2 group ${submitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-2xl hover:shadow-cyan-500/25 hover:scale-105'}`}
                  >
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    <span>{submitting ? 'Sending…' : 'Send Message'}</span>
                  </button>
                </form>
              </div>

              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-3xl"></div>
            </div>
          </div>

          {/* Contact Information */}
          <div ref={infoRef} className="space-y-6">
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Get In Touch</h3>
              <p className="text-gray-300 text-lg">Choose the best way to reach us. We're here to help you succeed.</p>
            </div>
            
            {contactInfo.map((info, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden"
                style={{ animationDelay: info.delay }}
              >
                <div className="relative bg-slate-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                  
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${info.glowFrom} to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10 flex items-start space-x-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                        {info.title}
                      </h4>
                      <p className="text-cyan-400 font-medium mb-1 text-lg">{info.details}</p>
                      <p className="text-gray-400">{info.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Enhanced FAQ Section */}
            <div className="mt-12 relative">
              <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-8 h-8 border border-purple-400/30 rounded-lg rotate-45"></div>
                
                <div className="relative z-10">
                  <h4 className="text-xl md:text-2xl font-semibold text-white mb-6 flex items-center">
                    <MessageCircle className="w-6 h-6 mr-3 text-cyan-400" />
                    Quick Questions?
                  </h4>
                  <div className="space-y-4">
                    <details className="group cursor-pointer">
                      <summary className="flex items-center justify-between font-medium text-gray-300 hover:text-cyan-400 transition-colors py-2 list-none">
                        <span>How quickly can I get started?</span>
                        <span className="transform group-open:rotate-180 transition-transform duration-300 text-cyan-400">↓</span>
                      </summary>
                      <p className="mt-3 text-gray-400 pl-4 border-l-2 border-cyan-400/30">
                        You can deploy your first cloud instance within minutes of our consultation call. We provide rapid setup and migration support.
                      </p>
                    </details>
                    
                    <details className="group cursor-pointer">
                      <summary className="flex items-center justify-between font-medium text-gray-300 hover:text-cyan-400 transition-colors py-2 list-none">
                        <span>Do you offer migration support?</span>
                        <span className="transform group-open:rotate-180 transition-transform duration-300 text-cyan-400">↓</span>
                      </summary>
                      <p className="mt-3 text-gray-400 pl-4 border-l-2 border-cyan-400/30">
                        Yes! Our expert team provides comprehensive migration assistance at no extra cost, ensuring zero downtime during your transition.
                      </p>
                    </details>
                    
                    <details className="group cursor-pointer">
                      <summary className="flex items-center justify-between font-medium text-gray-300 hover:text-cyan-400 transition-colors py-2 list-none">
                        <span>What about ongoing support?</span>
                        <span className="transform group-open:rotate-180 transition-transform duration-300 text-cyan-400">↓</span>
                      </summary>
                      <p className="mt-3 text-gray-400 pl-4 border-l-2 border-cyan-400/30">
                        We provide 24/7 monitoring and support with dedicated cloud architects available for any technical challenges you encounter.
                      </p>
                    </details>
                  </div>
                </div>

                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.2;
            transform: scale(1);
          }
          50% { 
            opacity: 0.4;
            transform: scale(1.05);
          }
        }
        
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }

        /* Custom select styling */
        select {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.75rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
          padding-right: 2.5rem;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }

        /* Focus states */
        input:focus, textarea:focus, select:focus {
          box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.1);
        }
      `}</style>
    </section>
  );
};

export default Contact;