import { useEffect, useRef } from 'react';
import { Cloud, Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(footerRef.current ? Array.from(footerRef.current.children) : [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const footerLinks = [
    {
      title: 'Product',
      links: ['Cloud Computing', 'Databases', 'Storage', 'Networking', 'Security', 'Monitoring']
    },
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Blog', 'Press', 'Partners', 'Contact']
    },
    {
      title: 'Resources',
      links: ['Documentation', 'API Reference', 'Tutorials', 'Status Page', 'Support', 'Community']
    },
    {
      title: 'Legal',
      links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Compliance', 'Security']
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' }
  ];

  return (
    <footer ref={footerRef} className="bg-slate-900 text-white py-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 flex items-center justify-center">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Cloud-High
              </span>
            </div>
            
            <p className="text-slate-300 leading-relaxed mb-6">
              Empowering businesses with affordable, enterprise-grade cloud infrastructure. 
              Join thousands of companies that trust Cloud-High for their critical workloads.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-slate-300 hover:text-cyan-300 transition-colors duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white/5 rounded-2xl p-8 mb-12 border border-white/10">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Stay Updated
            </h3>
            <p className="text-slate-300 mb-6">
              Get the latest updates on new features, best practices, and cloud industry insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 outline-none"
              />
              <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              © 2024 Cloud-High. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <span>🌍 Status: All systems operational</span>
              <span>⚡ 99.99% uptime</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;