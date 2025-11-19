import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import FloatingLines from './FloatingLines';
import HeroCarousel from './HeroCarousel';

const services = [
  "SEO Optimization",
  "Content Marketing",
  "Social Media",
  "SEM & PPC"
];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="hero relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--color-brand-primary) 0%, var(--color-brand-accent) 50%, var(--color-brand-secondary) 100%)',
      }}
    >
      {/* Animated Background - parallax-bg layer */}
      <motion.div
        className="parallax-bg absolute inset-0 z-0"
        style={{
          scale: backgroundScale,
          opacity,
        }}
      >
        <div className="hero-bg absolute inset-0 bg-gradient-to-br from-[#2D7176] via-[#4DA9B0] to-[#3A3D3F] opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1646038572891-86b08ccd6719?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdyYWRpZW50JTIwd2F2ZXN8ZW58MXx8fHwxNzYzMjY3MDI4fDA&ixlib=rb-4.1.0&q=80&w=1080')] bg-cover bg-center opacity-30 mix-blend-overlay" />
        <FloatingLines
          linesGradient={['#2D7176', '#4DA9B0', '#3A3D3F']}
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[8, 12, 6]}
          lineDistance={[3, 4, 5]}
          animationSpeed={0.8}
          interactive={true}
          bendRadius={3.0}
          bendStrength={-0.3}
          parallax={true}
          parallaxStrength={0.1}
          mixBlendMode="screen"
        />
      </motion.div>

      {/* Floating shapes - parallax-mid layer */}
      <div className="parallax-mid absolute inset-0 z-10 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-brand-accent)]/20 rounded-full blur-3xl"
          animate={{
            y: [0, -40, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Hero Content - parallax-fg layer */}
      <div className="parallax-fg container mx-auto px-4 z-20 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 0.9, 0.32, 1] }}
          >
            <h1 className="hero__headline text-5xl md:text-6xl lg:text-7xl text-white mb-6" style={{ fontWeight: 700, lineHeight: 1.1 }}>
              Elevate Your Digital Presence
            </h1>
            <p className="hero__subheadline text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto" style={{ lineHeight: 1.6 }}>
              Data-driven strategies that transform your brand into a market leader. 
              <br />
              Results that speak louder than promises.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="hero__ctas flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 0.9, 0.32, 1] }}
          >
            <motion.a
              href="#contact"
              className="hero__cta--primary btn-primary px-8 py-4 bg-white text-[var(--color-brand-primary)] rounded-lg inline-flex items-center justify-center gap-2 shadow-xl"
              whileHover={{
                y: -4,
                scale: 1.03,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15, ease: [0.22, 0.9, 0.32, 1] }}
            >
              Start Your Journey
              <ArrowRight size={20} />
            </motion.a>
            <motion.button
              className="hero__cta--secondary btn-ghost px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg border-2 border-white/30 inline-flex items-center justify-center gap-2"
              whileHover={{
                y: -4,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15, ease: [0.22, 0.9, 0.32, 1] }}
            >
              <Play size={20} />
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Hero carousel */}
          <HeroCarousel services={services} itemMinWidth={240} duration={15} />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
