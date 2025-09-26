import { useEffect, useRef, useState } from 'react';
import { Cloud, Twitter, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const API_BASE = (import.meta as any).env?.VITE_API_BASE || 'http://127.0.0.1:8000';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);
  const showBackToTop = true;

  useEffect(() => {
    // Animate footer sections
    if (footerRef.current) {
      const sections = Array.from(footerRef.current.children);
      sections.forEach((section, index) => {
        if (section instanceof HTMLElement) {
          section.style.opacity = '0';
          section.style.transform = 'translateY(30px)';
          
          setTimeout(() => {
            section.style.transition = 'all 1s ease-out';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
          }, 200 + (index * 150));
        }
      });
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (!email.trim()) {
      setStatus({ ok: false, msg: 'Please enter your email.' });
      return;
    }
    try {
      setSubmitting(true);
      const resp = await fetch(`${API_BASE}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error((data as any)?.detail || 'Subscribe failed');
      setStatus({ ok: true, msg: 'Subscribed! Check your inbox soon.' });
      setEmail('');
    } catch (err: any) {
      setStatus({ ok: false, msg: err?.message || 'Something went wrong.' });
    } finally {
      setSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-gray-300' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-500' },
    { icon: Mail, href: '#', label: 'Email', color: 'hover:text-cyan-400' }
  ];



  return (
    <footer ref={footerRef} className="bg-slate-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-slate-900"></div>
      
      {/* Enhanced Background Gradients */}
      <div className="absolute top-0 left-0 w-96 h-96 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-15">
        <div className="w-full h-full bg-gradient-to-bl from-purple-500 via-pink-500 to-orange-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Company Info */}
            <div className="lg:col-span-2 ">
              <div className="flex items-center space-x-3 mb-6 ">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Cloud className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Cloud-High
                </span>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                Empowering businesses with affordable, enterprise-grade cloud infrastructure. 
                Join thousands of companies that trust Cloud-High for their mission-critical workloads.
              </p>
            </div>

            {/* Spacer column for layout alignment on desktop */}
            <div className="hidden lg:block"></div>

            {/* Social Links Column */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mr-3"></div>
                Connect With Us
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className={`w-12 h-12 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 text-gray-400 ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mb-12">
          <div className="relative bg-slate-800/30 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-6 h-6 border-2 border-cyan-400/30 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-60"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              {status && (
                <div className={`mb-4 rounded-xl px-4 py-3 border ${status.ok ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-rose-500/30 bg-rose-500/10 text-rose-300'}`}>
                  {status.msg}
                </div>
              )}
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  Stay Ahead of the Cloud
                </span>
              </h3>
              <p className="text-gray-300 text-lg mb-8">
                Get exclusive insights, feature updates, and cloud optimization tips delivered to your inbox.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-gray-400 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 outline-none"
                  required
                />
                <button 
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-cyan-500/25 hover:scale-105 transition-all duration-300 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center">
                    {submitting ? 'Subscribing…' : 'Subscribe'}
                    <Mail className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </form>
              
              <p className="text-xs text-gray-500 mt-4">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </div>

            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-3xl"></div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400">
              © 2024 Cloud-High Technologies. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Security</a>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-cyan-500/25 hover:scale-110 transition-all duration-300 z-50 group"
          >
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </button>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.2;
            transform: scale(1);
          }
          50% { 
            opacity: 0.4;
            transform: scale(1.02);
          }
        }
        
        .animate-pulse {
          animation: pulse 6s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};



export default Footer;