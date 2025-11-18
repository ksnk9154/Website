import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import GooeyNav from './GooeyNav';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const headerHeight = useTransform(scrollY, [0, 100], [70, 64]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      className="header fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md shadow-sm transition-shadow duration-300"
      style={{ height: headerHeight }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 0.9, 0.32, 1] }}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="header__logo flex items-center"
          style={{ scale: logoScale }}
        >
          <Logo className="h-12 w-auto" />
        </motion.div>

        {/* Desktop Navigation */}
        <div className="header__nav hidden md:flex items-center">
          <GooeyNav items={navItems} />
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn-primary px-6 py-2 bg-[var(--color-brand-primary)] text-white rounded-lg hover:bg-[var(--color-brand-accent)] transition-all duration-150 ml-8"
            style={{
              boxShadow: '0 4px 14px 0 rgba(45, 113, 118, 0.2)',
            }}
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-[var(--color-neutral-dark)]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="mobile-menu md:hidden absolute top-full left-0 right-0 bg-white shadow-lg overflow-hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 0.9, 0.32, 1] }}
      >
        <nav className="flex flex-col p-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="py-3 px-4 text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)] rounded-lg transition-colors duration-150"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="mt-2 py-3 px-4 bg-[var(--color-brand-primary)] text-white text-center rounded-lg hover:bg-[var(--color-brand-accent)] transition-colors duration-150"
          >
            Get Started
          </a>
        </nav>
      </motion.div>
    </motion.header>
  );
}