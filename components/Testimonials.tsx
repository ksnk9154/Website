import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const testimonials = [
  {
    id: 1,
    quote: "SiteCrafted transformed our entire digital strategy. Within 6 months, we saw a 245% increase in organic traffic and our conversion rate doubled. Their team doesn't just execute—they innovate.",
    author: 'Sarah Chen',
    role: 'CEO',
    company: 'RetailCo',
    logo: 'https://via.placeholder.com/120x40/2D7176/FFFFFF?text=RetailCo',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  },
  {
    id: 2,
    quote: "The ROI speaks for itself. Our PPC campaigns now generate 12.5x returns, and our cost per acquisition dropped by 65%. SiteCrafted's data-driven approach is unmatched in the industry.",
    author: 'Michael Rodriguez',
    role: 'CMO',
    company: 'FinanceHub',
    logo: 'https://via.placeholder.com/120x40/4DA9B0/FFFFFF?text=FinanceHub',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
  },
  {
    id: 3,
    quote: "From zero to 450K engaged followers across all platforms. SiteCrafted didn't just grow our audience—they built a community that drives real business results. Engagement is up 180%.",
    author: 'Emily Thompson',
    role: 'Founder',
    company: 'TechStart',
    logo: 'https://via.placeholder.com/120x40/3A3D3F/FFFFFF?text=TechStart',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return testimonials.length - 1;
      if (nextIndex >= testimonials.length) return 0;
      return nextIndex;
    });
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl text-[var(--color-neutral-dark)] mb-4" style={{ fontWeight: 700 }}>
            Client Success Stories
          </h2>
          <p className="text-xl text-[var(--color-neutral-dark)]/70 max-w-2xl mx-auto">
            Don't just take our word for it—hear from the partners we've helped transform
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="testimonial-card bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-accent)] rounded-3xl p-12 text-white shadow-2xl"
            >
              {/* Quote Icon */}
              <Quote size={48} className="mb-6 opacity-50" />

              {/* Quote Text */}
              <blockquote className="text-2xl mb-8 leading-relaxed italic">
                "{testimonials[currentIndex].quote}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-6">
                <ImageWithFallback
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].author}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-white/30"
                />
                <div className="flex-1">
                  <div className="text-xl" style={{ fontWeight: 600 }}>
                    {testimonials[currentIndex].author}
                  </div>
                  <div className="text-white/80">
                    {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                  </div>
                </div>
                <ImageWithFallback
                  src={testimonials[currentIndex].logo}
                  alt={testimonials[currentIndex].company}
                  className="h-8 opacity-90"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              className="p-3 rounded-full bg-white shadow-lg text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-white transition-colors duration-150"
              onClick={() => paginate(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>

            {/* Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-[var(--color-brand-primary)]'
                      : 'bg-[var(--color-neutral-dark)]/20'
                  }`}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                />
              ))}
            </div>

            <motion.button
              className="p-3 rounded-full bg-white shadow-lg text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-white transition-colors duration-150"
              onClick={() => paginate(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </div>

        {/* Client Logos */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center items-center gap-12 opacity-60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {testimonials.map((testimonial) => (
            <ImageWithFallback
              key={testimonial.id}
              src={testimonial.logo}
              alt={testimonial.company}
              className="h-8 grayscale hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
