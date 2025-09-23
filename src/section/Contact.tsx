import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo([formRef.current, infoRef.current],
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'hello@cloud-high.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: '24/7 support available'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '123 Cloud Street, Tech City',
      description: 'San Francisco, CA 94105'
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Ready to transform your cloud infrastructure? Let's discuss how Cloud-High can help your business scale.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div ref={formRef} className="bg-gray-50 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-slate-800">Send us a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none resize-none"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div ref={infoRef} className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Contact Information</h3>
            
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-1">{info.title}</h4>
                  <p className="text-blue-600 font-medium mb-1">{info.details}</p>
                  <p className="text-slate-600 text-sm">{info.description}</p>
                </div>
              </div>
            ))}

            {/* FAQ Section */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mt-8">
              <h4 className="text-lg font-semibold text-slate-800 mb-4">Quick Questions?</h4>
              <div className="space-y-3">
                <details className="text-slate-600">
                  <summary className="cursor-pointer font-medium text-slate-700 hover:text-blue-600">
                    How quickly can I get started?
                  </summary>
                  <p className="mt-2 text-sm">You can deploy your first instance within minutes of signing up.</p>
                </details>
                <details className="text-slate-600">
                  <summary className="cursor-pointer font-medium text-slate-700 hover:text-blue-600">
                    Do you offer migration support?
                  </summary>
                  <p className="mt-2 text-sm">Yes, our team provides free migration assistance for new customers.</p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;