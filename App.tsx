import { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import  Services  from './components/Services';
import { CaseStudies } from './components/CaseStudies';
import { Process } from './components/Process';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  useEffect(() => {
    // Implement parallax scrolling effect
    const handleScroll = () => {
      const scrolled = window.scrollY;

      // Parallax layers - as specified: bg: 0.05, mid: 0.12, fg: 0.25
      const parallaxBg = document.querySelectorAll('.parallax-bg');
      const parallaxMid = document.querySelectorAll('.parallax-mid');
      const parallaxFg = document.querySelectorAll('.parallax-fg');

      parallaxBg.forEach((element) => {
        const el = element as HTMLElement;
        el.style.transform = `translateY(${scrolled * 0.05}px)`;
      });

      parallaxMid.forEach((element) => {
        const el = element as HTMLElement;
        el.style.transform = `translateY(${scrolled * 0.12}px)`;
      });

      parallaxFg.forEach((element) => {
        const el = element as HTMLElement;
        el.style.transform = `translateY(${scrolled * 0.25}px)`;
      });
    };

    // Throttle scroll event for performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (mediaQuery.matches) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      document.documentElement.style.setProperty('scroll-behavior', 'auto');
    }
  }, []);

  return (
    <div className="app min-h-screen bg-white">
      <Header />
      
      <main>
        <Hero />
        <Services />
        <CaseStudies />
        <Process />
        <Pricing />
        <Testimonials />
        <ContactForm />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
}