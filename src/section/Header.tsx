import { useEffect, useRef, useState } from 'react';
import { Cloud, Menu, X } from 'lucide-react';
import { gsap } from 'gsap';

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(headerRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'back.out(1.7)' }
    );
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
              Cloud-High
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Services', 'Features', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-slate-700 hover:text-blue-600 transition-colors duration-300 font-medium"
              >
                {item}
              </a>
            ))}
            <button className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300">
              Get Started
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              {['Services', 'Pricing', 'Features', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-slate-700 hover:text-blue-600 transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 mt-2">
                Get Started
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
